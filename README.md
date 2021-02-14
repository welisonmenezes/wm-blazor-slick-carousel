# Blazor Slick Carousel
### It is a responsive carousel component to Blazor Wasm and Blazor Server aplications.


## Setting up

First, import the namespaces in `_Imports.razor`

```
@using WMBlazorSlickCarousel.WMBSC
```

Then, inside your main `Startup`/`Program`, call `AddWMBSC`.

```
builder.Services.AddWMBSC();
```

Optionally, you can pass a Boolean value as a parameter to indicate to the component whether it should install Jquery or not. By default, it is true.

The following example wont install the Jquery.
```
builder.Services.AddWMBSC(false);
```


## The component structre

The `BlazorSlickCarousel` has the following structure:
```
<BlazorSlickCarousel>
    <BlazorSlickCarouselContent>
        your items here
    </BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>
        your loading element here
    </BlazorSlickCarouselLoading>
</BlazorSlickCarousel>
```

The `BlazorSlickCarousel` will create a Blazor Slick Carousel component on your page. 

Your slides must be inside the `BlazorSlickCarouselContent` child component.

Optionally you can use the `BlazorSlickCarouselLoading` to customize your loading component. By default it will render the text `Loading...` while the BlazorSlickCarousel's scripts are loaded.


## A simple usage

Example with images slides:
```
<BlazorSlickCarousel>
    <BlazorSlickCarouselContent>
        <img src="https://loremflickr.com/400/400?random=14" alt="">
        <img src="https://loremflickr.com/400/400?random=15" alt="">
        <img src="https://loremflickr.com/400/400?random=16" alt="">
        <img src="https://loremflickr.com/400/400?random=17" alt="">
        <img src="https://loremflickr.com/400/400?random=18" alt="">
        <img src="https://loremflickr.com/400/400?random=19" alt="">
        <img src="https://loremflickr.com/400/400?random=20" alt="">
        <img src="https://loremflickr.com/400/400?random=21" alt="">
    </BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>
        <p>Loading...</p>
    </BlazorSlickCarouselLoading>
</BlazorSlickCarousel>
```

Example with html content slides:
```
<BlazorSlickCarousel>
    <BlazorSlickCarouselContent>
        <div>
            <div>Test 1</div>
        </div>
        <div>
            <div>Test 2</div>
        </div>
        <div>
            <div>Test 3</div>
        </div>
        <div>
            <div>Test 4</div>
        </div>
    </BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>
        <p>Loading...</p>
    </BlazorSlickCarouselLoading>
</BlazorSlickCarousel>
```


## Configurations

To custom settings of your carousel there is the `WMBSCInitialSettings` object, which already has default values set.

### Default values

```
public class WMBSCInitialSettings: WMBSCSettings
{
    public IEnumerable<WMBSCResponsiveSettings> responsive { get; set; } = null;
}
```

The `WMBSCInitialSettings` inherits most of its properties from `WMBSCSettings`.

```
public class WMBSCSettings 
{
    public bool accessibility { get; set; } = true;
    public bool adaptiveHeight { get; set; } = false;
    public bool autoplay { get; set; } = false;
    public int autoplaySpeed { get; set; } = 3000;
    public bool arrows { get; set; } = true;
    public string asNavFor { get; set; } = null;
    public string appendArrows { get; set; } = null;
    public string appendDots { get; set; } = null;
    public string prevArrow { get; set; } = "<button type='button' class='slick-prev'>Previous</button>";
    public string nextArrow { get; set; } = "<button type='button' class='slick-next'>Next</button>";
    public bool centerMode { get; set; } = false;
    public string centerPadding { get; set; } = "50px";
    public string cssEase { get; set; } = "ease";
    public bool dots { get; set; } = false;
    public string dotsClass { get; set; } = "slick-dots";
    public bool draggable { get; set; } = true;
    public bool fade { get; set; } = false;
    public bool focusOnSelect { get; set; } = false;
    public string easing { get; set; } = "linear";
    public double edgeFriction { get; set; } = 0.15;
    public bool infinite { get; set; } = true;
    public int initialSlide { get; set; } = 0;
    public string lazyLoad { get; set; } = "ondemand";
    public bool mobileFirst { get; set; } = false;
    public bool pauseOnFocus { get; set; } = true;
    public bool pauseOnHover { get; set; } = true;
    public bool pauseOnDotsHover { get; set; } = false;
    public string respondTo { get; set; } = "window";
    public int rows { get; set; } = 1;
    public int slidesPerRow { get; set; } = 1;
    public int slidesToShow { get; set; } = 1;
    public int slidesToScroll { get; set; } = 1;
    public int speed { get; set; } = 300;
    public bool swipe { get; set; } = true;
    public bool swipeToSlide { get; set; } = false;
    public bool touchMove { get; set; } = true;
    public int touchThreshold { get; set; } = 5;
    public bool useCSS { get; set; } = true;
    public bool useTransform { get; set; } = true;
    public bool variableWidth { get; set; } = false;
    public bool vertical { get; set; } = false;
    public bool verticalSwiping { get; set; } = false;
    public bool rtl { get; set; } = false;
    public bool waitForAnimate { get; set; } = true;
    public int zIndex { get; set; } = 1000;
}
```

The `WMBSCResponsiveSettings` object is responsible for responsivity of the component.

```
public class WMBSCResponsiveSettings
{
    public int breakpoint { get; set; }
    public WMBSCSettings settings { get; set; } = null;
}

```

### How to configure

First, you have to get a reference of the `BlazorSlickCarousel`.

```
<BlazorSlickCarousel @ref="theCarousel">
    <BlazorSlickCarouselContent>...</BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>...</BlazorSlickCarouselLoading>
</BlazorSlickCarousel>

@code {
    public BlazorSlickCarousel theCarousel;
}
```

Then, instanciate the `WMBSCInitialSettings` object with your customizations and pass it as parameter to the `BlazorSlickCarousel`.

```
<BlazorSlickCarousel @ref="theCarousel" Configurations="configurations">
    <BlazorSlickCarouselContent>...</BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>...</BlazorSlickCarouselLoading>
</BlazorSlickCarousel>

@code {
    public BlazorSlickCarousel theCarousel;
    public WMBSCInitialSettings configurations;

    protected override void OnInitialized()
    {
        configurations = new WMBSCInitialSettings {
            arrows = true,
            dots = true,
            slidesToShow = 3,
            slidesToScroll = 3,
            infinite = false
        };
    }
}
```


## Responsivity

The `BlazorSlickCarousel` is responsive! 

For set the responsivity, you can use the `WMBSCSettings` object and the `WMBSCResponsiveSettings`.

Example:
```
<BlazorSlickCarousel @ref="theCarousel" Configurations="configurations" >
    <BlazorSlickCarouselContent>
        <img src="https://loremflickr.com/400/400?random=47" alt="">
        <img src="https://loremflickr.com/400/400?random=48" alt="">
        <img src="https://loremflickr.com/400/400?random=49" alt="">
        <img src="https://loremflickr.com/400/400?random=50" alt="">
        <img src="https://loremflickr.com/400/400?random=51" alt="">
        <img src="https://loremflickr.com/400/400?random=52" alt="">
        <img src="https://loremflickr.com/400/400?random=53" alt="">
        <img src="https://loremflickr.com/400/400?random=54" alt="">
    </BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>
        <p>Loading...</p>
    </BlazorSlickCarouselLoading>
</BlazorSlickCarousel>

@code {
    public BlazorSlickCarousel theCarousel;
    public WMBSCInitialSettings configurations;

    protected override void OnInitialized()
    {
        // to <= 800px screen
        WMBSCSettings breakpoint800Settings = new WMBSCSettings {
            slidesToShow = 2,
            arrows = true,
            dots = true
        };
        WMBSCResponsiveSettings breakpoint800Responsive = new WMBSCResponsiveSettings {
            breakpoint = 800,
            settings = breakpoint800Settings
        };

        // to <= 400px screen
        WMBSCSettings breakpoint400Settings = new WMBSCSettings {
            slidesToShow = 1,
            arrows = true
        };
        WMBSCResponsiveSettings breakpoint400Responsive = new WMBSCResponsiveSettings {
            breakpoint = 400,
            settings = breakpoint400Settings
        };

        // add responsivity
        List<WMBSCResponsiveSettings> responsiveSettingsList = new List<WMBSCResponsiveSettings>();
        responsiveSettingsList.Add(breakpoint800Responsive);
        responsiveSettingsList.Add(breakpoint400Responsive);

        // the carousel configurations
        configurations = new WMBSCInitialSettings {
            arrows = true,
            dots = true,
            slidesToShow = 3,
            slidesToScroll = 3,
            infinite = false,
            responsive = responsiveSettingsList
        };
    }
}
```

Note that each breakpoint has you own `WMBSCResponsiveSettings` object. Then, your add each of them in a `IEnumerable` list with type `WMBSCResponsiveSettings`.
Also, the property `settings` expects a `WMBSCSettings` object as value.
Finally, you just have to set this list as value to the property `responsive` of the `WMBSCInitialSettings` object.


## Lazy Load

The `BlazorSlickCarousel` has support to lazy loading your carousel images! 

Example:
```
<BlazorSlickCarousel @ref="theCarousel" Configurations="configurations" >
    <BlazorSlickCarouselContent>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=30" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=31" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=32" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=33" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=34" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=35" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=36" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=37" alt="">
        </div>
    </BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>
        <p>Loading...</p>
    </BlazorSlickCarouselLoading>
</BlazorSlickCarousel>

@code {
    public BlazorSlickCarousel theCarousel;
    public WMBSCInitialSettings configurations;

    protected override void OnInitialized()
    {
        configurations = new WMBSCInitialSettings {
            lazyLoad = "ondemand"
        };
    }
}
```


## Callbacks

You can set some callbacks to be fired by the `BlazorSlickCarousel`.

Here are the avaiable callbacks:
- `CallbackAfterChange` - Fires after slide change. (Argument: the current slide index)
- `CallbackBeforeChange` - Fires before slide change. (Arguments: the current slide index and the next slide index)
- `CallbackBreakpoint` - Fires after a breakpoint is hit. (Argument: the breakpoint hit.)
- `CallbackDestroy` - Fires when the carousel is destroied.
- `CallbackEdge` - Fires when an edge is overscrolled in non-infinite mode.
- `CallbackInit` - Fires after first initialization.
- `CallbackReInit` - Fires after every re-initialization.
- `CallbackSetPosition` - Fires after position/size changes.
- `CallbackSwipe` - Fires after swipe/drag.
- `CallbackLazyLoaded` - Fires after image loads lazily. (Argument: the image source)
- `CallbackLazyLoadError` - Fires after image fails to load. (Argument: the image source)

You can pass your custom methods to be fired as callbacks. For this, you need to following the next steps:

First, to inform the current project name by parameter `ProjectName`.
Then, create static methods with `[JSInvokable]` attribute and pass them to the correspondent callback.

Example:

```
<BlazorSlickCarousel 
    @ref="theCarousel"
    Configurations="configurations" 
    ProjectName="BlazorWasmDemo"
    CallbackAfterChange="SampleAfterChange"
    CallbackBeforeChange="SampleBeforeChange"
    CallbackBreakpoint="SampleBreakpoint"
    CallbackDestroy="SampleDestroy"
    CallbackEdge="SampleEdge"
    CallbackInit="SampleInit"
    CallbackReInit="SampleReInit"
    CallbackSetPosition="SampleSetPosition"
    CallbackSwipe="SampleSwipe"
    CallbackLazyLoaded="SampleLazyLoaded"
    CallbackLazyLoadError="SampleLazyLoadError">

    <BlazorSlickCarouselContent>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=1" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=2" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=3" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=4" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=5" alt="">
        </div>
        <div>
            <img data-lazy="https://loremflickr.com/400/400?random=6" alt="">
        </div>
    </BlazorSlickCarouselContent>

</BlazorSlickCarousel>

@code {
    public BlazorSlickCarousel theCarousel;
    public WMBSCInitialSettings configurations;

    protected override void OnInitialized()
    {
        WMBSCSettings breakpoint400Settings = new WMBSCSettings {
            slidesToShow = 1,
            arrows = true
        };
        WMBSCResponsiveSettings responsive = new WMBSCResponsiveSettings {
            breakpoint = 400,
            settings = breakpoint400Settings
        };

        List<WMBSCResponsiveSettings> responsiveSettingsList = new List<WMBSCResponsiveSettings>();
        responsiveSettingsList.Add(responsive);

        configurations = new WMBSCInitialSettings {
            arrows = true,
            dots = true,
            slidesToShow = 2,
            slidesToScroll = 1,
            infinite = false,
            responsive = responsiveSettingsList
        };
    }

    [JSInvokable]
    public static void SampleAfterChange(int currentSlide)
    {
        System.Console.WriteLine("SampleAfterChange");
    }

    [JSInvokable]
    public static void SampleBeforeChange(int currentSlide, int nextSlide)
    {
        System.Console.WriteLine("SampleBeforeChange");
    }

    [JSInvokable]
    public static void SampleBreakpoint(object breakpoint)
    {
        System.Console.WriteLine("SampleBreakpoint");
    }

    [JSInvokable]
    public static void SampleDestroy()
    {
        System.Console.WriteLine("SampleDestroy");
    }

    [JSInvokable]
    public static void SampleEdge()
    {
        System.Console.WriteLine("SampleEdge");
    }

    [JSInvokable]
    public static void SampleInit()
    {
        System.Console.WriteLine("SampleInit");
    }

    [JSInvokable]
    public static void SampleReInit()
    {
        System.Console.WriteLine("SampleReInit");
    }

    [JSInvokable]
    public static void SampleSetPosition()
    {
        System.Console.WriteLine("SampleSetPosition");
    }

    [JSInvokable]
    public static void SampleSwipe()
    {
        System.Console.WriteLine("SampleSwipe");
    }

    [JSInvokable]
    public static void SampleLazyLoaded(string imageSource)
    {
        System.Console.WriteLine("SampleLazyLoaded");
    }

    [JSInvokable]
    public static void SampleLazyLoadError(string imageSource)
    {
        System.Console.WriteLine("SampleLazyLoadError");
    }
}
```


## Methods

You can use some avaible methods for custom behaviors. 

- `CurrentSlide` - Returns the current slide (start from zero).
- `GoTo` - Navigate to the specific slide. The param must be a slide index (int), which starts from zero.
- `Next` - Navigate to the next slide.
- `Prev` - Navigate to the previous slide. 
- `Add` - Add new item to the carousel. The param can be whether html as string or an `ElementReference`.
- `Remove` - Remove slide by index. The params are the slide index (int) and a boolean value, that if is set true, remove slide preceding index, or the first slide if no index is specified.
- `Destroy` - Deconstructs the carousel.
- `Constroy` - Reconstroy the carousel. The param must be the `WMBSCInitialSettings` object containning the carousel configurations.

To use the `BlazorSlickCarousel` methods you need to following the next steps:

First, you have to get a reference of the `BlazorSlickCarousel`.
Then, you call the desired methods.

Example:
```
<BlazorSlickCarousel @ref="theCarousel" Configurations="configurations" >
    <BlazorSlickCarouselContent>
        <img src="https://loremflickr.com/400/400?random=38" alt="">
        <img src="https://loremflickr.com/400/400?random=39" alt="">
        <img src="https://loremflickr.com/400/400?random=40" alt="">
        <img src="https://loremflickr.com/400/400?random=41" alt="">
        <img src="https://loremflickr.com/400/400?random=42" alt="">
        <img src="https://loremflickr.com/400/400?random=43" alt="">
        <img src="https://loremflickr.com/400/400?random=44" alt="">
        <img src="https://loremflickr.com/400/400?random=45" alt="">
    </BlazorSlickCarouselContent>
    <BlazorSlickCarouselLoading>
        <p>Loading...</p>
    </BlazorSlickCarouselLoading>
</BlazorSlickCarousel>

<br><hr><br>

<div>
    <button class="btn btn-primary btn-sm" @onclick="@(e => ShowCurrentSlideIndex())">Log the Current Slide</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => GoTo(52))">Go To 6</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => Next())">Next Slide</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => Prev())">Prev Slide</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => Add())">Add New Item</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => Remove(1, false))">Remove</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => Destroy())">Destroy</button>
    <button class="btn btn-primary btn-sm" @onclick="@(e => Constroy())">Constroy</button>
</div>

@code {
    public BlazorSlickCarousel theCarousel;
    public WMBSCInitialSettings configurations;

    protected override void OnInitialized()
    {
        configurations = new WMBSCInitialSettings {
            arrows = true,
            dots = true,
            slidesToShow = 3,
            slidesToScroll = 3,
            infinite = false
        };
    }

    public async void ShowCurrentSlideIndex()
    {
        int currentSlide = await theCarousel.CurrentSlide();
        System.Console.WriteLine(currentSlide);
    }

    public async void GoTo(int slideNumber) 
    {
        await theCarousel.GoTo(slideNumber);
    }

    public async void Next() 
    {
        await theCarousel.Next();
    }

    public async void Prev() 
    {
        await theCarousel.Prev();
    }

    public async void Add() 
    {
        await theCarousel.Add("<div><img src='https://loremflickr.com/400/400?random=46' /></div>");
    }

    public async void Remove(int slideNumber, bool removeBefore)
    {
        await theCarousel.Remove(slideNumber, removeBefore);
    }

    public async void Destroy()
    {
        await theCarousel.Destroy();
    }

    public async void Constroy()
    {
        await theCarousel.Constroy(theCarousel.Configurations);
    }
}
```



For more informations, please, check the slick js documentation: http://kenwheeler.github.io/slick/.