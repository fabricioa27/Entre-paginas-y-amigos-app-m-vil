using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SunsetParadise.Data;
using SunsetParadise.Models;

public class RoomsController : Controller
{
    private readonly AppDbContext _db;
    public RoomsController(AppDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var rooms = await _db.Rooms.OrderBy(r => r.Number).ToListAsync();
        return View(rooms);
    }

    public async Task<IActionResult> Available()
    {
        var available = await _db.Rooms.Where(r => r.Status == RoomStatus.Disponible)
                                       .OrderBy(r => r.Number).ToListAsync();
        return View(available);
    }

    [HttpGet]
    public IActionResult Create()
    {
        return View(new Room());
    }

    [HttpPost]
    public async Task<IActionResult> Create(Room model)
    {
        if (!ModelState.IsValid) return View(model);

        var exists = await _db.Rooms.AnyAsync(r => r.Number == model.Number);
        if (exists)
        {
            ModelState.AddModelError("Number", "El número de habitación ya existe.");
            return View(model);
        }

        _db.Rooms.Add(model);
        await _db.SaveChangesAsync();
        TempData["ok"] = "Habitación creada.";
        return RedirectToAction(nameof(Index));
    }
}
