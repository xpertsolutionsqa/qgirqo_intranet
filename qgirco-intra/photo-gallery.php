<?php 
$page_title = 'Photo Gallery';
include 'header.php'; ?>
<div class="site__page_container temp__photo_gallery">
    <div class="container">
        <div class="entry_header" data-aos="fade-up">
            <h1 class="page_title"><?=$page_title;?></h1>
        </div>
        <div class="row">
            <!-- MAIN CONTENT -->
            <div class="col main_col">
                <div class="inner_col" data-aos="fade-up">
                    <!-- ================= FILTER BAR ================= -->
                    <div class="pg_filter_bar mb-4">
                        <div class="row g-3 align-items-end">
                            <!-- Filter by album -->
                            <div class="col-12 col-lg-3 col-md-4">
                                <label class="form-label pg_filter_label mb-1">Filter by album</label>
                                <div class="pg_filter_control position-relative">
                                    <input type="text" class="form-control pg_filter_input" placeholder="Search album name">
                                    <button class="pg_filter_icon_btn" type="button" aria-label="Search">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </button>
                                </div>
                            </div>
                            <!-- Filter by date -->
                            <div class="col-12 col-lg-3 col-md-4">
                                <label class="form-label pg_filter_label mb-1">Filter by date</label>
                                <div class="pg_filter_control position-relative">
                                    <input type="text" class="form-control pg_filter_input" placeholder="10/16/2025">
                                    <button class="pg_filter_icon_btn" type="button" aria-label="Open calendar">
                                        <i class="fa-regular fa-calendar-days"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- ================= YEAR NAVIGATION ================= -->
                    <div class="pg_year_nav_wrapper mb-4">
                        <div class="pg_year_nav_list">
                            <button type="button" class="pg_year_btn is-active">2025</button>
                            <button type="button" class="pg_year_btn">2024</button>
                            <button type="button" class="pg_year_btn">2023</button>
                            <button type="button" class="pg_year_btn">2022</button>
                            <button type="button" class="pg_year_btn">2021</button>
                            <button type="button" class="pg_year_more ms-3">
                                &gt;&gt;&gt;&gt;
                            </button>
                        </div>
                    </div>
                    <!-- ================= ALBUM GRID ================= -->
                    <div class="pg_albums_grid">
                        <div class="row g-3">
                            <!-- Album card -->
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1402.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">12</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1403.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">13</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1404.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">14</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1405.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">16</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <!-- Row 2 -->
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1402.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">12</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1403.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">10</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1404.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">12</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div class="col-12 col-md-6 col-xl-3">
                                <article class="pg_album_card card h-100">
                                    <div class="pg_album_thumb ratio ratio-16x9">
                                        <img src="http://localhost/webs/HTML/qgirco-intra/assets/img/Rectangle-1405.jpg" class="card-img-top" alt="Album cover">
                                    </div>
                                    <div class="pg_album_meta d-flex">
                                        <div class="pg_album_info flex-grow-1">
                                            <h3 class="pg_album_title mb-1">Album Name</h3>
                                            <div class="pg_album_count">5 photos</div>
                                        </div>
                                        <div class="pg_album_date">
                                            <div class="pg_album_day">21</div>
                                            <div class="pg_album_month">NOV</div>
                                            <div class="pg_album_year">2025</div>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                    <!-- ================= PAGINATION ================= -->
                    <div class="pg_pagination_wrapper">
                        <nav aria-label="Photo gallery pages">
                            <ul class="pagination justify-content-center pg_pagination mb-0">
                                <li class="page-item">
                                    <button class="page-link pg_page_arrow" type="button" aria-label="Previous page">
                                        <i class="fa-regular fa-chevron-left"></i>
                                    </button>
                                </li>
                                <li class="page-item active">
                                    <button class="page-link pg_page_number" type="button">1</button>
                                </li>
                                <li class="page-item"><button class="page-link pg_page_number" type="button">2</button></li>
                                <li class="page-item"><button class="page-link pg_page_number" type="button">3</button></li>
                                <li class="page-item"><button class="page-link pg_page_number" type="button">4</button></li>
                                <li class="page-item"><button class="page-link pg_page_number" type="button">5</button></li>
                                <li class="page-item">
                                    <button class="page-link pg_page_arrow" type="button" aria-label="Next page">
                                        <i class="fa-regular fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
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