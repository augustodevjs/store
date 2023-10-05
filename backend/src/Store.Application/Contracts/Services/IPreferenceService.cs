using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;
using Store.Domain.Entities;

namespace Store.Application.Contracts.Services;

public interface IPreferenceService
{
    Task<List<CreateReturnViewModel>?> Create(AddPreferenceInputModel inputModel);
    Task<List<ProductViewModel>?> GetPreferencesByUser(int id);
}