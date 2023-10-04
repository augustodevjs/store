using FluentValidation;
using Store.Domain.Entities;

namespace Store.Domain.Validators;

public class ProductValidator : AbstractValidator<Product>
{
    public ProductValidator()
    {
        RuleFor(product => product.Price).GreaterThan(0).WithMessage("O preço deve ser maior que zero.");

        RuleFor(product => product.Title).NotEmpty().WithMessage("O título é obrigatório.");

        RuleFor(product => product.Description).NotEmpty().WithMessage("A descrição é obrigatória.");
    }
}