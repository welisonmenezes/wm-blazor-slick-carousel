export function WMBSCInit(element, configurations, configCallbacks, addJquery) {
    return WMBSCLoadJquery(element, configurations, configCallbacks, addJquery);
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

export function WMBSCAdd(element, newItem) {
    $(element).slick('slickAdd', newItem);
}

export function WMBSCRemove(element, slideNumber, removeBefore) {
    $(element).slick('slickRemove', slideNumber, removeBefore);
}

export function WMBSCDestroy(element) {
    $(element).slick('unslick');
}

export function WMBSCConstroy(element, configurations) {
    WMBSCInitCarousel(element, configurations, null);
}

function WMBSCLoadJquery(element, configurations, configCallbacks, addJquery) {
    if (WMBSCHasScript('WMBSC-jquery')) {
        WMBSCRunInitAsync(element, WMBSCLoadSlick, configurations, configCallbacks);
    } else {
        if (addJquery) {
            return WMBSCLoadScript(
                './_content/WMBlazorSlickCarousel/jquery-3.5.1.min.js',
                'WMBSC-jquery',
                WMBSCLoadSlick,
                element,
                configurations,
                configCallbacks
            );
        }
        return WMBSCLoadSlick(element, configurations, configCallbacks);
    }
}

function WMBSCLoadSlick(element, configurations, configCallbacks) {
    if (WMBSCHasScript('WMBSC-slick-js')) {
        WMBSCRunInitAsync(element, WMBSCInitCarousel, configurations, configCallbacks);
    } else {
        WMBSCResolveNonPassiveIssue();
        return WMBSCLoadScript(
            './_content/WMBlazorSlickCarousel/slick.min.js',
            'WMBSC-slick-js',
            WMBSCInitCarousel,
            element,
            configurations,
            configCallbacks
        );
    }
}

function WMBSCInitCarousel(element, configurations, configCallbacks) {
    if (!$(element).hasClass('slick-initialized'))
    {
        var config = (configurations) ? configurations : {};
        WMBSCConfigureAppendDotsAndArrows(element, config);
        if (configCallbacks) WMBSCConfigureCallbacks(element, configCallbacks);
        $(element).slick(config);
        $(element).parent().removeClass('loading');
    }
}

function WMBSCLoadScript(src, id, callback, element, configurations, configCallbacks) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.id = id;
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

function WMBSCRunInitAsync(element, callback, configurations, configCallbacks) {
    var timer;
    try {
        callback(element, configurations);
    } catch (error) {
        timer = setInterval(() => {
            try {
                callback(element, configurations, configCallbacks);
                clearInterval(timer);
            } catch (error) {}
        }, 100);
    }
}

function WMBSCHasScript(id) {
    return (document.querySelector('#' + id));
}

function WMBSCResolveNonPassiveIssue() {
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

function WMBSCConfigureAppendDotsAndArrows(element, config) {
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

function WMBSCConfigureCallbacks(element, configCallbacks) {
    WMBSCConfigureAfterChangeCallback(element, configCallbacks);
    WMBSCConfigureBeforeChangeCallback(element, configCallbacks);
    WMBSCConfigureBreakpointCallback(element, configCallbacks);
    WMBSCConfigureDestroyCallback(element, configCallbacks);
    WMBSCConfigureEdgeCallback(element, configCallbacks);
    WMBSCConfigureInitCallback(element, configCallbacks);
    WMBSCConfigureReInitCallback(element, configCallbacks);
    WMBSCConfigureSetPositionCallback(element, configCallbacks);
    WMBSCConfigureSwipeCallback(element, configCallbacks);
    WMBSCConfigureLazyLoadedCallback(element, configCallbacks);
    WMBSCConfigureLazyLoadErrorCallback(element, configCallbacks);
}

function WMBSCConfigureAfterChangeCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackAfterChange']) {
        $(element).on('afterChange', function(event, slick, currentSlide){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackAfterChange'], currentSlide);
        });
    }
}

function WMBSCConfigureBeforeChangeCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackBeforeChange']) {
        $(element).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackBeforeChange'], currentSlide, nextSlide);
        });
    }
}

function WMBSCConfigureBreakpointCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackBreakpoint']) {
        $(element).on('breakpoint', function(event, slick, breakpoint){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackBreakpoint'], breakpoint);
        });
    }
}

function WMBSCConfigureDestroyCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackDestroy']) {
        $(element).on('destroy', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackDestroy']);
        });
    }
}

function WMBSCConfigureEdgeCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackEdge']) {
        $(element).on('edge', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackEdge']);
        });
    }
}

function WMBSCConfigureInitCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackInit']) {
        $(element).on('init', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackInit']);
        });
    }
}

function WMBSCConfigureReInitCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackReInit']) {
        $(element).on('reInit', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackReInit']);
        });
    }
}

function WMBSCConfigureSetPositionCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackSetPosition']) {
        $(element).on('setPosition', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackSetPosition']);
        });
    }
}

function WMBSCConfigureSwipeCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackSwipe']) {
        $(element).on('swipe', function(event, slick){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackSwipe']);
        });
    }
}

function WMBSCConfigureLazyLoadedCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackLazyLoaded']) {
        $(element).on('lazyLoaded', function(event, slick, image, imageSource){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackLazyLoaded'], imageSource);
        });
    }
}

function WMBSCConfigureLazyLoadErrorCallback(element, configCallbacks) {
    if (configCallbacks['projectName'] && configCallbacks['callbackLazyLoadError']) {
        $(element).on('lazyLoadError', function(event, slick, image, imageSource){
            DotNet.invokeMethodAsync(configCallbacks['projectName'], configCallbacks['callbackLazyLoadError'], imageSource);
        });
    }
}
