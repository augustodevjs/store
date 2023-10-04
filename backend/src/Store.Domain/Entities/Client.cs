using FluentValidation.Results;
using Store.Domain.Validators;

namespace Store.Domain.Entities;

public class Client : Entity
{
    public string Cpf { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    
    public override bool Validar(out ValidationResult validationResult)
    {
        validationResult = new ClientValidator().Validate(this);
        return validationResult.IsValid;
    }
}