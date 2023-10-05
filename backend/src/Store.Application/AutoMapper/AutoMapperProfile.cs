using AutoMapper;
using Store.Domain.Entities;
using Store.Application.Dto.ViewModel;
using Store.Application.Dto.InputModel;

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

        #region Client

        CreateMap<Client, ClientViewModel>().ReverseMap();
        CreateMap<AddClientInputModel, Client>().ReverseMap();
        CreateMap<UpdateClientInputModel, Client>().ReverseMap();

        #endregion


        #region Preference

        CreateMap<Preference, ProductViewModel>()
            .ForMember(dest => dest.Title, opt => opt.MapFrom(c => c.Product.Title))
            .ForMember(dest => dest.Description, opt => opt.MapFrom(c => c.Product.Description))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(c => c.Product.Price));

        CreateMap<Preference, CreateReturnViewModel>();

        #endregion
    }
}