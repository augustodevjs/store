using FluentValidation;
using Store.Domain.Entities;

namespace Store.Domain.Validators;

public class ClientValidator : AbstractValidator<Client>
{
    public ClientValidator()
    {
        RuleFor(client => client.Name)
            .NotEmpty().WithMessage("O nome é obrigatório.")
            .MaximumLength(150).WithMessage("O nome não pode ter mais de 150 caracteres.");

        RuleFor(client => client.Email)
            .NotEmpty().WithMessage("O e-mail é obrigatório.")
            .EmailAddress().WithMessage("O e-mail não é válido.")
            .MaximumLength(80).WithMessage("O e-mail não pode ter mais de 80 caracteres.");

        RuleFor(c => c.Cpf)
            .MaximumLength(11)
            .IsValidCPF();
    }
}