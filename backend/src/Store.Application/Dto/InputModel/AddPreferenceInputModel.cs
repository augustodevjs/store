using FluentValidation;
using FluentValidation.Results;

namespace Store.Application.Dto.InputModel
{
    public class AddPreferenceInputModel
    {
        public int IdClient { get; set; }
        public int IdProduct { get; set; }

        public bool Validar(out ValidationResult validationResult)
        {
            var validator = new InlineValidator<AddPreferenceInputModel>();

            validator.RuleFor(x => x.IdClient)
                .NotEqual(0).WithMessage("Insira uma identificação de cliente válida.");

            validator.RuleFor(x => x.IdProduct)
                .NotEqual(0).WithMessage("Insira uma identificação de produto válido.");

            validationResult = validator.Validate(this);
            return validationResult.IsValid;
        }
    }
}