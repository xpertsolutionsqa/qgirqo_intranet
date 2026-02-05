<?php 
// Promotion Page
$page_title = 'Employee Benefits & Exclusive Offers';
include 'header.php'; ?>
<div class="site__page_container temp__events_page temp__promotions_page">
    <div class="container">
        <!-- Page heading -->
        <div class="entry_header" data-aos="fade-up">
            <h1 class="page_title"><?=$page_title;?></h1>
        </div>
        <div class="row">
            <!-- ================= MAIN CONTENT ================= -->
            <div class="col main_col">
                <div class="inner_col" data-aos="fade-up">
                    <div class="row events_layout promotions_layout">
                        <!-- ========== LEFT: SIDEBAR FILTER ========== -->
                        <div class="col-12 col-lg-4 sidebar_col">
                            <aside class="sidebar_filter_card promotions_filter_card">
                                <!-- Filter header -->
                                <div class="filter_header promotions_filter_header">
                                    Filter
                                </div>
                                <div class="filter_body promotions_filter_body">
                                    <!-- Search -->
                                    <div class="filter_search promotions_filter_search">
                                        <div class="filter_search_icon">
                                            <i class="fa-regular fa-magnifying-glass"></i>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Search" />
                                    </div>
                                    <!-- Radios -->
                                    <div class="filter_fields promotions_filter_fields">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="promoCategory" value="" id="promocat1">
                                            <label class="form-check-label" for="promocat1">
                                                Discount &amp; Vouchers
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="promoCategory" value="" id="promocat2">
                                            <label class="form-check-label" for="promocat2">
                                                Travel &amp; Vouchers
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="promoCategory" value="" id="promocat3">
                                            <label class="form-check-label" for="promocat3">
                                                Discount &amp; Vouchers
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="promoCategory" value="" id="promocat4">
                                            <label class="form-check-label" for="promocat4">
                                                Travel &amp; Vouchers
                                            </label>
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
                        <!-- ========== RIGHT: PROMOTIONS CONTENT ========== -->
                        <div class="col-12 col-lg-8 content_col promotions_content_col">
                            <!-- Top blue bar heading -->
                            <div class="top_toolbar promotions_toolbar">
                                <div class="top_toolbar_title">
                                    All Promotions &amp; Offers
                                </div>
                            </div>
                            <!-- Promotions grid -->
                            <div class="promotions_wrapper">
                                <div class="row promotions_grid">
                                    <!-- Card -->
                                    <div class="col-12 col-md-6 col-xl-4 promotion_item">
                                        <div class="qg_offer_inner">
                                            <div class="qg_offer_media">
                                                <img src="assets/img/Rectangle-1384-1.jpg" alt="offer pic">
                                            </div>
                                            <div class="qg_offer_title">15% on Qatar Airways Flight Tickets</div>
                                            <div class="qg_offer_sub">Valid until 31 December 2025</div>
                                            <div class="text-center">
                                                <a href="#" class="qg_offer_btn">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Card -->
                                    <div class="col-12 col-md-6 col-xl-4 promotion_item">
                                        <div class="qg_offer_inner">
                                            <div class="qg_offer_media">
                                                <img src="assets/img/Rectangle-1384-1.jpg" alt="offer pic">
                                            </div>
                                            <div class="qg_offer_title">15% on Qatar Airways Flight Tickets</div>
                                            <div class="qg_offer_sub">Valid until 31 December 2025</div>
                                            <div class="text-center">
                                                <a href="#" class="qg_offer_btn">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Card -->
                                    <div class="col-12 col-md-6 col-xl-4 promotion_item">
                                        <div class="qg_offer_inner">
                                            <div class="qg_offer_media">
                                                <img src="assets/img/Rectangle-1384-1.jpg" alt="offer pic">
                                            </div>
                                            <div class="qg_offer_title">15% on Qatar Airways Flight Tickets</div>
                                            <div class="qg_offer_sub">Valid until 31 December 2025</div>
                                            <div class="text-center">
                                                <a href="#" class="qg_offer_btn">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Card -->
                                    <div class="col-12 col-md-6 col-xl-4 promotion_item">
                                        <div class="qg_offer_inner">
                                            <div class="qg_offer_media">
                                                <img src="assets/img/Rectangle-1384-1.jpg" alt="offer pic">
                                            </div>
                                            <div class="qg_offer_title">15% on Qatar Airways Flight Tickets</div>
                                            <div class="qg_offer_sub">Valid until 31 December 2025</div>
                                            <div class="text-center">
                                                <a href="#" class="qg_offer_btn">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.promotions_wrapper -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- ================= QUICK LINKS ================= -->
            <div class="col-auto quick_link_col">
                <div class="inner_col" data-aos="fade-left">
                    <?php include 'quick-link-widget.php'; ?>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>