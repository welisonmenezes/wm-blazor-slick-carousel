using System.Collections.Generic;

public class WMBSCConfigurations: WMBSCOptions
{
    public IEnumerable<WMBSCResponsive> responsive {get; set; } = null;
}

public class WMBSCResponsive
{
    public int breakpoint {get; set; }
    public WMBSCOptions settings {get; set; } = null;
}

public class WMBSCOptions 
{
    public bool accessibility {get; set; } = true;
    public bool adaptiveHeight {get; set; } = false;
    public bool autoplay {get; set; } = false;
    public int autoplaySpeed {get; set; } = 3000;
    public bool arrows {get; set; } = true;
    public string asNavFor {get; set; } = null;
    public string appendArrows {get; set; } = null;
    public string appendDots {get; set; } = null;
    public string prevArrow {get; set; } = "<button type='button' class='slick-prev'>Previous</button>";
    public string nextArrow {get; set; } = "<button type='button' class='slick-next'>Next</button>";
    public bool centerMode {get; set; } = false;
    public string centerPadding {get; set; } = "50px";
    public string cssEase {get; set; } = "ease";
    public bool dots {get; set; } = false;
    public string dotsClass {get; set; } = "slick-dots";
    public bool draggable {get; set; } = true;
    public bool fade {get; set; } = false;
    public bool focusOnSelect {get; set; } = false;
    public string easing {get; set; } = "linear";
    public double edgeFriction {get; set; } = 0.15;
    public bool infinite {get; set; } = true;
    public int initialSlide {get; set; } = 0;
    public string lazyLoad {get; set; } = "ondemand";
    public bool mobileFirst {get; set; } = false;
    public bool pauseOnFocus {get; set; } = true;
    public bool pauseOnHover {get; set; } = true;
    public bool pauseOnDotsHover {get; set; } = false;
    public string respondTo {get; set; } = "window";
    public int rows {get; set; } = 1;
    public int slidesPerRow {get; set; } = 1;
    public int slidesToShow {get; set; } = 1;
    public int slidesToScroll {get; set; } = 1;
    public int speed {get; set; } = 300;
    public bool swipe {get; set; } = true;
    public bool swipeToSlide {get; set; } = false;
    public bool touchMove {get; set; } = true;
    public int touchThreshold {get; set; } = 5;
    public bool useCSS {get; set; } = true;
    public bool useTransform {get; set; } = true;
    public bool variableWidth {get; set; } = false;
    public bool vertical {get; set; } = false;
    public bool verticalSwiping {get; set; } = false;
    public bool rtl {get; set; } = false;
    public bool waitForAnimate {get; set; } = true;
    public int zIndex {get; set; } = 1000;
}