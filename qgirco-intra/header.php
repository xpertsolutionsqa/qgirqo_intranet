<!doctype html>
<html lang="en">

<head>
    <!-- Basic Page Needs
    ================================================== -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- Specific Meta
    ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <meta name="keyword" content="" />
    <meta name="description" content="" />
    <meta name="author" content="QGIRCO Intranet " />
    <meta name="rights" content="QGIRCO Intranet  " />
    <!-- Site Title
    ================================================== -->
    <title><?php echo isset($page_title) ? $page_title . ' | QGIRCO Intranet' : 'QGIRCO Intranet - Home'; ?></title>
    <title></title>
    <!-- Site Favicon
    ================================================== -->
    <link rel="shortcut icon" href="assets/images/favicon.png" />
    <!-- Site Font
    ================================================== -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/font-awesome-6pro/all.css" />
    <!-- All CSS Here
    ================================================== -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/swiper-bundle.min.css" />
    <link rel="stylesheet" href="assets/css/glightbox.min.css" />
    <link rel="stylesheet" href="assets/css/event-calendar.css" />
    <link rel="stylesheet" href="assets/css/weather-panel.css" />
    <!---->
    <link rel="stylesheet" href="assets/css/style.css" />
</head>
<header class="site__header">
    <div class="inner_header" data-aos="fade-down">
        <div class="container">
            <div class="d-flex align-items-center justify-content-between">
                <!-- Left: Brand + Greeting -->
                <div class="d-flex align-items-center gap-3">
                    <div class="qa-brand">
                        <a href=".">
                            <img src="assets/img/qgirco-logo-white.svg" alt="QGIRCO Intranet" />
                        </a>
                    </div>
                    <div class="meta_info">
                        <div class="user_name fw-semibold">
                            Hello <span>Abdulrahman</span>
                        </div>
                        <div class="date"><?php echo date("l, d F Y");?></div>
                    </div>
                </div>
                <!-- Right: Icons -->
                <div class="icon_links d-flex align-items-center gap-2">
                    <!-- WEATHER DROPDOWN (ICON + PANEL) -->
                    <div class="weather_dropdown" id="weatherDropdown">
                        <a class="btn_icon" href="#" id="weatherPanelBtn" aria-label="Weather" aria-haspopup="dialog" aria-expanded="false">
                            <img src="assets/img/weather.svg" alt="Weather icon" />
                        </a>
                        <!-- WEATHER PANEL (slides down) -->
                        <!-- WEATHER PANEL -->
                        <div class="weather_panel" id="weatherPanel" role="dialog" aria-label="Weather panel">
                            <div class="weather_card">
                                <!-- Top: title + status -->
                                <div class="weather_top">
                                    <div class="weather_title">
                                        <span>Today in</span> <strong id="w_city">Doha</strong>
                                    </div>
                                    <div class="weather_status" id="w_desc">Loading...</div>
                                </div>
                                <!-- Middle: icon + temps + stats -->
                                <div class="weather_mid">
                                    <div class="weather_icon">
                                        <!-- Font Awesome icon, JS will change classes -->
                                        <i id="w_icon" class="weather_main_icon fa-solid fa-cloud-sun"></i>
                                    </div>
                                    <div class="weather_temp">
                                        <div class="weather_temp_value">
                                            <span id="w_temp">--</span><span class="deg">°</span> <span class="unit">C</span>
                                        </div>
                                        <div class="weather_feels">
                                            Feels like <span id="w_feels">--</span>°C
                                        </div>
                                    </div>
                                    <div class="weather_stats">
                                        <div class="stat">
                                            <span class="k">Precipitation:</span>
                                            <span class="v" id="w_precip">--%</span>
                                        </div>
                                        <div class="stat">
                                            <span class="k">Humidity:</span>
                                            <span class="v" id="w_hum">--%</span>
                                        </div>
                                        <div class="stat">
                                            <span class="k">Wind:</span>
                                            <span class="v" id="w_wind">-- km/h</span>
                                        </div>
                                    </div>
                                </div>
                                <!-- Bottom: 7-day forecast -->
                                <div class="weather_days" id="w_days">
                                    <!-- JS will inject each .w_day -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END WEATHER -->
                    <a class="btn_icon" href="#" aria-label="Search">
                        <img src="assets/img/search.svg" alt="Search icon" />
                    </a>
                    <a class="btn_icon" href="#" aria-label="Notifications">
                        <img src="assets/img/notification.svg" alt="Notifications icon" />
                    </a>
                    <a class="btn_icon" href="#" aria-label="Lang Switch">
                        <img src="assets/img/lang-switch.svg" alt="Lang Switch icon" />
                    </a>
                    <a class="btn_icon" href="#" aria-label="My Profile">
                        <img src="assets/img/my-profile.svg" alt="Profile icon" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

<body>