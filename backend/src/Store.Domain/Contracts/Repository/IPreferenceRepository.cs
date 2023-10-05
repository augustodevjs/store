using Store.Domain.Entities;

namespace Store.Domain.Contracts.Repository;

public interface IPreferenceRepository : IRepository<Preference>
{
    Task<List<Preference>?> GetPreferenceOfUser(int id);
}