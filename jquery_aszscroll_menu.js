(function( $ ) {
    $.fn.menuOnTheRail = function(options) {

        var setting = $.extend( {
            'topOffset': 0
        }, options);

        return this.each(function() {

            let $menuContainer = $(this);
            let correction = setting.topOffset; //for top menu fixed
            let tempScrollTop, currentScrollTop = 0;

            menu($menuContainer, correction);

            $(document).scroll(function () {
                currentScrollTop = $(this).scrollTop();
                if (tempScrollTop < currentScrollTop) {
                    menu($menuContainer, correction, 'down');
                } else if (tempScrollTop > currentScrollTop) {
                    menu($menuContainer, correction, 'up');
                }
                tempScrollTop = currentScrollTop;
            });

            function menu($menu, correction, scrollDirection = 'down') {
                let menuStartPosition = parseInt($menu.parent().offset().top);
                let windowHeight = parseInt($(window).height());
                let scrollTop = $(document).scrollTop();
                let railsHeight = parseInt($menu.parent().height());
                //pls check bottomLimit in console. if
                let bottomLimit = (railsHeight + menuStartPosition) - (parseInt($menu.offset().top) + parseInt($menu.height()));
                $menu.width($menu.parent().width());
                if ((scrollTop + correction >= menuStartPosition && bottomLimit > 0) || (bottomLimit == 0 && scrollTop + correction < $menu.offset().top)) {
                    //browser window less menu height
                    if (windowHeight - correction < $menu.height()) {
                        if (scrollDirection == 'down') {
                            if ($menu.hasClass('topFix')) {
                                $menu.removeClass('topFix');
                            }
                            let menuBottom = parseInt($menu.offset().top) + parseInt($menu.height());
                            if (menuBottom > (scrollTop + windowHeight) && !$menu.hasClass('bottomFix')) {
                                $menu.addClass('bottomFix');
                                $menu.css({
                                    'position': 'relative',
                                    'top': parseInt($menu.offset().top) - menuStartPosition
                                });
                            } else if (menuBottom <= scrollTop + windowHeight) {
                                $menu.css({
                                    'position': 'fixed',
                                    'bottom': 0,
                                    'top': 'auto'
                                });
                            }
                        } else if (scrollDirection == 'up') {
                            if ($menu.hasClass('bottomFix')) {
                                $menu.removeClass('bottomFix');
                            }
                            if ($menu.offset().top < scrollTop + correction && !$menu.hasClass('topFix')) {
                                $menu.addClass('topFix');
                                $menu.css({
                                    'position': 'relative',
                                    'top': parseInt($menu.offset().top) - menuStartPosition
                                });
                            } else if ($menu.offset().top >= scrollTop + correction) {
                                $menu.css({
                                    'position': 'fixed',
                                    'top': correction,
                                    'bottom': 'auto'
                                });
                            }
                        }
                    } else {
                        $menu.css({
                            'position': 'fixed',
                            'top': correction
                        });
                    }
                } else if (bottomLimit < 0) {
                    $menu.css({
                        'position': 'relative',
                        'top': railsHeight - $menu.height()
                    });
                } else if (scrollTop < menuStartPosition) {
                    $menu.css({
                        'position': 'relative',
                        'top': 0
                    });
                }
            }
        });
    };
})(jQuery);