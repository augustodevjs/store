using Store.Application.Dto.InputModel;
using Store.Application.Dto.ViewModel;
using Store.Application.Services;
using Store.Application.Tests.Fixtures;
using Store.Domain.Contracts.Repository;
using Store.Domain.Entities;

namespace Store.Application.Tests.Services;

public class PreferenceServiceTests : BaseServiceTest, IClassFixture<ServicesFixtures>
{
    private readonly PreferenceService _preferenceService;
    private readonly Mock<IClientRepository> _clientRepositoryMock;
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly Mock<IPreferenceRepository> _preferenceRepositoryMock;

    public PreferenceServiceTests(ServicesFixtures servicesFixtures)
    {
        _clientRepositoryMock = new Mock<IClientRepository>();
        _productRepositoryMock = new Mock<IProductRepository>();
        _preferenceRepositoryMock = new Mock<IPreferenceRepository>();
        _preferenceService = new PreferenceService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            _clientRepositoryMock.Object,
            _productRepositoryMock.Object,
            _preferenceRepositoryMock.Object
        );
    }

    #region create

    [Fact]
    public async Task Create_Preference_ReturnListOfCreateReturnViewModel()
    {
        // Arrange
        SetupMocks();
        var preferenceInputModel = new List<AddPreferenceInputModel>
        {
            new()
            {
                IdClient = 1,
                IdProducts = 1
            }
        };

        // Act
        var preferenceService = await _preferenceService.Create(preferenceInputModel);

        // Assert
        using (new AssertionScope())
        {
            preferenceService.Should().NotBeNull();
            preferenceService.Should().BeOfType<List<CreateReturnViewModel>>();
            Erros.Should().BeEmpty();
            _preferenceRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Preference_ReturnHandleErrorUnitOfWork()
    {
        // Arrange
        SetupMocks(false);
        var preferenceInputModel = new List<AddPreferenceInputModel>
        {
            new()
            {
                IdClient = 1,
                IdProducts = 1
            }
        };

        // Act
        var preferenceService = await _preferenceService.Create(preferenceInputModel);

        // Assert
        using (new AssertionScope())
        {
            preferenceService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível cadastrar a preferência.");
            _preferenceRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Preference_ReturnHandleUserNotFound()
    {
        // Arrange
        SetupMocks(false);
        var preferenceInputModel = new List<AddPreferenceInputModel>
        {
            new()
            {
                IdClient = 2,
                IdProducts = 1
            }
        };

        // Act
        var preferenceService = await _preferenceService.Create(preferenceInputModel);

        // Assert
        using (new AssertionScope())
        {
            preferenceService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível encontrar esse usuário.");
            _preferenceRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Preference_ReturnHandleErrorValidar()
    {
        // Arrange
        SetupMocks(false);
        var preferenceInputModel = new List<AddPreferenceInputModel>
        {
            new()
        };

        // Act
        var preferenceService = await _preferenceService.Create(preferenceInputModel);

        // Assert
        using (new AssertionScope())
        {
            preferenceService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            _preferenceRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Once);
        }
    }

    [Fact]
    public async Task Create_Preference_ReturnHandleErrorProductDoestNotExist()
    {
        // Arrange
        SetupMocks(false);
        var preferenceInputModel = new List<AddPreferenceInputModel>
        {
            new()
            {
                IdClient = 1,
                IdProducts = 2
            }
        };

        // Act
        var preferenceService = await _preferenceService.Create(preferenceInputModel);

        // Assert
        using (new AssertionScope())
        {
            preferenceService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain($"O produto com o ID {preferenceInputModel[0].IdProducts} não existe.");
            _preferenceRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    #endregion

    #region mock

    private void SetupMocks(bool commit = true)
    {
        var product = new Product
        {
            Id = 1
        };

        var client = new Client
        {
            Id = 1
        };

        _productRepositoryMock.Setup(c => c.GetById(It.Is<int>(x => x == 1))).ReturnsAsync(product);

        _productRepositoryMock.Setup(c => c.GetById(It.Is<int>(x => x != 1))).ReturnsAsync(null as Product);

        _clientRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x == 1)))
            .ReturnsAsync(client);

        _clientRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x != 1)))
            .ReturnsAsync(null as Client);

        _preferenceRepositoryMock.Setup(c => c.UnityOfWork.Commit()).ReturnsAsync(commit);
    }

    #endregion
}