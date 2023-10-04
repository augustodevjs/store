using Microsoft.Extensions.DependencyInjection;
using Store.Application.Contracts.Services;
using Store.Application.Notifications;
using Store.Application.Services;
using Store.Domain.Contracts.Repository;
using Store.Infra.Data.Repositories;

namespace Store.Application.Configuration;

public static class DependecyConfig
{
    public static void ResolveDependecies(this IServiceCollection services)
    {
        services.AddScoped<INotificator, Notificator>();
        
        // Services
        services.AddScoped<IClientService, ClientService>();
        services.AddScoped<IProductService, ProductService>();
        
        // Repository
        services.AddScoped<IClientRepository, ClientRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
    }
}