using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunsetParadise.Data;
using SunsetParadise.Models;


public class ClientsController: Controller
{
    private readonly AppDbContext _db;
    public ClientsController(AppDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var clients = await _db.Clients.OrderBy(c => c.Name).ToListAsync();
        return View(clients);
    }

    [HttpGet]
    public IActionResult Create()
    {
        return View(new Client());
    }

    [HttpPost]
    public async Task<IActionResult> Create(Client model)
    {
        if (!ModelState.IsValid) return View(model);

        var exists = await _db.Clients.AnyAsync(c => c.DUI == model.DUI);
        if (exists)
        {
            ModelState.AddModelError("DUI", "Ya existe un cliente con ese DUI.");
            return View(model);
        }

        _db.Clients.Add(model);
        await _db.SaveChangesAsync();
        TempData["ok"] = "Cliente registrado.";
        return RedirectToAction(nameof(Index));
    }
}
