using AutoMapper;
using Store.Domain.Entities;
using Store.Application.Dto.ViewModel;
using Store.Application.Notifications;
using Store.Application.Dto.InputModel;
using Store.Domain.Contracts.Repository;
using Store.Application.Contracts.Services;

namespace Store.Application.Services;

public class ClientService : BaseService, IClientService
{
    private readonly IClientRepository _clientRepository;

    public ClientService(
        IMapper mapper,
        INotificator notificator,
        IClientRepository clientRepository
    ) : base(mapper,
        notificator)
    {
        _clientRepository = clientRepository;
    }

    public async Task<List<ClientViewModel>> GetAll()
    {
        var clients = await _clientRepository.GetAll();
        return Mapper.Map<List<ClientViewModel>>(clients);
    }

    public async Task<List<PreferenceViewModel>?> GetPreferencesClient(int id)
    {
        var preferencesClient = await _clientRepository.GetPreferencesClient(id);

        if (preferencesClient is { Count: > 0 })
            return Mapper.Map<List<PreferenceViewModel>>(preferencesClient);

        Notificator.HandleNotFoundResource();
        return null;
    }

    public async Task<ClientViewModel?> GetById(int id)
    {
        var client = await _clientRepository.GetById(id);

        if (client != null) return Mapper.Map<ClientViewModel>(client);

        Notificator.HandleNotFoundResource();
        return null;
    }

    public async Task<ClientViewModel?> Create(AddClientInputModel inputModel)
    {
        var client = Mapper.Map<Client>(inputModel);

        if (!await Validate(client)) return null;

        _clientRepository.Create(client);

        if (await _clientRepository.UnityOfWork.Commit())
            return Mapper.Map<ClientViewModel>(client);

        Notificator.Handle("Não foi possível cadastrar o cliente.");
        return null;
    }

    public async Task<ClientViewModel?> Update(int id, UpdateClientInputModel inputModel)
    {
        if (id != inputModel.Id)
        {
            Notificator.Handle("Os ids não conferem");
            return null;
        }

        var client = await _clientRepository.GetById(id);

        if (client == null)
        {
            Notificator.HandleNotFoundResource();
            return null;
        }

        var result = Mapper.Map(inputModel, client);

        if (!await Validate(client)) return null;

        _clientRepository.Update(client);

        if (await _clientRepository.UnityOfWork.Commit())
            return Mapper.Map<ClientViewModel>(result);

        Notificator.Handle("Não foi possível atualizar o cliente.");
        return null;
    }

    public async Task Delete(int id)
    {
        var getClient = await _clientRepository.GetById(id);

        if (getClient == null)
        {
            Notificator.HandleNotFoundResource();
            return;
        }

        var preferencesClient = await _clientRepository.GetPreferencesClient(id);

        if (preferencesClient.Any())
        {
            Notificator.Handle("Não é possível remover o cliente associado a um ou mais produtos.");
            return;
        }

        _clientRepository.Delete(getClient);

        if (!await _clientRepository.UnityOfWork.Commit())
        {
            Notificator.Handle("Não foi possível remover o cliente.");
        }
    }

    private async Task<bool> Validate(Client client)
    {
        if (!client.Validar(out var validationResult))
        {
            Notificator.Handle(validationResult.Errors);
            return false;
        }

        var existingClient = await _clientRepository.FirstOrDefault(u =>
            u.Id != client.Id && (u.Email == client.Email || u.Cpf == client.Cpf));

        if (existingClient == null) return true;

        Notificator.Handle("Já existe um cliente com essas informações.");
        return false;
    }
}