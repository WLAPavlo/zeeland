<?php
/**
 * Header.
 */

use theme\FoundationNavigation;

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <!-- Set up Meta -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="<?php bloginfo('charset'); ?>">

    <!-- Set the viewport width to device width for mobile -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes">
    <!-- Remove Microsoft Edge's & Safari phone-email styling -->
    <meta name="format-detection" content="telephone=no,email=no,url=no">

    <?php wp_head(); ?>
</head>

<body <?php body_class('no-outline fwp'); ?>>
<?php wp_body_open(); ?>

<!-- <div class="preloader hide-for-medium">
    <div class="preloader__icon"></div>
</div> -->

<!-- BEGIN of header -->
<header class="header">
    <!-- Top bar -->
    <?php if (have_rows('header_top_menu', 'options')) { ?>
        <div class="header-top">
            <div class="grid-container">
                <div class="grid-x align-right justify-content-end">
                    <div class="cell shrink">
                        <ul class="header-top-menu">
                            <?php while (have_rows('header_top_menu', 'options')) {
                                the_row(); ?>
                                <li>
                                    <a href="<?php the_sub_field('link'); ?>"><?php the_sub_field('title'); ?></a>
                                </li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    <?php } ?>

    <!-- Main header -->
    <div class="grid-container menu-grid-container">
        <div class="grid-x grid-margin-x">
            <div class="medium-3 small-12 cell align-self-center">
                <div class="logo text-center medium-text-left">
                    <h1>
                        <?php
                        show_custom_logo();
                        ?>
                        <span class="show-for-sr"><?php echo get_bloginfo('name'); ?></span>
                    </h1>
                </div>
            </div>
            <div class="medium-6 small-12 cell align-self-center">
                <?php if (has_nav_menu('header-menu')) { ?>
                    <div class="title-bar hide-for-medium" data-responsive-toggle="main-menu" data-hide-for="medium" data-toggler=".expanded">
                        <button class="menu-icon" type="button" data-toggle aria-label="Menu" aria-controls="main-menu">
                            <span></span></button>
                    </div>

                    <nav class="top-bar" id="main-menu">
                        <?php wp_nav_menu([
                            'theme_location' => 'header-menu',
                            'menu_class' => 'menu header-menu',
                            'items_wrap' => '<div class="grid-container"><div class="grid-x"><ul id="%1$s" class="%2$s" data-responsive-menu="accordion medium-dropdown" data-submenu-toggle="true" data-multi-open="false" data-close-on-click-inside="false" data-auto-height="true">%3$s</ul></div></div>',
                            'walker' => new FoundationNavigation(),
                        ]); ?>
                    </nav>
                <?php } ?>
            </div>
            <div class="medium-3 small-12 cell align-self-center">
                <?php $header_phone = get_field('header_phone', 'options'); ?>
                <?php if ($header_phone) { ?>
                    <div class="header-phone text-center medium-text-right">
                        <a href="tel:<?php echo sanitize_number($header_phone); ?>" class="phone-number">
                            <?php echo $header_phone; ?>
                        </a>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</header>
<!-- END of header -->

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const menuIcon = document.querySelector('.menu-icon');
        const topBar = document.querySelector('.top-bar');

        // Check if mobile/tablet (Foundation medium down = < 1024px)
        function isMobileTablet() {
            return window.innerWidth < 1024;
        }

        if (menuIcon && topBar) {
            // Burger menu toggle
            menuIcon.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                if (isMobileTablet()) {
                    // Toggle burger animation
                    this.classList.toggle('is-active');

                    // Toggle menu visibility
                    topBar.classList.toggle('expanded');

                    console.log('Burger clicked, menu expanded:', topBar.classList.contains('expanded'));
                }
            });

            // Handle dropdown clicks in mobile/tablet
            const dropdownItems = document.querySelectorAll('.has-dropdown');

            dropdownItems.forEach(item => {
                const submenu = item.querySelector('.submenu');

                if (submenu) {
                    const link = item.querySelector('> a');
                    if (link) {
                        link.addEventListener('click', function(e) {
                            if (isMobileTablet()) {
                                e.preventDefault();

                                // Close other dropdowns
                                dropdownItems.forEach(otherItem => {
                                    if (otherItem !== item) {
                                        const otherSubmenu = otherItem.querySelector('.submenu');
                                        if (otherSubmenu) {
                                            otherItem.classList.remove('submenu-open');
                                            otherSubmenu.classList.remove('is-active');
                                        }
                                    }
                                });

                                // Toggle current dropdown
                                const isOpen = submenu.classList.contains('is-active');

                                if (isOpen) {
                                    item.classList.remove('submenu-open');
                                    submenu.classList.remove('is-active');
                                } else {
                                    item.classList.add('submenu-open');
                                    submenu.classList.add('is-active');
                                }

                                console.log('Dropdown toggled for:', link.textContent, 'Open:', !isOpen);
                            }
                        });
                    }
                }
            });

            // Desktop hover functionality
            function initDesktopHovers() {
                if (!isMobileTablet()) {
                    dropdownItems.forEach(item => {
                        const submenu = item.querySelector('.submenu');

                        if (submenu) {
                            item.addEventListener('mouseenter', function() {
                                submenu.style.display = 'block';
                            });

                            item.addEventListener('mouseleave', function() {
                                submenu.style.display = 'none';
                            });
                        }
                    });
                }
            }

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (isMobileTablet() &&
                    !e.target.closest('.title-bar') &&
                    !e.target.closest('.top-bar')) {

                    menuIcon.classList.remove('is-active');
                    topBar.classList.remove('expanded');

                    // Close all dropdowns
                    dropdownItems.forEach(item => {
                        const submenu = item.querySelector('.submenu');
                        if (submenu) {
                            item.classList.remove('submenu-open');
                            submenu.classList.remove('is-active');
                        }
                    });
                }
            });

            // Handle resize - виправлена версія
            window.addEventListener('resize', function() {
                // Використовуємо setTimeout щоб дати час браузеру оновити розмір
                setTimeout(() => {
                    if (!isMobileTablet()) {
                        // Desktop mode - reset mobile states
                        menuIcon.classList.remove('is-active');
                        topBar.classList.remove('expanded');

                        dropdownItems.forEach(item => {
                            const submenu = item.querySelector('.submenu');
                            if (submenu) {
                                item.classList.remove('submenu-open');
                                submenu.classList.remove('is-active');
                                submenu.style.display = ''; // Reset inline styles
                            }
                        });

                        // Reinit desktop hovers
                        initDesktopHovers();
                    } else {
                        // Mobile mode - ensure burger can work
                        dropdownItems.forEach(item => {
                            const submenu = item.querySelector('.submenu');
                            if (submenu) {
                                submenu.style.display = ''; // Reset inline styles
                            }
                        });
                    }
                }, 100);
            });

            // Initialize desktop hovers
            initDesktopHovers();

            menuIcon.addEventListener('mouseup', function() {
                this.blur();
            });

            menuIcon.addEventListener('touchend', function() {
                this.blur();
            });
        }
    });
</script>
