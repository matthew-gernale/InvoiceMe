
namespace InvoiceMe.Server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1:1 Relationship
            modelBuilder.Entity<User>()
                .HasOne(user => user.Client)
                .WithOne(client => client.User)
                .HasForeignKey<Client>(client => client.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seed Users
            var adminId = Guid.NewGuid();
            var client1Id = Guid.NewGuid();
            var client2Id = Guid.NewGuid();
            var client3Id = Guid.NewGuid();

            AuthUtil.CreatePasswordHash("Admin2025", out var adminHash, out var adminSalt);
            AuthUtil.CreatePasswordHash("Client.CRUZ", out var client1Hash, out var client1Salt);
            AuthUtil.CreatePasswordHash("Client.VERA", out var client2Hash, out var client2Salt);
            AuthUtil.CreatePasswordHash("Client.OPEZ", out var client3Hash, out var client3Salt);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = adminId,
                    Email = "admin@gmail.com",
                    FirstName = "System",
                    LastName = "Admin",
                    PasswordHash = adminHash,
                    PasswordSalt = adminSalt,
                    Role = UserRoles.ADMIN,
                    IsActive = true,
                    RefreshTokenCreatedAt = DateTime.UtcNow,
                    RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7),
                },
                new User
                {
                    Id = client1Id,
                    Email = "anna@gmail.com",
                    FirstName = "Anna",
                    LastName = "Cruz",
                    PasswordHash = client1Hash,
                    PasswordSalt = client1Salt,
                    Role = UserRoles.CLIENT,
                    IsActive = true,
                    RefreshTokenCreatedAt = DateTime.UtcNow,
                    RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7),
                },
                new User
                {
                    Id = client2Id,
                    Email = "mark@gmail.com",
                    FirstName = "Mark",
                    LastName = "Rivera",
                    PasswordHash = client2Hash,
                    PasswordSalt = client2Salt,
                    Role = UserRoles.CLIENT,
                    IsActive = true,
                    RefreshTokenCreatedAt = DateTime.UtcNow,
                    RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7),
                },
                new User
                {
                    Id = client3Id,
                    Email = "sofie@gmail.com",
                    FirstName = "Sofia",
                    LastName = "Lopez",
                    PasswordHash = client3Hash,
                    PasswordSalt = client3Salt,
                    Role = UserRoles.CLIENT,
                    IsActive = true,
                    RefreshTokenCreatedAt = DateTime.UtcNow,
                    RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(7),
                }
            );

            // Seed Clients
            modelBuilder.Entity<Client>().HasData(
                new Client
                {
                    Id = 1,
                    UserId = client1Id
                },
                new Client
                {
                    Id = 2,
                    UserId = client2Id
                },
                new Client
                {
                    Id = 3,
                    UserId = client3Id
                }
            );
        }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<User> Users { get; set; }
    }

}
