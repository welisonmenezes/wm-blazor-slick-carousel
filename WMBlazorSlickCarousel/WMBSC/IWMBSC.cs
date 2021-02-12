using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

public interface IWMBSC
{
    void Configure(bool addJquery = true);
    Task Init(ElementReference element, WMBSCConfigurations configurations, Dictionary<string, string> configCallbacks);
    Task<int> SlickCurrentSlide();
    Task SlickGoTo(int slideNumber);
    Task SlickNext();
    Task SlickPrev();
    Task SlickAdd(ElementReference newItem);
    Task SlickAdd(string newItem);
    Task SlickRemove(int slideNumber, bool removeBefore);
    Task SlickDestroy();
    Task SlickConstroy(WMBSCConfigurations configurations, Dictionary<string, string> configCallbacks);
}
