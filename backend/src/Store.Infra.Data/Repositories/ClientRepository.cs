using Store.Domain.Entities;
using Store.Infra.Data.Context;
using Store.Infra.Data.Abstractions;
using Microsoft.EntityFrameworkCore;
using Store.Domain.Contracts.Repository;

namespace Store.Infra.Data.Repositories;

public class ClientRepository : Repository<Client>, IClientRepository
{
    public ClientRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<List<Preference>> GetPreferencesClient(int id)
    {
        return await Context.Preferences.Include(c => c.Product).Where(c => c.ClientId == id).ToListAsync();
    }
}