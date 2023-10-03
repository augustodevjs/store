using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Store.Domain.Entities;

namespace Store.Infra.Data.Mappings;

public class ProductMapping : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder
            .Property(c => c.Title)
            .IsRequired()
            .HasColumnType("VARCHAR(150)");

        builder
            .Property(c => c.Description)
            .IsRequired()
            .HasColumnType("VARCHAR(255)");
        
        builder
            .Property(c => c.IdClient)
            .IsRequired();
        
        builder
            .Property(c => c.TotalCost)
            .IsRequired();

        builder
            .Property(c => c.CreatedAt)
            .ValueGeneratedOnAdd()
            .HasColumnType("timestamp");
        
        builder
            .Property(c => c.UpdatedAt)
            .ValueGeneratedOnAddOrUpdate()
            .HasColumnType("timestamp");
    }
}