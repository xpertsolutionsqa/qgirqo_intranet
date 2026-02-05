(function () {
  // ====== Demo events (replace with API later) ======
  // Key format: YYYY-MM-DD
  const EVENTS = {
    "2025-12-01": [{ title: "Workshop Event Name", time: "3:00PM - 5:00PM" }],
    "2025-12-14": [{ title: "Workshop Event Name", time: "3:00PM - 5:00PM" }],
    "2025-12-20": [{ title: "Workshop Event Name", time: "3:00PM - 5:00PM" }],
  };

  // Elements
  const calRoot = document.getElementById("eventsCalendar");
  if (!calRoot) return;

  const grid = document.getElementById("calGrid");
  const monthLabel = document.getElementById("calMonthLabel");
  const prevBtn = document.getElementById("calPrevBtn");
  const nextBtn = document.getElementById("calNextBtn");

  // State (start from Dec 2025 to match screenshot)
  let currentYear = 2025;
  let currentMonth = 11; // 0=Jan ... 11=Dec

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

  function firstDayOfMonth(year, monthIndex) {
    return new Date(year, monthIndex, 1).getDay(); // 0=Sun..6=Sat
  }

  function formatKey(year, monthIndex, day) {
    return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
  }

  function renderCalendar() {
    // Title
    monthLabel.textContent = `${MONTHS[currentMonth]} ${currentYear}`;

    // Clear grid
    grid.innerHTML = "";

    const startDow = firstDayOfMonth(currentYear, currentMonth);
    const totalDays = daysInMonth(currentYear, currentMonth);

    // We want a fixed 6-row grid like classic calendars (42 cells)
    const totalCells = 42;

    for (let cellIndex = 0; cellIndex < totalCells; cellIndex++) {
      const cell = document.createElement("div");
      cell.className = "cal_cell";

      const dayNumber = cellIndex - startDow + 1;

      if (dayNumber < 1 || dayNumber > totalDays) {
        cell.classList.add("is-empty");
        grid.appendChild(cell);
        continue;
      }

      const dayEl = document.createElement("div");
      dayEl.className = "cal_day";
      dayEl.textContent = dayNumber;
      cell.appendChild(dayEl);

      const key = formatKey(currentYear, currentMonth, dayNumber);
      const dayEvents = EVENTS[key];

      if (dayEvents && dayEvents.length) {
        cell.classList.add("has-event");

        const ev = dayEvents[0]; // screenshot shows one
        const evWrap = document.createElement("div");
        evWrap.className = "cal_event";
        evWrap.innerHTML = `
          <div class="cal_event_title">${ev.title}</div>
          <div class="cal_event_time">${ev.time}</div>
        `;
        cell.appendChild(evWrap);

        // Optional: click to open details later
        cell.style.cursor = "pointer";
        cell.addEventListener("click", () => {
          // Replace with your modal/details
          console.log("Event day clicked:", key, dayEvents);
        });
      }

      grid.appendChild(cell);
    }
  }

  function goPrev() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  }

  function goNext() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  // Render initial
  renderCalendar();
})();
