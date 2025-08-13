<?php
/**
 * Template Name: Kitchen Page.
 */
get_header(); ?>

<!-- BEGIN of main content -->
<div class="fluid grid-container">
    <div class="grid-x grid-margin-x">
        <div class="cell">
            <?php if (have_posts()) { ?>
                <?php while (have_posts()) {
                    the_post(); ?>
                    <?php the_content(); ?>
                <?php } ?>
            <?php } ?>
        </div>
    </div>
</div>
<!-- END of main content -->

<?php get_footer(); ?>
