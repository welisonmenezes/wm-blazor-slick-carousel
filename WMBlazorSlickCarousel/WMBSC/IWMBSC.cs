using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

public interface IWMBSC
{
    void Configure(bool addJquery);
    Task Init(ElementReference element);
}
