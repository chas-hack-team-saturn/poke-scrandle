using Microsoft.EntityFrameworkCore;
using BackendAPI.Models;

namespace BackendAPI.Data
{
    public class PokeScrandleDbContext : DbContext
    {
        public PokeScrandleDbContext(DbContextOptions<PokeScrandleDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Pokemon> Pokemon { get; set; }
    }
}
