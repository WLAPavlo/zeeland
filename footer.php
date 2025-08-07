<?php
/**
 * Footer.
 */
?>

<!-- BEGIN of footer -->
<footer class="footer">
    <div class="grid-container">
        <div class="footer__main">
            <div class="grid-x grid-margin-x">
                <!-- Left side - Footer Menu Links -->
                <div class="cell large-8 medium-12 small-12 footer__left">
                    <div class="footer__links-container">
                        <?php if (have_rows('footer_menu_columns', 'options')) { ?>
                            <?php while (have_rows('footer_menu_columns', 'options')) {
                                the_row(); ?>
                                <div class="footer__column">
                                    <?php if (have_rows('column_links')) { ?>
                                        <ul class="footer__links">
                                            <?php while (have_rows('column_links')) {
                                                the_row();
                                                $link = get_sub_field('link_url');
                                                $link_text = get_sub_field('link_text');
                                                if ($link && $link_text) { ?>
                                                    <li>
                                                        <a href="<?php echo esc_url($link['url']); ?>"
                                                            <?php echo $link['target'] ? 'target="' . $link['target'] . '"' : ''; ?>>
                                                            <?php echo $link_text; ?>
                                                        </a>
                                                    </li>
                                                <?php } ?>
                                            <?php } ?>
                                        </ul>
                                    <?php } ?>
                                </div>
                            <?php } ?>
                        <?php } ?>
                    </div>
                </div>

                <!-- Right side - Contact Info Section -->
                <div class="cell large-4 medium-12 small-12 footer__contact">
                    <?php if ($phone = get_field('phone', 'options')) { ?>
                        <div class="footer__phone">
                            <?php $phone_icon = get_field('phone_icon', 'options') ?: 'fa-phone'; ?>
                            <i class="fas <?php echo $phone_icon; ?> footer__phone-icon"></i>
                            <a href="tel:<?php echo sanitize_number($phone); ?>" class="footer__phone-number">
                                <?php echo $phone; ?>
                            </a>
                        </div>
                    <?php } ?>

                    <?php if ($address = get_field('address', 'options')) { ?>
                        <div class="footer__address">
                            <a href="https://www.google.com/maps/search/?api=1&query=<?php echo urlencode($address); ?>"
                               target="_blank">
                                <?php echo $address; ?>
                            </a>
                        </div>
                    <?php } ?>

                    <?php get_template_part('parts/socials'); ?>
                </div>
            </div>
        </div>

        <?php if ($copyright = get_field('copyright', 'options')) { ?>
            <div class="footer__copy">
                <div class="grid-container">
                    <div class="grid-x grid-margin-x">
                        <div class="cell text-center">
                            <?php echo $copyright; ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
</footer>
<!-- END of footer -->

<?php wp_footer(); ?>
</body>
</html>
