using Store.Domain.Validators;
using FluentValidation.Results;

namespace Store.Domain.Entities;

public class Product : Entity
{
    public decimal Price { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public List<Preference> Preferences { get; set; } = new();

    public override bool Validar(out ValidationResult validationResult)
    {
        validationResult = new ProductValidator().Validate(this);
        return validationResult.IsValid;
    }
}