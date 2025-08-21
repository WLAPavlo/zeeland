// Import everything from autoload folder
import './autoload/**/*'; // eslint-disable-line

// Import local dependencies
import './plugins/lazyload';
import './plugins/modernizr.min';
import 'slick-carousel';
import 'jquery-match-height';
import objectFitImages from 'object-fit-images';
// import '@fancyapps/fancybox/dist/jquery.fancybox.min';
// import { jarallax, jarallaxElement } from 'jarallax';
// import ScrollOut from 'scroll-out';

/**
 * Import scripts from Custom Divi blocks
 */
// eslint-disable-next-line import/no-unresolved
// import '../blocks/divi/**/index.js';

/**
 * Import scripts from Custom Elementor widgets
 */
// eslint-disable-next-line import/no-unresolved
// import '../blocks/elementor/**/index.js';

/**
 * Import scripts from Custom ACF Gutenberg blocks
 */
// eslint-disable-next-line import/no-unresolved
// import '../blocks/gutenberg/**/index.js';

/**
 * Init foundation
 */
$(document).foundation();

/**
 * Fit slide video background to video holder
 */
function resizeVideo() {
  let $holder = $('.videoHolder');
  $holder.each(function () {
    let $that = $(this);
    let ratio = $that.data('ratio') ? $that.data('ratio') : '16:9';
    let width = parseFloat(ratio.split(':')[0]);
    let height = parseFloat(ratio.split(':')[1]);
    $that.find('.video').each(function () {
      if ($that.width() / width > $that.height() / height) {
        $(this).css({
          width: '100%',
          height: 'auto',
        });
      } else {
        $(this).css({
          width: ($that.height() * width) / height,
          height: '100%',
        });
      }
    });
  });
}

/**
 * Scripts which runs after DOM load
 */
$(document).on('ready', function () {
  /**
   * Make elements equal height
   */
  $('.matchHeight').matchHeight();

  /**
   * IE Object-fit cover polyfill
   */
  if ($('.of-cover').length) {
    objectFitImages('.of-cover');
  }

  /**
   * Add fancybox to images
   */
  // $('.gallery-item')
  //   .find('a[href$="jpg"], a[href$="png"], a[href$="gif"]')
  //   .attr('rel', 'gallery')
  //   .attr('data-fancybox', 'gallery');
  // $(
  //   '.fancybox, a[rel*="album"], a[href$="jpg"], a[href$="png"], a[href$="gif"]'
  // ).fancybox({
  //   minHeight: 0,
  //   helpers: {
  //     overlay: {
  //       locked: false,
  //     },
  //   },
  // });

  /**
   * Init parallax
   */
  // jarallaxElement();
  // jarallax(document.querySelectorAll('.jarallax'), {
  //   speed: 0.5,
  // });

  /**
   * Detect element appearance in viewport
   */
  // ScrollOut({
  //   offset: function() {
  //     return window.innerHeight - 200;
  //   },
  //   once: true,
  //   onShown: function(element) {
  //     if ($(element).is('.ease-order')) {
  //       $(element)
  //         .find('.ease-order__item')
  //         .each(function(i) {
  //           let $this = $(this);
  //           $(this).attr('data-scroll', '');
  //           window.setTimeout(function() {
  //             $this.attr('data-scroll', 'in');
  //           }, 300 * i);
  //         });
  //     }
  //   },
  // });

  /**
   * Remove placeholder on click
   */
  const removeFieldPlaceholder = () => {
    $('input, textarea').each((i, el) => {
      $(el)
        .data('holder', $(el).attr('placeholder'))
        .on('focusin', () => {
          $(el).attr('placeholder', '');
        })
        .on('focusout', () => {
          $(el).attr('placeholder', $(el).data('holder'));
        });
    });
  };

  removeFieldPlaceholder();

  $(document).on('gform_post_render', () => {
    removeFieldPlaceholder();
  });

  /**
   * Scroll to Gravity Form confirmation message after form submit
   */
  $(document).on('gform_confirmation_loaded', function (event, formId) {
    let $target = $('#gform_confirmation_wrapper_' + formId);
    if ($target.length) {
      $('html, body').animate({ scrollTop: $target.offset().top - 50 }, 500);
      return false;
    }
  });

  /**
   * Hide gravity forms required field message on data input
   */
  $('body').on(
    'change keyup',
    '.gfield input, .gfield textarea, .gfield select',
    function () {
      let $field = $(this).closest('.gfield');
      if ($field.hasClass('gfield_error') && $(this).val().length) {
        $field.find('.validation_message').hide();
      } else if ($field.hasClass('gfield_error') && !$(this).val().length) {
        $field.find('.validation_message').show();
      }
    }
  );

  /**
   * Add `is-active` class to menu-icon button on Responsive menu toggle
   * And remove it on breakpoint change
   */
  $(window)
    .on('toggled.zf.responsiveToggle', function () {
      $('.menu-icon').toggleClass('is-active');
    })
    .on('changed.zf.mediaquery', function () {
      $('.menu-icon').removeClass('is-active');
    });

  /**
   * Close responsive menu on orientation change
   */
  $(window).on('orientationchange', function () {
    setTimeout(function () {
      if ($('.menu-icon').hasClass('is-active') && window.innerWidth < 641) {
        $('[data-responsive-toggle="main-menu"]').foundation('toggleMenu');
      }
    }, 200);
  });

  resizeVideo();
});

/**
 * Scripts which runs after all elements load
 */
$(window).on('load', function () {
  // jQuery code goes here

  let $preloader = $('.preloader');
  if ($preloader.length) {
    $preloader.addClass('preloader--hidden');
  }
});

/**
 * Scripts which runs at window resize
 */
$(window).on('resize', function () {
  // jQuery code goes here

  resizeVideo();
});

/**
 * Scripts which runs on scrolling
 */
$(window).on('scroll', function () {
  // jQuery code goes here
});

/*
Header*/

document.addEventListener('DOMContentLoaded', function () {
  // Handle dropdown clicks in mobile/tablet
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  const menuIcon = document.querySelector('.menu-icon');
  const topBar = document.querySelector('.top-bar');

  // Check if mobile/tablet (< 1200px)
  function isMobileTablet() {
    return window.innerWidth < 1200;
  }
  if (menuIcon && topBar) {
    // Burger menu toggle
    menuIcon.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (isMobileTablet()) {
        // Toggle burger animation
        this.classList.toggle('is-active');

        // Toggle menu visibility
        topBar.classList.toggle('expanded');

        console.log(
          'Burger clicked, menu expanded:',
          topBar.classList.contains('expanded')
        );
      }
    });

    dropdownItems.forEach((item) => {
      const submenu = item.querySelector('.submenu');

      if (submenu) {
        const link = item.querySelector('> a');
        if (link) {
          link.addEventListener('click', function (e) {
            if (isMobileTablet()) {
              e.preventDefault();

              // Close other dropdowns
              dropdownItems.forEach((otherItem) => {
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

              console.log(
                'Dropdown toggled for:',
                link.textContent,
                'Open:',
                !isOpen
              );
            }
          });
        }
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
      if (
        isMobileTablet() &&
        !e.target.closest('.title-bar') &&
        !e.target.closest('.top-bar')
      ) {
        menuIcon.classList.remove('is-active');
        topBar.classList.remove('expanded');

        // Close all dropdowns
        dropdownItems.forEach((item) => {
          const submenu = item.querySelector('.submenu');
          if (submenu) {
            item.classList.remove('submenu-open');
            submenu.classList.remove('is-active');
          }
        });
      }
    });

    window.addEventListener('resize', function () {
      setTimeout(() => {
        if (!isMobileTablet()) {
          // Desktop mode - reset mobile states
          menuIcon.classList.remove('is-active');
          topBar.classList.remove('expanded');

          dropdownItems.forEach((item) => {
            const submenu = item.querySelector('.submenu');
            if (submenu) {
              item.classList.remove('submenu-open');
              submenu.classList.remove('is-active');
              submenu.style.display = ''; // Reset inline styles
            }
          });
        } else {
          // Mobile mode - ensure burger can work
          dropdownItems.forEach((item) => {
            const submenu = item.querySelector('.submenu');
            if (submenu) {
              submenu.style.display = ''; // Reset inline styles
            }
          });
        }
      }, 100);
    });

    menuIcon.addEventListener('mouseup', function () {
      this.blur();
    });

    menuIcon.addEventListener('touchend', function () {
      this.blur();
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  function setMatchHeight() {
    const elements = document.querySelectorAll('.match-height');
    let maxHeight = 0;

    elements.forEach((el) => {
      el.style.height = 'auto';
    });

    elements.forEach((el) => {
      if (el.offsetHeight > maxHeight) {
        maxHeight = el.offsetHeight;
      }
    });

    elements.forEach((el) => {
      el.style.height = maxHeight + 'px';
    });
  }

  setMatchHeight();

  window.addEventListener('resize', setMatchHeight);
});

document.addEventListener('DOMContentLoaded', function () {
  const testimonials = document.querySelectorAll('.zl-row-testimonial');

  testimonials.forEach((container) => {
    const panels = Array.from(container.querySelectorAll('.vc_tta-panel'));
    const triggers = Array.from(
      container.querySelectorAll('.vc_pagination-trigger')
    );
    const panelsContainer = container.querySelector('.vc_tta-panels-container');

    let startX = 0;

    function updateActiveTrigger() {
      let activePanelIndex = panels.findIndex((panel) =>
        panel.classList.contains('vc_active')
      );
      if (activePanelIndex === -1) activePanelIndex = 0;

      triggers.forEach((trigger, index) => {
        trigger.classList.toggle('vc_active', index === activePanelIndex);
      });
    }

    updateActiveTrigger();

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        setTimeout(updateActiveTrigger, 50);
      });
    });

    panelsContainer.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 1023) return;
      startX = e.touches[0].clientX;
    });

    panelsContainer.addEventListener('touchend', (e) => {
      if (window.innerWidth > 1023) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) < 30) return;

      let activePanelIndex = panels.findIndex((panel) =>
        panel.classList.contains('vc_active')
      );
      if (activePanelIndex === -1) activePanelIndex = 0;

      if (diff < 0 && activePanelIndex < panels.length - 1) {
        triggers[activePanelIndex + 1].click();
      } else if (diff > 0 && activePanelIndex > 0) {
        triggers[activePanelIndex - 1].click();
      }

      setTimeout(updateActiveTrigger, 50);
    });

    const observer = new MutationObserver(updateActiveTrigger);
    panels.forEach((panel) =>
      observer.observe(panel, { attributes: true, attributeFilter: ['class'] })
    );
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const partnersSections = document.querySelectorAll('.zl-section-partners');

  partnersSections.forEach((container) => {
    const panels = Array.from(container.querySelectorAll('.vc_tta-panel'));
    const triggers = Array.from(
      container.querySelectorAll('.vc_pagination-trigger')
    );
    const panelsContainer = container.querySelector('.vc_tta-panels-container');

    let startX = 0;

    function updateActiveTrigger() {
      let activePanelIndex = panels.findIndex((panel) =>
        panel.classList.contains('vc_active')
      );
      if (activePanelIndex === -1) activePanelIndex = 0;

      triggers.forEach((trigger, index) => {
        trigger.classList.toggle('vc_active', index === activePanelIndex);
      });
    }

    updateActiveTrigger();

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        setTimeout(updateActiveTrigger, 50);
      });
    });

    panelsContainer.addEventListener('touchstart', (e) => {
      if (window.innerWidth > 1023) return;
      startX = e.touches[0].clientX;
    });

    panelsContainer.addEventListener('touchend', (e) => {
      if (window.innerWidth > 1023) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) < 30) return;

      let activePanelIndex = panels.findIndex((panel) =>
        panel.classList.contains('vc_active')
      );
      if (activePanelIndex === -1) activePanelIndex = 0;

      if (diff < 0 && activePanelIndex < panels.length - 1) {
        triggers[activePanelIndex + 1].click();
      } else if (diff > 0 && activePanelIndex > 0) {
        triggers[activePanelIndex - 1].click();
      }

      setTimeout(updateActiveTrigger, 50);
    });

    const observer = new MutationObserver(updateActiveTrigger);
    panels.forEach((panel) =>
      observer.observe(panel, { attributes: true, attributeFilter: ['class'] })
    );
  });
});
