using Store.Core.Utils;
using FluentValidation;
using FluentValidation.Results;

namespace Store.Application.Dto.InputModel
{
    public class AddPreferenceInputModel
    {
        public int IdClient { get; set; }
        public List<int> ListIdProducts { get; set; } = new();

        public bool Validar(out ValidationResult validationResult)
        {
            var validator = new InlineValidator<AddPreferenceInputModel>();

            validator.RuleFor(x => x.IdClient)
                .NotEqual(0).WithMessage("Insira uma identificação de cliente válida.");

            validator.RuleFor(x => x.ListIdProducts)
                .NotEmpty().WithMessage("Insira uma lista de produtos válida.")
                .Must(NumberUtils.BeUnique).WithMessage("A lista de produtos não pode conter números repetidos.")
                .Must(nums => nums.All(num => num != 0))
                .WithMessage("A lista de produtos não pode conter o número zero.");

            validationResult = validator.Validate(this);
            return validationResult.IsValid;
        }
    }
}