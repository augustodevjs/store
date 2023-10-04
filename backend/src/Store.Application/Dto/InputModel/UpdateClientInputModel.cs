namespace Store.Application.Dto.InputModel;

public class UpdateClientInputModel : Base
{
    public string Cpf { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
}