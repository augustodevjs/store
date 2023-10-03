using Microsoft.AspNetCore.Mvc;
using Store.Application.Notifications;

namespace Store.API.Controllers;

[Route("client")]
public class ClientController : MainController
{
    public ClientController(INotificator notificator) : base(notificator)
    {
    }
}