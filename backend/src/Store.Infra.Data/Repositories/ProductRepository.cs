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

    public async Task<List<Preference>> GetProductsAssociatedClient(int productId)
    {
        return await Context.Preferences.Include(c => c.Product).Where(c => c.ProductId == productId).ToListAsync();
    }
}