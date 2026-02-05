<?php 
$page_title = 'Events';
include 'header.php'; ?>
<div class="site__page_container temp__events_page">
    <div class="container">
        <div class="entry_header" data-aos="fade-up">
            <h1 class="page_title"><?=$page_title; ?></h1>
        </div>
        <div class="row">
            <!-- MAIN CONTENT -->
            <div class="col main_col">
                <div class="inner_col" data-aos="fade-up">
                    <div class="row events_layout">
                        <!-- ================= LEFT: SIDEBAR FILTER ================= -->
                        <div class="col-12 col-lg-4 sidebar_col">
                            <aside class="sidebar_filter_card">
                                <!-- Filter header button -->
                                <div class="filter_header">
                                    Filter
                                </div>
                                <div class="filter_body">
                                    <!-- Search -->
                                    <div class="filter_search">
                                        <div class="filter_search_icon">
                                            <i class="fa-regular fa-magnifying-glass"></i>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Search" />
                                    </div>
                                    <div class="filter_fields">
                                        <!-- Categories -->
                                        <div class="filter_fields_group">
                                            <div class="filter_section_label">Categories</div>
                                            <div class="form-check">
                                                <input class="form-check-input js-cal-filter" type="radio" name="eventCategory" data-filter-cat="" id="filter-all-events" checked>
                                                <label class="form-check-label" for="filter-all-events">
                                                    All Events
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input js-cal-filter" type="radio" name="eventCategory" data-filter-cat="workshop" id="workshops">
                                                <label class="form-check-label" for="workshops">
                                                    Workshops
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input js-cal-filter" type="radio" name="eventCategory" data-filter-cat="training" id="trainings">
                                                <label class="form-check-label" for="trainings">
                                                    Trainings
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input js-cal-filter" type="radio" name="eventCategory" data-filter-cat="social" id="socialEvents">
                                                <label class="form-check-label" for="socialEvents">
                                                    Social Events
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input js-cal-filter" type="radio" name="eventCategory" data-filter-cat="work_anniversary" id="workAnniversaries">
                                                <label class="form-check-label" for="workAnniversaries">
                                                    Work Anniversaries
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input js-cal-filter" type="radio" name="eventCategory" data-filter-cat="birthday" id="birthdays">
                                                <label class="form-check-label" for="birthdays">
                                                    Birthdays
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Actions -->
                                    <div class="filter_actions">
                                        <button class="btn btn-primary btn-sm filter_submit_btn" type="button">
                                            Filter
                                        </button>
                                        <button class="btn btn-link btn-sm filter_reset_btn" type="button">
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <!-- ================= RIGHT: EVENTS CONTENT ================= -->
                        <div class="col-12 col-lg-8 content_col">
                            <!-- Toolbar (List / Calendar view + Date picker) -->
                            <div class="events_toolbar">
                                <!-- Left: View Tabs -->
                                <ul class="nav nav-tabs events_view_toggle" id="eventsViewTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link active" id="events-list-tab" data-bs-toggle="tab" data-bs-target="#events-list-pane" type="button" role="tab" aria-controls="events-list-pane" aria-selected="true">
                                            <i class="fa-regular fa-list me-2"></i> List View
                                        </button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="events-calendar-tab" data-bs-toggle="tab" data-bs-target="#events-calendar-pane" type="button" role="tab" aria-controls="events-calendar-pane" aria-selected="false">
                                            <i class="fa-regular fa-calendar-range me-2"></i> Calendar View
                                        </button>
                                    </li>
                                </ul>
                                <!-- Right: Date picker -->
                                <div class="events_date_filter">
                                    <div class="input-group">
                                        <input type="date" class="form-control" />
                                        <!--span class="input-group-text">
                                            <i class="fa-regular fa-calendar-days"></i>
                                        </span-->
                                    </div>
                                </div>
                            </div>
                            <div class="tab-content events_tab_content" id="eventsViewTabContent">
                                <!-- LIST VIEW -->
                                <div class="tab-pane fade show active" id="events-list-pane" role="tabpanel" aria-labelledby="events-list-tab" tabindex="0">
                                    <div class="row events_grid">
                                        <!-- Event item -->
                                        <div class="col-md-6 event_item">
                                            <article class="inner_item">
                                                <div class="ev_date">
                                                    18
                                                    <small>November</small>
                                                </div>
                                                <div class="ev_infos">
                                                    <h3 class="ev_title">
                                                        <a href="#">Workshop Event Name</a>
                                                    </h3>
                                                    <div class="ev_time list_txt">
                                                        <i class="fa-regular fa-clock me-1"></i>
                                                        3:00PM - 5:00PM
                                                    </div>
                                                    <div class="ev_location list_txt">
                                                        <i class="fa-regular fa-location-dot me-1"></i>
                                                        Specified Location
                                                    </div>
                                                </div>
                                                <a href="#" class="ev_cal_icon" aria-label="Add to calendar">
                                                    <i class="fa-duotone fa-calendar-plus"></i>
                                                </a>
                                            </article>
                                        </div>
                                        <!--/.event_item-->
                                        <div class="col-md-6 event_item">
                                            <article class="inner_item">
                                                <div class="ev_date">
                                                    01
                                                    <small>December</small>
                                                </div>
                                                <div class="ev_infos">
                                                    <h3 class="ev_title">
                                                        <a href="#">Workshop Event Name</a>
                                                    </h3>
                                                    <div class="ev_time list_txt">
                                                        <i class="fa-regular fa-clock me-1"></i>
                                                        3:00PM - 5:00PM
                                                    </div>
                                                    <div class="ev_location list_txt">
                                                        <i class="fa-regular fa-location-dot me-1"></i>
                                                        Specified Location
                                                    </div>
                                                </div>
                                                <a href="#" class="ev_cal_icon" aria-label="Add to calendar">
                                                    <i class="fa-duotone fa-calendar-plus"></i>
                                                </a>
                                            </article>
                                        </div>
                                        <div class="col-md-6 event_item">
                                            <article class="inner_item">
                                                <div class="ev_date">
                                                    01
                                                    <small>January</small>
                                                </div>
                                                <div class="ev_infos">
                                                    <h3 class="ev_title">
                                                        <a href="#">Workshop Event Name</a>
                                                    </h3>
                                                    <div class="ev_time list_txt">
                                                        <i class="fa-regular fa-clock me-1"></i>
                                                        3:00PM - 5:00PM
                                                    </div>
                                                    <div class="ev_location list_txt">
                                                        <i class="fa-regular fa-location-dot me-1"></i>
                                                        Specified Location
                                                    </div>
                                                </div>
                                                <a href="#" class="ev_cal_icon" aria-label="Add to calendar">
                                                    <i class="fa-duotone fa-calendar-plus"></i>
                                                </a>
                                            </article>
                                        </div>
                                        <div class="col-md-6 event_item">
                                            <article class="inner_item">
                                                <div class="ev_date">
                                                    09
                                                    <small>January</small>
                                                </div>
                                                <div class="ev_infos">
                                                    <h3 class="ev_title">
                                                        <a href="#">Workshop Event Name</a>
                                                    </h3>
                                                    <div class="ev_time list_txt">
                                                        <i class="fa-regular fa-clock me-1"></i>
                                                        3:00PM - 5:00PM
                                                    </div>
                                                    <div class="ev_location list_txt">
                                                        <i class="fa-regular fa-location-dot me-1"></i>
                                                        Specified Location
                                                    </div>
                                                </div>
                                                <a href="#" class="ev_cal_icon" aria-label="Add to calendar">
                                                    <i class="fa-duotone fa-calendar-plus"></i>
                                                </a>
                                            </article>
                                        </div>
                                        <div class="col-md-6 event_item">
                                            <article class="inner_item">
                                                <div class="ev_date">
                                                    14
                                                    <small>December</small>
                                                </div>
                                                <div class="ev_infos">
                                                    <h3 class="ev_title">
                                                        <a href="#">Workshop Event Name</a>
                                                    </h3>
                                                    <div class="ev_time list_txt">
                                                        <i class="fa-regular fa-clock me-1"></i>
                                                        3:00PM - 5:00PM
                                                    </div>
                                                    <div class="ev_location list_txt">
                                                        <i class="fa-regular fa-location-dot me-1"></i>
                                                        Specified Location
                                                    </div>
                                                </div>
                                                <a href="#" class="ev_cal_icon" aria-label="Add to calendar">
                                                    <i class="fa-duotone fa-calendar-plus"></i>
                                                </a>
                                            </article>
                                        </div>
                                        <div class="col-md-6 event_item">
                                            <article class="inner_item">
                                                <div class="ev_date">
                                                    02
                                                    <small>February</small>
                                                </div>
                                                <div class="ev_infos">
                                                    <h3 class="ev_title">
                                                        <a href="#">Workshop Event Name</a>
                                                    </h3>
                                                    <div class="ev_time list_txt">
                                                        <i class="fa-regular fa-clock me-1"></i>
                                                        3:00PM - 5:00PM
                                                    </div>
                                                    <div class="ev_location list_txt">
                                                        <i class="fa-regular fa-location-dot me-1"></i>
                                                        Specified Location
                                                    </div>
                                                </div>
                                                <a href="#" class="ev_cal_icon" aria-label="Add to calendar">
                                                    <i class="fa-duotone fa-calendar-plus"></i>
                                                </a>
                                            </article>
                                        </div>
                                    </div>
                                    <!-- /.events_grid -->
                                </div>
                                <!-- CALENDAR VIEW -->
                                <div class="tab-pane fade" id="events-calendar-pane" role="tabpanel" aria-labelledby="events-calendar-tab" tabindex="0">
                                    <!-- Calendar root – JS will build inside -->
                                    <div class="events_calendar qg-calendar" id="eventsCalendarMain"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- QUICK LINKS -->
            <div class="col-auto quick_link_col">
                <div class="inner_col" data-aos="fade-left">
                    <?php include 'quick-link-widget.php'; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
<!-- Global Event Day Modal (used by QGEventCalendar) -->
<div class="modal fade" id="eventDayModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="eventDayModalLabel">Events</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row events_list" id="eventDayModalBody">
                    <!-- Filled by JS -->
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Page-specific script: init calendar + filters -->
<script>
document.addEventListener("DOMContentLoaded", function() {
    // ===== Example events =====
    // category: 'work_anniversary' | 'birthday' | 'workshop' | etc.
    const eventsData = {
        "2026-01-27": [{
            title: "Name A Surname",
            time: "",
            location: "",
            url: "#",
            category: "work_anniversary",
            avatar: "https://i.pravatar.cc/120?img=12"
        }],
        "2026-01-30": [{
            title: "Name B Surname",
            time: "",
            location: "",
            url: "#",
            category: "birthday",
            avatar: "https://i.pravatar.cc/120?img=32"
        }],
        "2026-01-31": [{
            title: "Name C Surname",
            time: "",
            location: "",
            url: "#",
            category: "work_anniversary",
            avatar: "https://i.pravatar.cc/120?img=47"
        }],
        "2026-02-04": [{
            title: "Name D Surname",
            time: "",
            location: "",
            url: "#",
            category: "birthday",
            avatar: "https://i.pravatar.cc/120?img=5"
        }],
    };

    // ===== Init global calendar instance on this page =====
    if (window.QGEventCalendar) {
        QGEventCalendar.init("eventsCalendarMain", {
            initialYear: 2026,
            initialMonth: 0, // 0-based (10 = November)
            events: eventsData
        });
    }

    // ===== Sidebar filter -> calendar filters =====
    const allBox = document.getElementById("filter-all-events");
    const resetBtn = document.getElementById("calFilterReset");
    const filterBoxes = document.querySelectorAll(".js-cal-filter");

    function applyFilters() {
        if (!window.QGEventCalendar) return;

        // Collect active non-empty categories
        const active = [];
        filterBoxes.forEach(cb => {
            const cat = cb.getAttribute("data-filter-cat") || "";
            if (cb.checked && cat !== "") {
                active.push(cat);
            }
        });

        // If "All Events" checked OR no specific checked => no filter (show all)
        if ((allBox && allBox.checked) || active.length === 0) {
            QGEventCalendar.setFilters("eventsCalendarMain", []);
        } else {
            QGEventCalendar.setFilters("eventsCalendarMain", active);
        }
    }

    filterBoxes.forEach(cb => {
        cb.addEventListener("change", function() {
            // "All Events" logic: if user checks All -> uncheck others
            if (this.id === "filter-all-events" && this.checked) {
                filterBoxes.forEach(other => {
                    if (other !== this) other.checked = false;
                });
            } else if (this.id !== "filter-all-events" && this.checked) {
                // Any other filter checked -> uncheck All
                if (allBox) allBox.checked = false;
            }
            applyFilters();
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener("click", function(e) {
            e.preventDefault();
            // Reset to only All Events
            filterBoxes.forEach(cb => cb.checked = false);
            if (allBox) allBox.checked = true;
            applyFilters();
        });
    }

    // Initial
    applyFilters();
});
</script>