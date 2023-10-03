using Store.Domain.Entities;
using Store.Infra.Data.Abstractions;
using Store.Infra.Data.Context;

namespace Store.Infra.Data.Repositories;

public class ClientRepository : Repository<Client>
{
    public ClientRepository(ApplicationDbContext context) : base(context)
    {
    }
}