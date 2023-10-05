using FluentValidation.Results;

namespace Store.Domain.Entities;

public class Preference : Entity
{
    public int ClientId { get; set; }
    public int ProductId { get; set; }
    
    public Client Client { get; set; } = null!;
    public Product Product { get; set; } = null!;
}