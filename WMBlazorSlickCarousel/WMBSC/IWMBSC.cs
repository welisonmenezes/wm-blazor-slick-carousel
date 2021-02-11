using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

public interface IWMBSC
{
    void Configure();
    Task Init(ElementReference element);
}
