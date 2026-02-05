<?php 
$page_title = 'Health & Wellness Hub';
include 'header.php'; ?>
<div class="site__page_container temp__health_details">
    <div class="container">
        <div class="entry_header" data-aos="fade-up">
            <h1 class="page_title"><?=$page_title;?></h1>
        </div>
        <div class="row">
            <!-- MAIN CONTENT -->
            <div class="col main_col">
                <div class="inner_col" data-aos="fade-up">
                    <div class="hwh_hero">
                        <!-- Replace with your image -->
                        <img src="https://images.unsplash.com/photo-1529693662653-9d480530a697?q=80&amp;w=1600&amp;auto=format&amp;fit=crop" alt="Health &amp; Wellness">
                        <a href="#" class="hwh_ribbon">New! 10K Step Challenge - Join Now</a>
                    </div>
                    <div class="hwh_lower">
                        <!-- Featured Article -->
                        <div class="col_end col_featured_article">
                            <div class="hwh_block__head">Featured Article</div>
                            <div class="hwh_article">
                                <div class="hwh_article__thumb">
                                    <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&amp;w=800&amp;auto=format&amp;fit=crop" alt="Article">
                                </div>
                                <div>
                                    <div class="hwh_article__date">20 October 2025</div>
                                    <div class="hwh_article__title">5-minute Desk Yoga for a Refreshed Soul</div>
                                </div>
                            </div>
                            <div class="hwh_article__desc">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor.</p>
                            </div>
                        </div>
                        <!-- Upcoming Events -->
                        <div class="col_end col_upcoming_events">
                            <div class="hwh_block__head">Upcoming Event</div>
                            <div class="event_list">
                                <div class="hwh_event event_item">
                                    <div class="inner_item">
                                        <div class="ev_date">22<small>January</small></div>
                                        <div class="ev_infos">
                                            <div class="ev_title"><a href="#">5-minute Desk Yoga</a></div>
                                            <div class="ev_time list_txt"><i class="fa-regular fa-clock me-1"></i>3:00PM - 5:00PM</div>
                                            <div class="ev_location list_txt"><i class="fa-regular fa-location-dot me-1"></i>Specified Location</div>
                                        </div>
                                        <a href="#" class="ev_cal_icon"><i class="fa-duotone fa-solid fa-calendar-plus"></i></a>
                                    </div>
                                </div>
                                <div class="hwh_event event_item">
                                    <div class="inner_item">
                                        <div class="ev_date">24<small>January</small></div>
                                        <div class="ev_infos">
                                            <div class="ev_title"><a href="#">5-minute Desk Yoga</a></div>
                                            <div class="ev_time list_txt"><i class="fa-regular fa-clock me-1"></i>3:00PM - 5:00PM</div>
                                            <div class="ev_location list_txt"><i class="fa-regular fa-location-dot me-1"></i>Specified Location</div>
                                        </div>
                                        <a href="#" class="ev_cal_icon"><i class="fa-duotone fa-solid fa-calendar-plus"></i></a>
                                    </div>
                                </div>
                                <div class="hwh_event event_item">
                                    <div class="inner_item">
                                        <div class="ev_date">28<small>January</small></div>
                                        <div class="ev_infos">
                                            <div class="ev_title"><a href="#">5-minute Desk Yoga</a></div>
                                            <div class="ev_time list_txt"><i class="fa-regular fa-clock me-1"></i>3:00PM - 5:00PM</div>
                                            <div class="ev_location list_txt"><i class="fa-regular fa-location-dot me-1"></i>Specified Location</div>
                                        </div>
                                        <a href="#" class="ev_cal_icon"><i class="fa-duotone fa-solid fa-calendar-plus"></i></a>
                                    </div>
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