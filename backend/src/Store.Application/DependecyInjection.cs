using Microsoft.Extensions.DependencyInjection;
using Store.Application.Configuration;

namespace Store.Application;

public static class DependecyInjection
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.ResolveDependecies();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    }
}