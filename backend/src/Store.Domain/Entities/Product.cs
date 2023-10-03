using System.Collections.ObjectModel;

namespace Store.Domain.Entities;

public class Product : Entity
{
    public int? IdClient { get; set; }
    public decimal TotalCost { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;

    // EF Relation
    public Collection<Client> Clients { get; set; }
}