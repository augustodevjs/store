using Microsoft.EntityFrameworkCore;
using Store.Domain.Entities;
using Store.Infra.Data.Context;
using Store.Infra.Data.Abstractions;
using Store.Domain.Contracts.Repository;

namespace Store.Infra.Data.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {
    }
    
    public async Task<List<Product>> GetProductsAssociatedClient(int productId)
    {
        return await Context.Products.Include(c => c.Preferences).Where(c => c.Id == productId).ToListAsync();
    }
}