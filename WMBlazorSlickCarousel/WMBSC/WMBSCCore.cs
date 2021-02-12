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
        string ret = await module.InvokeAsync<string>("WMBSCInit", element, configurations, configCallbacks, this.addJquery);
        System.Console.WriteLine(addJquery);
        System.Console.WriteLine("O retorno do js é: " + ret);
    }

}
