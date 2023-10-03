namespace Store.Application.Dto.ViewModel;

public class ClientViewModel : Base
{
    public string Cpf { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
}