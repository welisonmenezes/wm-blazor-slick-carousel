export function WMBSCInit(element, addJquery) {
    return loadJquery(element, addJquery);
}

function loadJquery(element, addJquery) {
    if (hasJquery()) {
        loadSlick(element);
    } else {
        if (addJquery) {
            return loadScript(
                "./_content/WMBlazorSlickCarousel/jquery-3.5.1.min.js",
                loadSlick,
                element
            );
        }
        return loadSlick(element);
    }
}

function loadSlick(element) {
    if (hasSlick()) {
        initCarousel(element);
    } else {
        resolveNonPassiveIssue();
        return loadScript(
            "./_content/WMBlazorSlickCarousel/slick.min.js",
            initCarousel,
            element
        );
    }
}

function initCarousel(element) {
    console.log(element);
    console.log("initCarousel");
    console.log($);
    console.log($.fn.slick);

    $(element).slick({
        arrows: true,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
    });
    $(element).parent().removeClass("loading");
}

function loadScript(src, callback, element) {
    var s, r, t;
    r = false;
    s = document.createElement("script");
    s.type = "text/javascript";
    s.src = src;
    s.onload = s.onreadystatechange = function () {
        if (!r && (!this.readyState || this.readyState === "complete")) {
            r = true;
            if (callback && element) {
                callback(element);
            }
            return true;
        } else {
            return false;
        }
    };
    t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s, t);
}

function hasJquery() {
    return typeof $ !== "undefined";
}

function hasSlick() {
    return typeof $.fn.slick !== "undefined";
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
