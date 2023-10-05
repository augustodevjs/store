using AutoMapper;
using Store.Domain.Entities;
using Store.Application.Notifications;
using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;
using Store.Domain.Contracts.Repository;
using Store.Application.Contracts.Services;

namespace Store.Application.Services;

public class PreferenceService : BaseService, IPreferenceService
{
    private readonly IPreferenceRepository _preferenceRepository;
    private readonly IClientRepository _clientRepository;

    public PreferenceService(IMapper mapper, INotificator notificator, IPreferenceRepository preferenceRepository,
        IClientRepository clientRepository) :
        base(mapper, notificator)
    {
        _preferenceRepository = preferenceRepository;
        _clientRepository = clientRepository;
    }

    public async Task<List<CreateReturnViewModel>?> Create(AddPreferenceInputModel inputModel)
    {
        var getClient = await _clientRepository.GetById(inputModel.IdClient);

        if (!inputModel.Validar(out var validationResult))
        {
            Notificator.Handle(validationResult.Errors);
            return null;
        }

        if (getClient == null)
        {
            Notificator.Handle("Não foi possível encontrar esse usuário.");
            return null;
        }

        var createdPreferences = new List<Preference>();

        foreach (var preference in inputModel.ListIdProducts.Select(productId => new Preference
                 {
                     ClientId = inputModel.IdClient,
                     ProductId = productId
                 }))
        {
            _preferenceRepository.Create(preference);
            createdPreferences.Add(preference);
        }

        if (await _preferenceRepository.UnityOfWork.Commit())
            return Mapper.Map<List<CreateReturnViewModel>>(createdPreferences);

        Notificator.Handle("Não foi possível cadastrar a preferência.");
        return null;
    }

    public async Task<List<ProductViewModel>?> GetPreferencesByUser(int id)
    {
        var getPreferenceUser = await _preferenceRepository.GetPreferenceOfUser(id);

        if (getPreferenceUser is { Count: > 0 })
            return Mapper.Map<List<ProductViewModel>>(getPreferenceUser);

        Notificator.HandleNotFoundResource();
        return null;
    }
}