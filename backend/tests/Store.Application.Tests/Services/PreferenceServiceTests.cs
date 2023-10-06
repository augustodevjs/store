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
    private readonly Mock<IPreferenceRepository> _preferenceRepositoryMock;

    public PreferenceServiceTests(ServicesFixtures servicesFixtures)
    {
        _clientRepositoryMock = new Mock<IClientRepository>();
        _preferenceRepositoryMock = new Mock<IPreferenceRepository>();
        _preferenceService = new PreferenceService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            _preferenceRepositoryMock.Object,
            _clientRepositoryMock.Object
        );
    }
    
    #region getPreferenceByUser

    [Fact]
    public async Task GetPreferenceByUser_ReturnListOfProductViewModel()
    {
        // Arrange
        SetupMocks();

        // Act
        var preferenceService = await _preferenceService.GetPreferencesByUser(1);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeFalse();
            preferenceService.Should().NotBeNull();
            preferenceService.Should().BeOfType<List<ProductViewModel>>();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Never);
            _preferenceRepositoryMock.Verify(c => c.GetPreferenceOfUser(It.IsAny<int>()), Times.Once);
        }
    }

    [Fact]
    public async Task GetPreferenceByUser_ReturnHandleNotFoundResource()
    {
        // Arrange
        SetupMocks();
    
        // Act
        var preferenceService = await _preferenceService.GetPreferencesByUser(2);
    
        // Assert
        using (new AssertionScope())
        {
            preferenceService.Should().BeNull();
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _preferenceRepositoryMock.Verify(c => c.GetPreferenceOfUser(It.IsAny<int>()), Times.Once);
        }
    }

    #endregion
    
    
    #region mock

    private void SetupMocks(bool firstDefaultAssignment = true, bool commit = true)
    {
        var preference = new List<Preference>
        {
            new()
            {
                Id = 1
            }
        };

        _preferenceRepositoryMock
            .Setup(c => c.GetPreferenceOfUser(It.Is<int>(x => x == 1)))
            .ReturnsAsync(preference);

        _preferenceRepositoryMock
            .Setup(c => c.GetPreferenceOfUser(It.Is<int>(x => x != 1)))
            .ReturnsAsync(null as List<Preference>);
    }

    #endregion
}