using Microsoft.EntityFrameworkCore;
using SunsetParadise.Models;

namespace SunsetParadise.Data  // Asegúrate de que esté en este espacio de nombres
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar la precisión y escala para los campos de tipo decimal

            modelBuilder.Entity<Room>()
                .Property(r => r.Price)
                .HasColumnType("decimal(18,2)");  // 18 dígitos en total, 2 después del punto decimal

            modelBuilder.Entity<Reservation>()
                .Property(r => r.Total)
                .HasColumnType("decimal(18,2)");  // 18 dígitos en total, 2 después del punto decimal

            // Configuración de las claves primarias
            modelBuilder.Entity<Client>().HasKey(c => c.DUI);  // Si estás usando DUI como clave primaria
            modelBuilder.Entity<Room>().HasKey(r => r.Number);
            modelBuilder.Entity<Reservation>().HasKey(r => r.Id);
        }
    }
}




