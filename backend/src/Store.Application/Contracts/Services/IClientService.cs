using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;

namespace Store.Application.Contracts.Services;

public interface IClientService
{
    Task<List<ClientViewModel>> GetAll();
    Task<List<PreferenceViewModel>?> GetPreferencesClient(int id);
    Task<ClientViewModel?> GetById(int id);
    Task<ClientViewModel?> Create(AddClientInputModel inputModel);
    Task<ClientViewModel?> Update(int id, UpdateClientInputModel inputModel);
    Task Delete(int id);
}