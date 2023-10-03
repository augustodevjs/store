using Microsoft.Extensions.DependencyInjection;

namespace Store.Application;

public static class DependecyInjection
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    }
}