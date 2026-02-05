/**
 * Global reusable calendar:
 * QGEventCalendar.init(rootId, { initialYear, initialMonth, events, onDayClick })
 * QGEventCalendar.setFilters(rootId, ['work_anniversary','birthday'])
 */
(function (window) {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function pad2(n) {
    return String(n).padStart(2, "0");
  }
  function daysInMonth(year, monthIndex) {
    return new Date(year, monthIndex + 1, 0).getDate();
  }
  function firstDow(year, monthIndex) {
    return new Date(year, monthIndex, 1).getDay(); // 0=Sun..6=Sat
  }
  function dateKey(year, monthIndex, day) {
    return year + "-" + pad2(monthIndex + 1) + "-" + pad2(day);
  }

  // ===== Default click: open Bootstrap modal with event cards =====
  function defaultDayClick(dateObj, eventsForDay) {
    if (!eventsForDay || !eventsForDay.length) return;

    const modalTitle = document.getElementById("eventDayModalLabel");
    const modalBody = document.getElementById("eventDayModalBody");
    const modalEl = document.getElementById("eventDayModal");
    if (!modalBody || !modalEl) return;

    const title =
      MONTHS[dateObj.getMonth()] +
      " " +
      dateObj.getDate() +
      ", " +
      dateObj.getFullYear();
    if (modalTitle) modalTitle.textContent = title;

    modalBody.innerHTML = "";

    eventsForDay.forEach(function (ev) {
      const col = document.createElement("div");
      col.className = "col-md-6 event_item";

      const html = `
        <article class="inner_item">
          <div class="ev_date">
            ${pad2(dateObj.getDate())}
            <small>${MONTHS[dateObj.getMonth()]}</small>
          </div>
          <div class="ev_infos">
            <h3 class="ev_title">
              <a href="${ev.url || "#"}">${ev.title || ""}</a>
            </h3>
            <div class="ev_time list_txt">
              <i class="fa-regular fa-clock me-1"></i>${ev.time || "All Day"}
            </div>
            <div class="ev_location list_txt">
              <i class="fa-regular fa-location-dot me-1"></i>${
                ev.location || ""
              }
            </div>
          </div>
          <a href="${
            ev.url || "#"
          }" class="ev_cal_icon" aria-label="Add to calendar">
            <i class="fa-duotone fa-calendar-plus"></i>
          </a>
        </article>
      `;
      col.innerHTML = html.trim();
      modalBody.appendChild(col);
    });

    if (window.bootstrap && bootstrap.Modal) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  // ===== Build base DOM inside root =====
  function buildSkeleton(root) {
    root.innerHTML = `
      <div class="cal_header">
        <button class="cal_nav_btn" type="button" data-cal-nav="prev" aria-label="Previous month">
          <i class="fa-regular fa-angle-left"></i>
        </button>

        <div class="cal_month_label" data-cal-label></div>

        <button class="cal_nav_btn" type="button" data-cal-nav="next" aria-label="Next month">
          <i class="fa-regular fa-angle-right"></i>
        </button>
      </div>

      <div class="cal_weekdays">
        <div class="cal_weekday">Sun</div>
        <div class="cal_weekday">Mon</div>
        <div class="cal_weekday">Tue</div>
        <div class="cal_weekday">Wed</div>
        <div class="cal_weekday">Thu</div>
        <div class="cal_weekday">Fri</div>
        <div class="cal_weekday">Sat</div>
      </div>

      <div class="cal_grid" data-cal-grid></div>
    `;
  }

  // ===== Render month =====
  function renderMonth(root) {
    const state = root._calendarState;
    const labelEl = root.querySelector("[data-cal-label]");
    const grid = root.querySelector("[data-cal-grid]");
    if (!state || !labelEl || !grid) return;

    const year = state.year;
    const month = state.month;

    labelEl.textContent = MONTHS[month] + " " + year;
    grid.innerHTML = "";

    const start = firstDow(year, month);
    const totalDays = daysInMonth(year, month);
    const totalCells = 42; // 6 rows x 7 cols

    const activeFilters = state.activeFilters || [];
    const useFilter = activeFilters.length > 0;

    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cal_cell";

      const dayNumber = i - start + 1;

      if (dayNumber < 1 || dayNumber > totalDays) {
        cell.classList.add("is-empty");
        grid.appendChild(cell);
        continue;
      }

      const dayLabel = document.createElement("div");
      dayLabel.className = "cal_day";
      dayLabel.textContent = dayNumber;
      cell.appendChild(dayLabel);

      const key = dateKey(year, month, dayNumber);
      const rawEvents = state.fullEvents[key] || [];

      // Filter by category (work_anniversary / birthday / etc.)
      const eventsForDay = useFilter
        ? rawEvents.filter((ev) => activeFilters.indexOf(ev.category) !== -1)
        : rawEvents;

      if (eventsForDay.length) {
        cell.classList.add("has-event");
        const dateObj = new Date(year, month, dayNumber);

        eventsForDay.forEach(function (ev) {
          const wrap = document.createElement("div");
          wrap.className = "cal_event";

          const avatarHtml = ev.avatar
            ? `<div class="cal_event_avatar"><img src="${ev.avatar}" alt=""></div>`
            : "";

          const timeHtml = ev.time
            ? `<div class="cal_event_time">${ev.time}</div>`
            : "";

          wrap.innerHTML = `
            ${avatarHtml}
            <div class="cal_event_meta">
              <div class="cal_event_title">${ev.title || ""}</div>
              ${timeHtml}
            </div>
          `;
          cell.appendChild(wrap);
        });

        // Click -> callback
        cell.style.cursor = "pointer";
        cell.addEventListener("click", function () {
          state.onDayClick(dateObj, eventsForDay);
        });
      }

      grid.appendChild(cell);
    }
  }

  // ===== Public: init one calendar root =====
  function init(rootId, config) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const now = new Date();
    const opts = config || {};

    const state = {
      year: opts.initialYear != null ? opts.initialYear : now.getFullYear(),
      month: opts.initialMonth != null ? opts.initialMonth : now.getMonth(), // 0-based
      fullEvents: opts.events || {}, // { 'YYYY-MM-DD': [ {title,time,location,url,category,avatar}, ... ] }
      activeFilters: [], // array of category strings
      onDayClick:
        typeof opts.onDayClick === "function"
          ? opts.onDayClick
          : defaultDayClick,
    };

    root._calendarState = state;

    if (!root.classList.contains("events_calendar")) {
      root.classList.add("events_calendar");
    }

    buildSkeleton(root);

    const prevBtn = root.querySelector('[data-cal-nav="prev"]');
    const nextBtn = root.querySelector('[data-cal-nav="next"]');

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        state.month--;
        if (state.month < 0) {
          state.month = 11;
          state.year--;
        }
        renderMonth(root);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        state.month++;
        if (state.month > 11) {
          state.month = 0;
          state.year++;
        }
        renderMonth(root);
      });
    }

    renderMonth(root);
  }

  // ===== Public: set filters for a given root =====
  function setFilters(rootId, filters) {
    const root = document.getElementById(rootId);
    if (!root || !root._calendarState) return;

    const state = root._calendarState;
    state.activeFilters = Array.isArray(filters) ? filters.slice() : [];
    renderMonth(root);
  }

  window.QGEventCalendar = {
    init: init,
    setFilters: setFilters,
  };
})(window);
