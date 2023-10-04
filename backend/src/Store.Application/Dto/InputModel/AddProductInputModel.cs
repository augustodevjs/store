namespace Store.Application.Dto.InputModel;

public class AddProductInputModel
{
    public decimal Price { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
}