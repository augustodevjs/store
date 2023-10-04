using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;

namespace Store.Application.Contracts.Services;

public interface IProductService
{
    Task<List<ProductViewModel>> GetAll();
    Task<ProductViewModel?> GetById(int id);
    Task<ProductViewModel?> Create(AddProductInputModel inputModel);
    Task<ProductViewModel?> Update(int id, UpdateProductInputModel inputModel);
    Task Delete(int id);
}