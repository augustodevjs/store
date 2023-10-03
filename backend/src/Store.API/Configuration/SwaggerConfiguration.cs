using Microsoft.OpenApi.Models;

namespace Store.API.Configuration;

public static class SwaggerConfiguration
{
    public static void AddSwagger(this IServiceCollection services)
    {
        var contact = new OpenApiContact
        {
            Name = "João Augusto",
            Email = "jaugusto.dev@gmail.com",
            Url = new Uri("https://github.com/augustodevjs")
        };

        var license = new OpenApiLicense
        {
            Name = "Free License",
            Url = new Uri("https://github.com/augustodevjs")
        };

        services
            .AddEndpointsApiExplorer()
            .AddSwaggerGen(c =>
            {
                c.EnableAnnotations();
                c.SwaggerDoc("v1", new OpenApiInfo()
                {
                    Version = "v1",
                    Title = "Store API",
                    Contact = contact,
                    License = license
                });
            });
    }
}