using Microsoft.AspNetCore.Mvc;
using Store.Application.Dto.ViewModel;
using Store.Application.Notifications;
using Store.Application.Dto.InputModel;
using Swashbuckle.AspNetCore.Annotations;
using Store.Application.Contracts.Services;

namespace Store.API.Controllers;

[Route("product")]
public class ProductController : MainController
{
    private readonly IProductService _productService;

    public ProductController(INotificator notificator, IProductService productService) : base(notificator)
    {
        _productService = productService;
    }

    [HttpGet]
    [SwaggerOperation(Summary = "Get all Products")]
    [ProducesResponseType(typeof(List<ProductViewModel>), StatusCodes.Status200OK)]
    public async Task<List<ProductViewModel>> Get()
    {
        return await _productService.GetAll();
    }

    [HttpGet("{id}")]
    [SwaggerOperation(Summary = "Get a product")]
    [ProducesResponseType(typeof(ProductViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var getAssignment = await _productService.GetById(id);
        return OkResponse(getAssignment);
    }
    
    [HttpPost]
    [SwaggerOperation("Add a new product")]
    [ProducesResponseType(typeof(ProductViewModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] AddProductInputModel inputModel)
    {
        var product = await _productService.Create(inputModel);
        return CreatedResponse("", product);
    }
    
    [HttpPut("{id}")]
    [SwaggerOperation("Update a task")]
    [ProducesResponseType(typeof(ProductViewModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductInputModel inputModel)
    {
        var updateProduct = await _productService.Update(id, inputModel);
        return OkResponse(updateProduct);
    }
    
    [HttpDelete("{id}")]
    [SwaggerOperation("Delete a product")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(NotFoundResult), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        await _productService.Delete(id);
        return NoContentResponse();
    }
}