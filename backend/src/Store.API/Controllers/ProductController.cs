
using Microsoft.AspNetCore.Mvc;
using Store.Application.Notifications;

namespace Store.API.Controllers;

[Route("product")]

public class ProductController : MainController
{
    public ProductController(INotificator notificator) : base(notificator)
    {
    }
    
    [HttpGet]
    public Task Get()
    {
        return Task.FromResult("oi");
    }
}