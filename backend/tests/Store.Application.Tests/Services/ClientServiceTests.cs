using System.Linq.Expressions;
using Store.Application.Dto.InputModel;
using Store.Application.Dto.ViewModel;
using Store.Application.Services;
using Store.Application.Tests.Fixtures;
using Store.Domain.Contracts.Repository;
using Store.Domain.Entities;

namespace Store.Application.Tests.Services;

public class ClientServiceTests : BaseServiceTest, IClassFixture<ServicesFixtures>
{
    private readonly ClientService _clientService;
    private readonly Mock<IClientRepository> _clientRepositoryMock;

    public ClientServiceTests(ServicesFixtures servicesFixtures)
    {
        _clientRepositoryMock = new Mock<IClientRepository>();
        _clientService = new ClientService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            _clientRepositoryMock.Object
        );
    }

    #region allClients

    [Fact]
    public async Task GetAll_ReturnListOfClientViewModel()
    {
        // Act
        var allClients = await _clientService.GetAll();

        // Assert
        using (new AssertionScope())
        {
            allClients.Should().NotBeNull();
            allClients.Should().BeOfType<List<ClientViewModel>>();
        }
    }

    #endregion

    #region getById

    [Fact]
    public async Task GetById_ClienttExistent_ReturnClienttViewModel()
    {
        // Arrange
        SetupMocks();

        // Act
        var clientService = await _clientService.GetById(1);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeFalse();
            clientService.Should().NotBeNull();
            clientService.Should().BeOfType<ClientViewModel>();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Never);
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
        }
    }

    [Fact]
    public async Task GetById_ClientNotExistent_ReturnNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        var clientService = await _clientService.GetById(2);

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().BeNull();
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
        }
    }

    #endregion

    #region create

    [Fact]
    public async Task Create_Client_ReturnClientViewModel()
    {
        // Arrange
        SetupMocks(false);

        var clientInputModel = new AddClientInputModel
        {
            Cpf = "02856604030",
            Email = "teste@gmail.com",
            Name = "Teste"
        };

        // Act
        var clientService = await _clientService.Create(clientInputModel);

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().NotBeNull();
            Erros.Should().BeEmpty();
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Client_HandleErrorValidation()
    {
        // Arrange
        SetupMocks(false);
        var clientInputModel = new AddClientInputModel();

        // Act
        var clientService = await _clientService.Create(clientInputModel);

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Once);
        }
    }

    [Fact]
    public async Task Create_Client_HandleErrorWhenAlreadyExistTitle()
    {
        // Arrange
        SetupMocks();
        var clientInputModel = new AddClientInputModel()
        {
            Cpf = "02856604030",
            Email = "teste@gmail.com",
            Name = "Teste"
        };

        // Act
        var clientService = await _clientService.Create(clientInputModel);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().NotBeEmpty();
            clientService.Should().BeNull();
            Erros.Should().Contain("Já existe uma usuário com essas informações.");
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Client_HandleErrorUnityOfWorkCommit()
    {
        // Arrange
        SetupMocks(false, false);

        var clientInputModel = new AddClientInputModel()
        {
            Cpf = "02856604030",
            Email = "teste@gmail.com",
            Name = "Teste"
        };

        // Act
        var clientService = await _clientService.Create(clientInputModel);

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível cadastrar o cliente.");
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    #endregion

    #region update

    [Fact]
    public async Task Update_Client_ReturnClientViewModel()
    {
        // Arrange
        SetupMocks(false);

        var updateInputModel = new UpdateClientInputModel
        {
            Id = 1,
            Cpf = "02856604030",
            Email = "teste@gmail.com",
            Name = "Teste"
        };

        // Act
        var clientService = await _clientService.Update(1, updateInputModel);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            NotFound.Should().BeFalse();
            clientService.Should().NotBeNull();
            clientService.Should().BeOfType<ClientViewModel>();
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            _clientRepositoryMock.Verify(c => c.Update(It.IsAny<Client>()), Times.Once);
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);

            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Update_InvalidId_ReturnHandleError()
    {
        // Arrange
        SetupMocks();

        // Act
        var clientService = await _clientService.Update(1, new UpdateClientInputModel { Id = 2 });

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().BeNull();
            Erros.Should().Contain("Os ids não conferem");
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Never);
            _clientRepositoryMock.Verify(c => c.Update(It.IsAny<Client>()), Times.Never);
        }
    }

    [Fact]
    public async Task Update_Client_ReturnNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        var clientService = await _clientService.Update(2, new UpdateClientInputModel { Id = 2 });

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            NotFound.Should().BeTrue();
            clientService.Should().BeNull();
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _clientRepositoryMock.Verify(c => c.Update(It.IsAny<Client>()), Times.Never);
        }
    }

    [Fact]
    public async Task Update_Client_HandleErrorValidation()
    {
        // Arrange
        SetupMocks(false);
        var updateInputModel = new UpdateClientInputModel
        {
            Id = 1,
        };

        // Act
        var clientService = await _clientService.Update(1, updateInputModel);

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Once);
        }
    }

    [Fact]
    public async Task Update_Client_HandleErrorWhenAlreadyExistEmailOrCpf()
    {
        // Arrange
        SetupMocks();
        var updateInputModel = new UpdateClientInputModel
        {
            Id = 1,
            Cpf = "02856604030",
            Email = "teste@gmail.com",
            Name = "Teste"
        };

        // Act
        var clientService = await _clientService.Update(1, updateInputModel);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().NotBeEmpty();
            clientService.Should().BeNull();
            Erros.Should().Contain("Já existe uma usuário com essas informações.");
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
        }
    }

    [Fact]
    public async Task Update_Client_HandleErrorUnityOfWorkCommit()
    {
        // Arrange
        SetupMocks(false, false);

        var updateInputModel = new UpdateClientInputModel
        {
            Id = 1,
            Cpf = "02856604030",
            Email = "teste@gmail.com",
            Name = "Teste"
        };

        // Act
        var clientService = await _clientService.Update(1, updateInputModel);

        // Assert
        using (new AssertionScope())
        {
            clientService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível atualizar o cliente.");
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    #endregion

    #region delete

    [Fact]
    public async Task Delete_Client()
    {
        // Arrange
        SetupMocks();

        // Act
        await _clientService.Delete(1);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
        }
    }

    [Fact]
    public async Task Delete_Product_ReturnHandleNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        await _clientService.Delete(2);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
        }
    }

    [Fact]
    public async Task Delete_Product_ReturnErrorUnitOfWorkCommit()
    {
        // Arrange
        SetupMocks(true, false);

        // Act
        await _clientService.Delete(1);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível remover o cliente.");
            _clientRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _clientRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
        }
    }

    #endregion

    #region mock

    private void SetupMocks(bool firstDefaultAssignment = true, bool commit = true)
    {
        var client = new Client { Id = 1 };

        _clientRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x == 1)))
            .ReturnsAsync(client);

        _clientRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x != 1)))
            .ReturnsAsync(null as Client);

        _clientRepositoryMock.Setup(c => c.FirstOrDefault(It.IsAny<Expression<Func<Client, bool>>>()))
            .ReturnsAsync(firstDefaultAssignment ? client : null);

        _clientRepositoryMock.Setup(c => c.UnityOfWork.Commit()).ReturnsAsync(commit);
    }

    #endregion
}