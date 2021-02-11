using Microsoft.Extensions.DependencyInjection;

public static class WMBSCExtensions
{
    public static IServiceCollection AddWMBSC(
        this IServiceCollection services,
        bool addJquery = true)
    {
        return services.AddScoped<IWMBSC>(p =>
        {
            var WMBSC = ActivatorUtilities.CreateInstance<WMBSCCore>(p);

            WMBSC.Configure(addJquery);

            return WMBSC;
        });
    }
}