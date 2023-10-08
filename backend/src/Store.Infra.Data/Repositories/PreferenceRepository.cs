using Store.Domain.Entities;
using Store.Infra.Data.Context;
using Store.Infra.Data.Abstractions;
using Store.Domain.Contracts.Repository;

namespace Store.Infra.Data.Repositories;

public class PreferenceRepository : Repository<Preference>, IPreferenceRepository
{
    public PreferenceRepository(ApplicationDbContext context) : base(context)
    {
    }
}