namespace Store.Domain.Contracts;

public interface IUnityOfWork
{
    Task<bool> Commit();
}