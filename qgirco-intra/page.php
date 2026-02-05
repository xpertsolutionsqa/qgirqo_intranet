<?php 
$page_title = 'Page Title Here';
include 'header.php'; ?>
<div class="site__page_container temp__default_page">
    <div class="container">
        <div class="entry_header" data-aos="fade-up">
            <h1 class="page_title"><?=$page_title;?></h1>
        </div>
        <div class="row">
            <!-- MAIN CONTENT -->
            <div class="col main_col">
                <div class="inner_col" data-aos="fade-up">
                    <div class="entry_content">
                        <p>coming soon!..</p>
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