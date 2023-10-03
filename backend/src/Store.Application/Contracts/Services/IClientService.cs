using Store.Application.Dto.InputModel;
using Store.Application.Dto.ViewModel;

namespace Store.Application.Contracts.Services;

public interface IClientService
{
    Task<ClientViewModel?> Create(AddClientInputModel inputModel);
}