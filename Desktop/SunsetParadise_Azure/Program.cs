
using Microsoft.EntityFrameworkCore;
using SunsetParadise.Data;
//Este ejercicio lo realizaron
//Christian Augusto Maravilla Melendez MM250405 
//Mariana Maytee López Gómez  LG252169
//Angel Mauricio Montes Pleitez MP240211
//Diego Alejandro Cruz Campos CC251293
//Carlos Roberto Luna Diaz LD252724

var builder = WebApplication.CreateBuilder(args);

// Azure SQL Connection
var conn = builder.Configuration.GetConnectionString("AzureSql");
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(conn));

builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true;
    options.IdleTimeout = TimeSpan.FromMinutes(60);
});

var app = builder.Build();

// Apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseStaticFiles();
app.UseRouting();
app.UseSession();

app.MapControllerRoute(
    name: "root",
    pattern: "",
    defaults: new { controller = "Auth", action = "Login" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();
