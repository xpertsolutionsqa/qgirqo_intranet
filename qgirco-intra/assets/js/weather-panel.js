/*
   Weather hover dropdown + real Doha weather (Open-Meteo, no API key)
   Requirements in HTML:
   - Wrapper: #weatherDropdown
   - Button : #weatherPanelBtn
   - Panel  : #weatherPanel

   Inside panel (IDs expected):
   #w_city, #w_desc, #w_temp, #w_feels, #w_hum, #w_wind, #w_precip, #w_days, #w_icon
*/

(function () {
  "use strict";

  // ---------- helpers ----------
  function $(id) {
    return document.getElementById(id);
  }
  function setText(id, value) {
    const el = $(id);
    if (el) el.textContent = value;
  }
  function setAttr(id, attr, value) {
    const el = $(id);
    if (el) el.setAttribute(attr, value);
  }
  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  // Map Open-Meteo weather codes to labels + your icon files.
  // Update paths to match your project.
  function mapWeather(code, isNight) {
    // Font Awesome free icons
    // https://fontawesome.com/icons (fa-solid)
    const clearDay = "fa-duotone fa-sun";
    const clearNight = "fa-duotone fa-moon";
    const partCloud = "fa-duotone fa-cloud-sun";
    const partCloudN = "fa-duotone fa-cloud-moon";
    const cloudy = "fa-duotone fa-cloud";
    const rain = "fa-duotone fa-cloud-showers-heavy";
    const storm = "fa-duotone fa-cloud-bolt";
    const snow = "fa-duotone fa-snowflake";
    const fog = "fa-duotone fa-smog";

    const map = {
      0: { label: "Clear", iconClass: isNight ? clearNight : clearDay },
      1: { label: "Mostly Clear", iconClass: isNight ? clearNight : partCloud },
      2: {
        label: "Partly Cloudy",
        iconClass: isNight ? partCloudN : partCloud,
      },
      3: { label: "Mostly Cloudy", iconClass: cloudy },
      45: { label: "Fog", iconClass: fog },
      48: { label: "Fog", iconClass: fog },
      51: { label: "Drizzle", iconClass: rain },
      53: { label: "Drizzle", iconClass: rain },
      55: { label: "Drizzle", iconClass: rain },
      56: { label: "Freezing Drizzle", iconClass: rain },
      57: { label: "Freezing Drizzle", iconClass: rain },
      61: { label: "Rain", iconClass: rain },
      63: { label: "Rain", iconClass: rain },
      65: { label: "Heavy Rain", iconClass: rain },
      66: { label: "Freezing Rain", iconClass: rain },
      67: { label: "Freezing Rain", iconClass: rain },
      71: { label: "Snow", iconClass: snow },
      73: { label: "Snow", iconClass: snow },
      75: { label: "Snow", iconClass: snow },
      77: { label: "Snow Grains", iconClass: snow },
      80: { label: "Showers", iconClass: rain },
      81: { label: "Showers", iconClass: rain },
      82: { label: "Heavy Showers", iconClass: rain },
      85: { label: "Snow Showers", iconClass: snow },
      86: { label: "Snow Showers", iconClass: snow },
      95: { label: "Thunderstorm", iconClass: storm },
      96: { label: "Thunderstorm", iconClass: storm },
      99: { label: "Thunderstorm", iconClass: storm },
    };

    return map[code] || { label: "Weather", iconClass: partCloud };
  }

  function dayName(dateStr) {
    // dateStr: "YYYY-MM-DD"
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }

  function nearestIndex(times, targetISO) {
    // times: ["2026-01-16T11:00", ...] (timezone set in API)
    const target = new Date(targetISO).getTime();
    let best = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < times.length; i++) {
      const t = new Date(times[i]).getTime();
      const diff = Math.abs(t - target);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = i;
      }
    }
    return best;
  }

  function isNightHour(iso) {
    // rough: night = 18..5
    const h = new Date(iso).getHours();
    return h >= 18 || h <= 5;
  }

  // ---------- init on DOM ready ----------
  document.addEventListener("DOMContentLoaded", function () {
    const wrap = $("weatherDropdown");
    const btn = $("weatherPanelBtn");
    const panel = $("weatherPanel");

    // If the header/page doesn't include the widget, fail silently.
    if (!wrap || !btn || !panel) return;

    // ---------- open / close behavior (IMPROVED) ----------
    let isPointerInside = false;

    function openPanel() {
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }

    function closePanel() {
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }

    // Track pointer inside the whole widget (icon + panel)
    wrap.addEventListener("mouseenter", () => {
      isPointerInside = true;
      openPanel();
    });

    wrap.addEventListener("mouseleave", () => {
      isPointerInside = false;
      // small delay to allow smooth exit
      setTimeout(() => {
        if (!isPointerInside) closePanel();
      }, 120);
    });

    // Click toggle (useful for touch devices)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (wrap.classList.contains("is-open")) {
        closePanel();
      } else {
        openPanel();
      }
    });

    // Click outside closes (panel-safe)
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) {
        closePanel();
      }
    });

    // Keyboard accessibility
    btn.addEventListener("focus", openPanel);

    wrap.addEventListener("focusin", () => {
      openPanel();
    });

    wrap.addEventListener("focusout", (e) => {
      if (!wrap.contains(e.relatedTarget)) {
        closePanel();
      }
    });

    // ---------- WEATHER DATA (Doha by default) ----------
    // You can change these, or set window.QG_WEATHER_CONFIG before this script loads.
    const cfg = window.QG_WEATHER_CONFIG || {};
    const city = cfg.city || "Doha";
    const lat = typeof cfg.lat === "number" ? cfg.lat : 25.2854;
    const lon = typeof cfg.lon === "number" ? cfg.lon : 51.531;
    const tz = cfg.timezone || "Asia/Qatar";
    const units = cfg.units || "metric"; // reserved; Open-Meteo is metric by default.

    // Fill city label safely (prevents your previous error)
    setText("w_city", city);
    setText("w_desc", "Loading...");
    setText("w_temp", "--");
    setText("w_feels", "--");
    setText("w_hum", "--%");
    setText("w_precip", "--%");
    setText("w_wind", "-- km/h");

    async function loadWeather() {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast" +
          `?latitude=${encodeURIComponent(lat)}` +
          `&longitude=${encodeURIComponent(lon)}` +
          "&current=temperature_2m,weather_code,wind_speed_10m" +
          "&hourly=relativehumidity_2m,precipitation_probability,apparent_temperature" +
          "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
          `&timezone=${encodeURIComponent(tz)}`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Weather request failed: " + res.status);

        const data = await res.json();
        if (!data || !data.current) throw new Error("Invalid weather response");

        // Current values
        const c = data.current;
        const night = isNightHour(c.time);
        const w = mapWeather(c.weather_code, night);

        setText("w_temp", Math.round(c.temperature_2m));
        setText("w_wind", Math.round(c.wind_speed_10m) + " km/h");
        setText("w_desc", w.label);

        // Icon
        const iconEl = $("w_icon");
        if (iconEl) {
          iconEl.className = "weather_main_icon " + w.iconClass;
          iconEl.setAttribute("aria-hidden", "true");
        }

        // Hourly closest to current time
        const hi = nearestIndex(data.hourly.time, c.time);
        const hum = data.hourly.relativehumidity_2m?.[hi];
        const pop = data.hourly.precipitation_probability?.[hi];
        const feel = data.hourly.apparent_temperature?.[hi];

        setText("w_hum", (hum ?? "--") + "%");
        setText("w_precip", clamp(pop ?? 0, 0, 100) + "%");
        setText("w_feels", Math.round(feel ?? c.temperature_2m));

        // 7-day forecast
        const days = data.daily?.time || [];
        const maxT = data.daily?.temperature_2m_max || [];
        const minT = data.daily?.temperature_2m_min || [];
        const codes = data.daily?.weather_code || [];

        const daysEl = $("w_days");
        if (daysEl && days.length) {
          const html = days
            .slice(0, 7)
            .map(function (d, i) {
              const dw = mapWeather(codes[i], false);
              const hiT = maxT[i] != null ? Math.round(maxT[i]) : "--";
              const loT = minT[i] != null ? Math.round(minT[i]) : "--";

              return (
                '<div class="w_day">' +
                '<div class="d">' +
                dayName(d) +
                "</div>" +
                '<div class="icon"><i class="weather_day_icon ' +
                dw.iconClass +
                '"></i></div>' +
                '<div class="t">' +
                '<span class="hi">' +
                hiT +
                "°</span>" +
                '<span class="lo">' +
                loT +
                "°</span>" +
                "</div>" +
                "</div>"
              );
            })
            .join("");

          daysEl.innerHTML = html;
        }
      } catch (err) {
        // Do not crash the site; show a friendly message
        setText("w_desc", "Weather unavailable");
        // Keep console log for dev
        console.error("[weather-panel]", err);
      }
    }

    // Load immediately + refresh periodically
    loadWeather();
    window.setInterval(loadWeather, 20 * 60 * 1000); // 20 minutes
  });
})();
