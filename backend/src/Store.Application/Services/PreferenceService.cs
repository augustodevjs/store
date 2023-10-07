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
    private readonly IClientRepository _clientRepository;
    private readonly IProductRepository _productRepository;
    private readonly IPreferenceRepository _preferenceRepository;

    public PreferenceService(
        IMapper mapper,
        INotificator notificator,
        IClientRepository clientRepository,
        IProductRepository productRepository,
        IPreferenceRepository preferenceRepository
    ) :
        base(mapper, notificator)
    {
        _clientRepository = clientRepository;
        _productRepository = productRepository;
        _preferenceRepository = preferenceRepository;
    }

    public async Task<List<CreateReturnViewModel>?> Create(List<AddPreferenceInputModel> inputModels)
    {
        var createdPreferences = new List<Preference>();

        foreach (var inputModel in inputModels)
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

            var preference = await CreatePreference(inputModel.IdProducts, inputModel.IdClient); // Ajustado para IdProducts

            if (preference == null)
            {
                return null; 
            }

            createdPreferences.Add(preference);
        }

        if (await _preferenceRepository.UnityOfWork.Commit())
        {
            return Mapper.Map<List<CreateReturnViewModel>>(createdPreferences);
        }

        Notificator.Handle("Não foi possível cadastrar a preferência.");
        return null;
    }

    private async Task<Preference?> CreatePreference(int productId, int clientId) // Ajustado para receber productId
    {
        var product = await _productRepository.GetById(productId);

        if (product == null)
        {
            Notificator.Handle($"O produto com o ID {productId} não existe.");
            return null;
        }

        var preference = new Preference
        {
            ClientId = clientId,
            ProductId = productId
        };

        _preferenceRepository.Create(preference);
    
        return preference;
    }

    

    public async Task<List<ProductViewModel>?> GetPreferencesByUser(int id)
    {
        var getPreferenceUser = await _preferenceRepository.GetPreferenceOfUser(id);

        if (getPreferenceUser is { Count: > 0 })
            return Mapper.Map<List<ProductViewModel>>(getPreferenceUser);

        Notificator.HandleNotFoundResource();
        return null;
    }

    public async Task Delete(int id)
    {
        var getPreference = await _preferenceRepository.GetById(id);

        if (getPreference == null)
        {
            Notificator.HandleNotFoundResource();
            return;
        }

        _preferenceRepository.Delete(getPreference);

        if (!await _preferenceRepository.UnityOfWork.Commit())
        {
            Notificator.Handle("Não foi possível remover a preferência.");
        }
    }

}