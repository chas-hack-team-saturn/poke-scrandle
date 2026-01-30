using BackendAPI.Data;
using Pomelo.EntityFrameworkCore.MySql;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var password = Environment.GetEnvironmentVariable("MARIADB_PASSWORD");
            string connectionString = $"Server=db;Port=3306;Database=PokeScrandle;Uid=root;Pwd={password};";
            var serverVersion = new MySqlServerVersion(new Version(12, 1));


            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddAuthorization();

            Console.WriteLine(connectionString);

            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();


            builder.Services.AddDbContext<PokeScrandleDbContext>(options => options.UseMySql(connectionString, serverVersion));
            //builder.Services.AddDbContext<>(options => options.UseMysSql(connectionString, serverVersion, UseMicrosoftJson))
            //    .LogTo(Console.WriteLine, LogLevel.Information).UseMicrosoftJson();
            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapGet("/get", async (PokeScrandleDbContext dB) =>
            {
                var results = await dB.Pokemon.ToListAsync();

                if (results.Count < 1 || results == null)
                {
                    Results.NotFound();
                }

                Results.Ok(results);
            });


            app.Run();
        }
    }
}
