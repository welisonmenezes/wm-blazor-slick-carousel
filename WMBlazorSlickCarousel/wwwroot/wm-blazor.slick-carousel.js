export function WMBSCInit(element, configurations, configCallbacks, addJquery) {
    return loadJquery(element, configurations, configCallbacks, addJquery);
}

export function WMBSCCurrentSlide(element) {
    return $(element).slick('slickCurrentSlide');
}

export function WMBSCGoTo(element, slideNumber) {
    $(element).slick('slickGoTo', slideNumber);
}

export function WMBSCNext(element) {
    $(element).slick('slickNext');
}

export function WMBSCPrev(element) {
    $(element).slick('slickPrev');
}

function loadJquery(element, configurations, configCallbacks, addJquery) {
    if (hasJquery()) {
        loadSlick(element, configurations, configCallbacks);
    } else {
        if (addJquery) {
            return loadScript(
                './_content/WMBlazorSlickCarousel/jquery-3.5.1.min.js',
                loadSlick,
                element,
                configurations,
                configCallbacks
            );
        }
        return loadSlick(element, configurations, configCallbacks);
    }
}

function loadSlick(element, configurations, configCallbacks) {
    if (hasSlick()) {
        initCarousel(element, configurations, configCallbacks);
    } else {
        resolveNonPassiveIssue();
        return loadScript(
            './_content/WMBlazorSlickCarousel/slick.min.js',
            initCarousel,
            element,
            configurations,
            configCallbacks
        );
    }
}

function initCarousel(element, configurations, configCallbacks) {
    var config = (configurations) ? configurations : {};
    configureAppendDotsAndArrows(element, config);
    configureCallbacks(element, configCallbacks);
    $(element).slick(config);
    $(element).parent().removeClass('loading');
}

function loadScript(src, callback, element, configurations, configCallbacks) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === 'complete')) {
            r = true;
            if (callback && element) {
                callback(element, configurations, configCallbacks);
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

function configureAppendDotsAndArrows(element, config) {
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

function configureCallbacks(element, configCallbacks) {
    configureAfterChangeCallback(element, configCallbacks);
    configureBeforeChangeCallback(element, configCallbacks);
    configureInitCallback(element, configCallbacks);
}

function configureAfterChangeCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackAfterChange']) {
        $(element).on('afterChange', function(event, slick, currentSlide){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackAfterChange'], currentSlide);
        });
    }
}

function configureBeforeChangeCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackBeforeChange']) {
        $(element).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackBeforeChange'], currentSlide, nextSlide);
        });
    }
}

function configureInitCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackInit']) {
        $(element).on('init', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackInit']);
        });
    }
}
