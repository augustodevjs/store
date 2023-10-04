using AutoMapper;
using Store.Application.Dto.InputModel;
using Store.Application.Dto.ViewModel;
using Store.Domain.Entities;

namespace Store.Application.AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        #region Product

        CreateMap<Product, ProductViewModel>().ReverseMap();
        CreateMap<AddProductInputModel, Product>().ReverseMap();
        CreateMap<UpdateProductInputModel, Product>().ReverseMap();

        #endregion
    }
}