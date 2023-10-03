using Store.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Store.Infra.Data.Mappings
{
    public class ClientMapping : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder
                .Property(c => c.Name)
                .IsRequired()
                .HasColumnType("VARCHAR(150)");

            builder
                .Property(c => c.Cpf)
                .HasMaxLength(11)
                .HasColumnType("VARCHAR(11)");

            builder
                .Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(80)
                .HasColumnType("VARCHAR(80)");

            builder
                .Property(c => c.CreatedAt)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp with time zone");

            builder
                .Property(c => c.UpdatedAt)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp with time zone");

            builder
                .HasMany(c => c.Products)
                .WithMany(c => c.Clients);
        }
    }
}