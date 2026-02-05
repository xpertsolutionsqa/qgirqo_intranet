<?php 
$page_title = 'Latest News';

include 'header.php'; 
?>
<div class="site__page_container temp__news_details">
    <div class="container">
        <div class="entry_header" data-aos="fade-up">
            <h1 class="page_title"><?=$page_title;?></h1>
        </div>
        <div class="row">
            <!-- MAIN CONTENT -->
            <div class="col main_col">
                <div class="inner_col" data-aos="fade-up">
                    <div class="row g-4 news_grid_row">
                        <!-- Left: Article -->
                        <div class="col-12 col-lg-8 news_main_col">
                            <!-- HERO (Swiper) -->
                            <div class="media_hero">
                                <div class="swiper media_hero_swiper">
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img class="media_hero_img" src="assets/img/Rectangle-1382.jpg" alt="News cover 1" />
                                        </div>
                                        <div class="swiper-slide">
                                            <img class="media_hero_img" src="assets/img/Rectangle-1382.jpg" alt="News cover 2" />
                                        </div>
                                        <div class="swiper-slide">
                                            <img class="media_hero_img" src="assets/img/Rectangle-1382.jpg" alt="News cover 3" />
                                        </div>
                                    </div>
                                    <!-- bullets bottom-left -->
                                    <div class="swiper-pagination over_the_slider"></div>
                                </div>
                            </div>
                            <h2 class="news_title">QGIRCO Reports Strong Turnaround</h2>
                            <div class="news_meta">Published: 04 October 2025</div>
                            <div class="entry_content news_content">
                                <p>
                                    QGIRCO announced a net profit of QAR 28.963 million for the year 2024, compared with a net loss of QAR 1.47
                                    billion in 2023. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                </p>
                                <p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>
                                <p>Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>
                            </div>
                            <div class="news_actions_row">
                                <div class="news_actions_left">
                                    <a class="news_action_btn" href="#" aria-label="Like">
                                        <span class="news_action_icon"><i class="fa-regular fa-thumbs-up"></i></span>
                                        Like
                                    </a>
                                    <a class="news_action_btn" href="#" aria-label="Share">
                                        <span class="news_action_icon"><i class="fa-solid fa-share-nodes"></i></span>
                                        Share
                                    </a>
                                </div>
                                <div class="news_stats">
                                    <span><i class="fa-regular fa-eye"></i> 79 Views</span>
                                    <span><i class="fa-regular fa-thumbs-up"></i> 70 Likes</span>
                                </div>
                            </div>
                        </div>
                        <!-- Right: Sidebar -->
                        <div class="col-12 col-lg-4 news_side_col">
                            <div class="sidebar_sticky">
                                <!-- Top message -->
                                <div class="side_card">
                                    <div class="side_card_item">
                                        <div class="side_card_item_media">
                                            <div class="side_card_item_thumb">
                                                <img src="assets/img/Rectangle-1383.jpg" alt="CEO">
                                                <div class="side_card_item_play" aria-hidden="true">
                                                    <i class="fa-solid fa-play"></i>
                                                </div>
                                            </div>
                                            <div class="side_card_item_details">
                                                <p class="side_card_item_title">GCEO’s Monthly Message: Vision for Q4</p>
                                                <p class="side_card_item_text">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                                                </p>
                                                <div class="side_card_item_date">Posted: 04 October 2025</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Related Articles -->
                                <div class="side_card">
                                    <div class="side_card_header">
                                        <h3 class="side_card_header_title">Related Articles</h3>
                                    </div>
                                    <div class="side_card_body">
                                        <div class="side_card_item">
                                            <div class="side_card_item_media">
                                                <div class="side_card_item_thumb">
                                                    <img src="assets/img/Rectangle-1382.jpg" alt="Rectangle-1382">
                                                </div>
                                                <div class="side_card_item_details">
                                                    <p class="side_card_item_title">QGIRCO Reports Strong Turnaround</p>
                                                    <p class="side_card_item_text">
                                                        Lorem ipsum dolor sit amet elit. Sed do eiusmod tempor incididunt ut labore.
                                                    </p>
                                                    <div class="side_card_item_date">Posted: 04 October 2025</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="side_card_item">
                                            <div class="side_card_item_media">
                                                <div class="side_card_item_thumb">
                                                    <img src="assets/img/Rectangle-1382.jpg" alt="Rectangle-1382">
                                                </div>
                                                <div class="side_card_item_details">
                                                    <p class="side_card_item_title">QGIRCO Reports Strong Turnaround</p>
                                                    <p class="side_card_item_text">
                                                        Lorem ipsum dolor sit amet elit. Sed do eiusmod tempor incididunt ut labore.
                                                    </p>
                                                    <div class="side_card_item_date">Posted: 04 October 2025</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="side_card_item">
                                            <div class="side_card_item_media">
                                                <div class="side_card_item_thumb">
                                                    <img src="assets/img/Rectangle-1382.jpg" alt="Rectangle-1382">
                                                </div>
                                                <div class="side_card_item_details">
                                                    <p class="side_card_item_title">QGIRCO Reports Strong Turnaround</p>
                                                    <p class="side_card_item_text">
                                                        Lorem ipsum dolor sit amet elit. Sed do eiusmod tempor incididunt ut labore.
                                                    </p>
                                                    <div class="side_card_item_date">Posted: 04 October 2025</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Archive -->
                                <div class="side_card">
                                    <div class="side_card_header">
                                        <h3 class="side_card_header_title">Archive</h3>
                                        <div class="archive_date">
                                            <input type="date" class="form-control form-control-sm" value="2025-10-16" aria-label="Archive date" />
                                        </div>
                                    </div>
                                    <div class="archive_body">
                                        <div class="list-group archive_list">
                                            <a href="#" class="list-group-item list-group-item-action">December 2024</a>
                                            <a href="#" class="list-group-item list-group-item-action">November 2024</a>
                                            <a href="#" class="list-group-item list-group-item-action">October 2024</a>
                                            <a href="#" class="list-group-item list-group-item-action">September 2024</a>
                                            <a href="#" class="list-group-item list-group-item-action">August 2024</a>
                                            <a href="#" class="list-group-item list-group-item-action">July 2024</a>
                                            <a href="#" class="list-group-item list-group-item-action">June 2024</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><!-- /row -->
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