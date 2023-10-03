using System.Linq.Expressions;
using Store.Domain.Entities;

namespace Store.Domain.Contracts.Repository;

public interface IRepository<T> : IDisposable where T : Entity
{
    public IUnityOfWork UnityOfWork { get; }

    public Task<T?> FirstOrDefault(Expression<Func<T, bool>> expression);
    void Create(T entity);
    Task<T?> GetById(int? id);
    Task<List<T>> GetAll();
    void Update(T entity);
    void Delete(T entity);
}