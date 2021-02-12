using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

public sealed class WMBSCCore: IWMBSC
{
    private readonly IJSRuntime jsRuntime;
    private Task<IJSObjectReference> _module;
    private Task<IJSObjectReference> Module => _module ??= jsRuntime.InvokeAsync<IJSObjectReference>("import", "./_content/WMBlazorSlickCarousel/wm-blazor.slick-carousel.js").AsTask();
    private ElementReference element;

    public bool addJquery;

    public WMBSCCore(IJSRuntime jsRuntime)
    {
        this.jsRuntime = jsRuntime;
    }

    public void Configure(bool addJquery)
    {
        this.addJquery = addJquery;
    }

    public async Task Init(ElementReference element, WMBSCConfigurations configurations, Dictionary<string, string> configCallbacks)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCInit", element, configurations, configCallbacks, this.addJquery);
        this.element = element;
    }

    public async Task<int> SlickCurrentSlide()
    {
        var module = await this.Module;
        return await module.InvokeAsync<int>("WMBSCCurrentSlide", this.element);
    }

    public async Task SlickGoTo(int slideNumber)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCGoTo", this.element, slideNumber);
    }

    public async Task SlickNext()
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCNext", this.element);
    }

    public async Task SlickPrev()
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCPrev", this.element);
    }

    public async Task SlickAdd(ElementReference newItem)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCAdd", this.element, newItem);
    }

    public async Task SlickAdd(string newItem)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCAdd", this.element, newItem);
    }

    public async Task SlickRemove(int slideNumber, bool removeBefore)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCRemove", this.element, slideNumber, removeBefore);
    }

    public async Task SlickDestroy()
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCDestroy", this.element);
    }

    public async Task SlickConstroy(WMBSCConfigurations configurations)
    {
        var module = await this.Module;
        await module.InvokeVoidAsync("WMBSCConstroy", this.element, configurations);
    }

}
