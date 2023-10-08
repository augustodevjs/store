using Microsoft.AspNetCore.Mvc;
using Store.Application.Notifications;
using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;
using Swashbuckle.AspNetCore.Annotations;
using Store.Application.Contracts.Services;

namespace Store.API.Controllers;

[Route("preference")]
public class PreferenceController : MainController
{
    private readonly IPreferenceService _preferenceService;
    
    public PreferenceController(INotificator notificator, IPreferenceService preferenceService) : base(notificator)
    {
        _preferenceService = preferenceService;
    }
    
    [HttpPost]
    [SwaggerOperation("Add a new preference")]
    [ProducesResponseType(typeof(List<CreateReturnViewModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] List<AddPreferenceInputModel> inputModel)
    { 
        var preference = await _preferenceService.Create(inputModel);
        return OkResponse(preference);
    }
    
    [HttpDelete("{id}")]
    [SwaggerOperation("Delete a client")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        await _preferenceService.Delete(id);
        return NoContentResponse();
    }
}