using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

public interface IWMBSC
{
    void Configure(bool addJquery = true);
    Task Init(ElementReference element, WMBSCConfigurations configurations, Dictionary<string, string> configCallbacks);
}
