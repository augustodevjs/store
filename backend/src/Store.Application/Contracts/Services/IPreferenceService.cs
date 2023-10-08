using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;

namespace Store.Application.Contracts.Services;

public interface IPreferenceService
{
    Task<List<CreateReturnViewModel>?> Create(List<AddPreferenceInputModel> inputModels);
    Task Delete(int id);
}