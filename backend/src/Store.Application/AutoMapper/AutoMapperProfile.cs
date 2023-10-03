using AutoMapper;
using Store.Application.Dto.InputModel;
using Store.Domain.Entities;
using Store.Application.Dto.ViewModel;

namespace Store.Application.AutoMapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Client, ClientViewModel>().ReverseMap();
        CreateMap<AddClientInputModel, Client>().ReverseMap();
        CreateMap<Product, ProductViewModel>().ReverseMap();
    }
}