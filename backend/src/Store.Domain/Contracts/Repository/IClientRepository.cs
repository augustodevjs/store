using Store.Domain.Entities;

namespace Store.Domain.Contracts.Repository;

public interface IClientRepository : IRepository<Client>
{
    Task<List<Preference>> GetPreferencesClient(int id);
}