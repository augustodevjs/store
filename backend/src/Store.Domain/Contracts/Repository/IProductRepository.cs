using Store.Domain.Entities;

namespace Store.Domain.Contracts.Repository;

public interface IProductRepository : IRepository<Product>
{
    Task<List<Product>> GetProductsAssociatedClient(int productId);
}