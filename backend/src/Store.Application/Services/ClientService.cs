using AutoMapper;
using Store.Domain.Entities;
using Store.Application.Contracts.Services;
using Store.Application.Dto.InputModel;
using Store.Application.Dto.ViewModel;
using Store.Application.Notifications;
using Store.Domain.Contracts.Repository;

namespace Store.Application.Services;

public class ClientService : BaseService, IClientService
{
    private readonly IClientRepository _clientRepository;

    public ClientService(IMapper mapper, INotificator notificator, IClientRepository clientRepository) : base(mapper,
        notificator)
    {
        _clientRepository = clientRepository;
    }

    public async Task<ClientViewModel?> Create(AddClientInputModel inputModel)
    {
        var client = Mapper.Map<Client>(inputModel);

        _clientRepository.Create(client);
        
        if (await _clientRepository.UnityOfWork.Commit())
            return Mapper.Map<ClientViewModel>(client);
        
        Notificator.Handle("Não foi possível criar o cliente");

        return null;
    }
}