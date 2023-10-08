using Microsoft.AspNetCore.Mvc;
using Store.Application.Notifications;
using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;
using Swashbuckle.AspNetCore.Annotations;
using Store.Application.Contracts.Services;

namespace Store.API.Controllers;

[Route("client")]
public class ClientController : MainController
{
    private readonly IClientService _clientService;

    public ClientController(
        INotificator notificator,
        IClientService clientService
    ) : base(notificator)
    {
        _clientService = clientService;
    }

    [HttpGet]
    [SwaggerOperation(Summary = "Get all Clients")]
    [ProducesResponseType(typeof(List<ClientViewModel>), StatusCodes.Status200OK)]
    public async Task<List<ClientViewModel>> Get()
    {
        return await _clientService.GetAll();
    }

    [HttpGet("preferences/{id}")]
    [SwaggerOperation(Summary = "Get preferences of client.")]
    [ProducesResponseType(typeof(PreferenceViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetPreferencesByUser(int id)
    {
        var preferencesUser = await _clientService.GetPreferencesClient(id);
        return OkResponse(preferencesUser);
    }

    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get a client")]
    [ProducesResponseType(typeof(ClientViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var client = await _clientService.GetById(id);
        return OkResponse(client);
    }

    [HttpPost]
    [SwaggerOperation("Add a new client")]
    [ProducesResponseType(typeof(ClientViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] AddClientInputModel inputModel)
    {
        var client = await _clientService.Create(inputModel);
        return CreatedResponse("", client);
    }

    [HttpPut("{id}")]
    [SwaggerOperation("Update a client")]
    [ProducesResponseType(typeof(ClientViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateClientInputModel inputModel)
    {
        var updateClient = await _clientService.Update(id, inputModel);
        return OkResponse(updateClient);
    }

    [HttpDelete("{id}")]
    [SwaggerOperation("Delete a client")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        await _clientService.Delete(id);
        return NoContentResponse();
    }
}