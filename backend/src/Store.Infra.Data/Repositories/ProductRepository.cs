using Store.Domain.Entities;
using Store.Infra.Data.Abstractions;
using Store.Infra.Data.Context;

namespace Store.Infra.Data.Repositories;

public class ProductRepository : Repository<Product>
{
    public ProductRepository(ApplicationDbContext context) : base(context)
    {
    }
}