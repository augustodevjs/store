namespace Store.Application.Dto.ViewModel;

public class ProductViewModel : Base
{
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal TotalCost { get; set; }
}