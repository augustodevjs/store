using AutoMapper;
using Store.Domain.Entities;
using Store.Application.Notifications;
using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;
using Store.Domain.Contracts.Repository;
using Store.Application.Contracts.Services;

namespace Store.Application.Services;

public class ProductService : BaseService, IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IMapper mapper, INotificator notificator, IProductRepository productRepository) : base(mapper,
        notificator)
    {
        _productRepository = productRepository;
    }

    public async Task<List<ProductViewModel>> GetAll()
    {
        var getAllProducts = await _productRepository.GetAll();
        return Mapper.Map<List<ProductViewModel>>(getAllProducts);
    }

    public async Task<ProductViewModel?> GetById(int id)
    {
        var getProduct = await _productRepository.GetById(id);

        if (getProduct != null) return Mapper.Map<ProductViewModel>(getProduct);
        
        Notificator.HandleNotFoundResource();
        return null;
    }

    public async Task<ProductViewModel?> Create(AddProductInputModel inputModel)
    {
        var product = Mapper.Map<Product>(inputModel);
        
        if (!await Validate(product)) return null;
        
        _productRepository.Create(product);

        if (await _productRepository.UnityOfWork.Commit())
            return Mapper.Map<ProductViewModel>(product);
        
        Notificator.Handle("Não foi possível cadastrar o produto.");
        return null;
    }

    public async Task<ProductViewModel?> Update(int id, UpdateProductInputModel inputModel)
    {
        if (id != inputModel.Id)
        {
            Notificator.Handle("Os ids não conferem");
            return null;
        }
        
        var getProduct = await _productRepository.GetById(id);

        if (getProduct == null)
        {
            Notificator.HandleNotFoundResource();
            return null;
        }

        var result = Mapper.Map(inputModel, getProduct);

        if (!await Validate(getProduct)) return null;

        _productRepository.Update(getProduct);

        if (await _productRepository.UnityOfWork.Commit())
            return Mapper.Map<ProductViewModel>(result);

        Notificator.Handle("Não foi possível atualizar o produto.");
        return null;
    }

    public async Task Delete(int id)
    {
        var getProduct = await _productRepository.GetById(id);

        if (getProduct == null)
        {
            Notificator.HandleNotFoundResource();
            return;
        }

        var productPreferences = await _productRepository.GetProductsAssociatedClient(id);

        if (productPreferences.Any())
        {
            Notificator.Handle("Não é possível remover o produto associado a um ou mais clientes.");
            return;
        }

        _productRepository.Delete(getProduct);

        if (!await _productRepository.UnityOfWork.Commit())
        {
            Notificator.Handle("Não foi possível remover o produto.");
        }
    }

    private async Task<bool> Validate(Product product)
    {
        if (!product.Validar(out var validationResult))
        {
            Notificator.Handle(validationResult.Errors);
            return false;
        }

        var existingProduct =
            await _productRepository.FirstOrDefault(u => u.Id != product.Id && (u.Title == product.Title));

        if (existingProduct == null) return true;
        
        Notificator.Handle("Já existe um produto com esse nome.");
        
        return false;
    }
}