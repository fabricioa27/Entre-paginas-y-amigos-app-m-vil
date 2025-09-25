using Microsoft.EntityFrameworkCore;
using SunsetParadise.Data;
//Este ejercicio lo realizaron
//Christian Augusto Maravilla Melendez MM250405 
//Mariana Maytee López Gómez  LG252169
//Angel Mauricio Montes Pleitez MP240211
//Diego Alejandro Cruz Campos CC251293
//Carlos Roberto Luna Diaz LD252724


var builder = WebApplication.CreateBuilder(args);

// 1. Azure SQL Connection
var conn = builder.Configuration.GetConnectionString("AzureSql");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(conn));


// 2. Agregar servicios
builder.Services.AddControllersWithViews();
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true;
    options.IdleTimeout = TimeSpan.FromMinutes(60);
});

// 3. Construir app (después de registrar servicios)
var app = builder.Build();

// 4. Migraciones automáticas al iniciar
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// 5. Middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession();
app.UseAuthorization();

// 6. Rutas
app.MapControllerRoute(
    name: "root",
    pattern: "",
    defaults: new { controller = "Auth", action = "Login" });

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.Run();