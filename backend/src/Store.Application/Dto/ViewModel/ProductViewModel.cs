namespace Store.Application.Dto.ViewModel;

public class ProductViewModel : Base
{
    public decimal Price { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
}