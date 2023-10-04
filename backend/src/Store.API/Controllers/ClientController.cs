// using Microsoft.AspNetCore.Mvc;
// using Store.Application.Contracts.Services;
// using Store.Application.Dto.InputModel;
// using Store.Application.Dto.ViewModel;
// using Store.Application.Notifications;
// using Swashbuckle.AspNetCore.Annotations;
//
// namespace Store.API.Controllers;
//
// [Route("client")]
// public class ClientController : MainController
// {
//     private readonly IClientService _clientService;
//
//     public ClientController(INotificator notificator, IClientService clientService) : base(notificator)
//     {
//         _clientService = clientService;
//     }
//
//     [HttpPost]
//     [SwaggerOperation(Summary = "Add a new client")]
//     [ProducesResponseType(typeof(ClientViewModel), StatusCodes.Status200OK)]
//     public async Task<IActionResult> Create([FromBody] AddClientInputModel inputModel)
//     {
//         var client = await _clientService.Create(inputModel);
//         return CreatedResponse("", client);
//     }
// }