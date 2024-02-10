using System.Linq.Expressions;
using Store.Domain.Entities;
using Store.Application.Services;
using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;
using Store.Application.Tests.Fixtures;
using Store.Domain.Contracts.Repository;

namespace Store.Application.Tests.Services;

public class ProductServiceTests : BaseServiceTest, IClassFixture<ServicesFixtures>
{
    private readonly ProductService _productService;
    private readonly Mock<IProductRepository> _productRepositoryMock;

    public ProductServiceTests(ServicesFixtures servicesFixtures)
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        _productService = new ProductService(
            servicesFixtures.Mapper,
            NotificatorMock.Object,
            _productRepositoryMock.Object
        );
    }

    #region allProducts

    [Fact]
    public async Task GetAll_ReturnListOfProductViewModel()
    {
        // Act
        var allProducts = await _productService.GetAll();

        // Assert
        using (new AssertionScope())
        {
            allProducts.Should().NotBeNull();
            allProducts.Should().BeOfType<List<ProductViewModel>>();
        }
    }

    #endregion

    #region getById

    [Fact]
    public async Task GetById_ProductExistent_ReturnProductViewModel()
    {
        // Arrange
        SetupMocks();

        // Act
        var productService = await _productService.GetById(1);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeFalse();
            productService.Should().NotBeNull();
            productService.Should().BeOfType<ProductViewModel>();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Never);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
        }
    }

    [Fact]
    public async Task GetById_ProductNotExistent_ReturnNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        var productService = await _productService.GetById(2);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
        }
    }

    #endregion

    #region create

    [Fact]
    public async Task Create_Product_ReturnProductViewModel()
    {
        // Arrange
        SetupMocks(false);

        var productInputModel = new AddProductInputModel
        {
            Title = "Teste",
            Price = 10,
            Description = "Teste",
        };

        // Act
        var productServce = await _productService.Create(productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productServce.Should().NotBeNull();
            Erros.Should().BeEmpty();
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Product_HandleErrorValidation()
    {
        // Arrange
        SetupMocks(false);
        var productInputModel = new AddProductInputModel();

        // Act
        var productService = await _productService.Create(productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Once);
        }
    }

    [Fact]
    public async Task Create_Product_HandleErrorUnityOfWorkCommit()
    {
        // Arrange
        SetupMocks(false, false);

        var productInputModel = new AddProductInputModel
        {
            Title = "Teste",
            Price = 10,
            Description = "Teste",
        };

        // Act
        var productService = await _productService.Create(productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível cadastrar o produto.");
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Create_Product_ReturnHandleErrorProductNameAlreadyExist()
    {
        // Arrange
        SetupMocks(true, false);

        var productInputModel = new AddProductInputModel
        {
            Title = "Teste",
            Price = 10,
            Description = "Teste",
        };

        // Act
        var productService = await _productService.Create(productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Já existe um produto com esse nome.");
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }
    
    #endregion

    #region update

    [Fact]
    public async Task Update_Product_ReturnProductViewModel()
    {
        // Arrange
        SetupMocks(false);

        var updateInputModel = new UpdateProductInputModel
        {
            Id = 1,
            Title = "Teste",
            Price = 10,
            Description = "Teste",
        };

        // Act
        var productServce = await _productService.Update(1, updateInputModel);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            NotFound.Should().BeFalse();
            productServce.Should().NotBeNull();
            productServce.Should().BeOfType<ProductViewModel>();
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            _productRepositoryMock.Verify(c => c.Update(It.IsAny<Product>()), Times.Once);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);

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
        var productService = await _productService.Update(1, new UpdateProductInputModel { Id = 2 });

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().Contain("Os ids não conferem");
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Never);
            _productRepositoryMock.Verify(c => c.Update(It.IsAny<Product>()), Times.Never);
        }
    }

    [Fact]
    public async Task Update_Product_ReturnNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        var productService = await _productService.Update(2, new UpdateProductInputModel { Id = 2 });

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            NotFound.Should().BeTrue();
            productService.Should().BeNull();
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _productRepositoryMock.Verify(c => c.Update(It.IsAny<Product>()), Times.Never);
        }
    }

    [Fact]
    public async Task Update_Product_HandleErrorValidation()
    {
        // Arrange
        SetupMocks(false);
        var productInputModel = new UpdateProductInputModel
        {
            Id = 1
        };

        // Act
        var productService = await _productService.Update(1, productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Once);
        }
    }

    [Fact]
    public async Task Update_Product_HandleErrorUnityOfWorkCommit()
    {
        // Arrange
        SetupMocks(false, false);

        var productInputModel = new UpdateProductInputModel
        {
            Id = 1,
            Title = "Teste",
            Price = 10,
            Description = "Teste",
        };

        // Act
        var productService = await _productService.Update(1, productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível atualizar o produto.");
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    [Fact]
    public async Task Update_Product_ReturnHandleErrorProductNameAlreadyExist()
    {
        // Arrange
        SetupMocks(true, false);

        var productInputModel = new UpdateProductInputModel
        {
            Id = 1,
            Title = "Teste",
            Price = 10,
            Description = "Teste",
        };

        // Act
        var productService = await _productService.Update(1, productInputModel);

        // Assert
        using (new AssertionScope())
        {
            productService.Should().BeNull();
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Já existe um produto com esse nome.");
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<string>()), Times.Once);
            NotificatorMock.Verify(c => c.Handle(It.IsAny<List<ValidationFailure>>()), Times.Never);
        }
    }

    #endregion

    #region delete

    [Fact]
    public async Task Delete_Product()
    {
        // Arrange
        SetupMocks(getProductsAssociatedClient: false);

        // Act
        await _productService.Delete(1);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().BeEmpty();
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
        }
    }

    [Fact]
    public async Task Delete_Product_ReturnHandleNotFoundResource()
    {
        // Arrange
        SetupMocks();

        // Act
        await _productService.Delete(2);

        // Assert
        using (new AssertionScope())
        {
            NotFound.Should().BeTrue();
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Once);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
        }
    }
    
    [Fact]
    public async Task Delete_Product_ReturnHandleErrorAssociatedProductsToClient()
    {
        // Arrange
        SetupMocks(false, false);

        // Act
        await _productService.Delete(1);

        // Assert
        using (new AssertionScope())
        {
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não é possível remover o produto associado a um ou mais clientes.");
            NotificatorMock.Verify(c => c.HandleNotFoundResource(), Times.Never);
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _productRepositoryMock.Verify(c => c.GetProductsAssociatedClient(It.IsAny<int>()), Times.Once);
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Never);
        }
    }

    [Fact]
    public async Task Delete_Product_ReturnErrorUnitOfWorkCommit()
    {
        // Arrange
        SetupMocks(true, false, false);
    
        // Act
        await _productService.Delete(1);
    
        // Assert
        using (new AssertionScope())
        {
            Erros.Should().NotBeEmpty();
            Erros.Should().Contain("Não foi possível remover o produto.");
            _productRepositoryMock.Verify(c => c.GetById(It.IsAny<int>()), Times.Once);
            _productRepositoryMock.Verify(c => c.UnityOfWork.Commit(), Times.Once);
        }
    }

    #endregion

    #region mock

    private void SetupMocks(bool firstDefaultAssignment = true, bool commit = true,
        bool getProductsAssociatedClient = true)
    {
        var product = new Product { Id = 1 };

        var preferences = new List<Preference>
        {
            new()
            {
                Id = 1,
            }
        };

        _productRepositoryMock.Setup(c => c.GetProductsAssociatedClient(It.IsAny<int>()))
            .ReturnsAsync(getProductsAssociatedClient ? preferences : new List<Preference>());

        _productRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x == 1)))
            .ReturnsAsync(product);

        _productRepositoryMock
            .Setup(c => c.GetById(It.Is<int>(x => x != 1)))
            .ReturnsAsync(null as Product);

        _productRepositoryMock.Setup(c => c.FirstOrDefault(It.IsAny<Expression<Func<Product, bool>>>()))
            .ReturnsAsync(firstDefaultAssignment ? product : null);

        _productRepositoryMock.Setup(c => c.UnityOfWork.Commit()).ReturnsAsync(commit);
    }

    #endregion
}