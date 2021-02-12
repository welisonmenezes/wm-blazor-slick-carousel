export function WMBSCInit(element, configurations, addJquery) {
    return loadJquery(element, configurations, addJquery);
}

function loadJquery(element, configurations, addJquery) {
    if (hasJquery()) {
        loadSlick(element, configurations);
    } else {
        if (addJquery) {
            return loadScript(
                './_content/WMBlazorSlickCarousel/jquery-3.5.1.min.js',
                loadSlick,
                element,
                configurations
            );
        }
        return loadSlick(element, configurations);
    }
}

function loadSlick(element, configurations) {
    if (hasSlick()) {
        initCarousel(element, configurations);
    } else {
        resolveNonPassiveIssue();
        return loadScript(
            './_content/WMBlazorSlickCarousel/slick.min.js',
            initCarousel,
            element,
            configurations
        );
    }
}

function initCarousel(element, configurations) {
    var config = (configurations) ? configurations : {};
    _configureAppendDotsAndArrows(element, config);
    $(element).slick(config);
    $(element).parent().removeClass('loading');
}

function _configureAppendDotsAndArrows(element, config) {
    if (config.appendArrows === null) {
        config.appendArrows = $(element);
    }
    if (config.appendDots === null) {
        config.appendDots = $(element);
    }
    if (config.responsive) {
        for(var i = 0; i < config.responsive.length; i++) {
            var item = config.responsive[i].settings;
            if (item.appendArrows === null) {
                item.appendArrows = $(element);
            }
            if (item.appendDots === null) {
                item.appendDots = $(element);
            }
        }
    }
}

function loadScript(src, callback, element, configurations) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
            r = true;
            if (callback && element) {
                callback(element, configurations);
            }
            return true;
        } else {
            return false;
        }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}

function hasJquery() {
    return typeof $ !== 'undefined';
}

function hasSlick() {
    return typeof $.fn.slick !== 'undefined';
}

function resolveNonPassiveIssue() {
    jQuery.event.special.touchstart = {
        setup: function( _, ns, handle ) {
            this.addEventListener('touchstart', handle, { passive: !ns.includes('noPreventDefault') });
        }
    };
    jQuery.event.special.touchmove = {
        setup: function( _, ns, handle ) {
            this.addEventListener('touchmove', handle, { passive: !ns.includes('noPreventDefault') });
        }
    };
}
