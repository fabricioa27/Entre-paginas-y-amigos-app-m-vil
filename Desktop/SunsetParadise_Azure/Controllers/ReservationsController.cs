using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SunsetParadise.Data;
using SunsetParadise.Models;

public class ReservationsController : Controller
{
    private readonly AppDbContext _db;
    public ReservationsController(AppDbContext db) => _db = db;

    private async Task LoadDrops()
    {
        ViewBag.Clients = await _db.Clients
            .Select(c => new SelectListItem { Text = $"{c.Name} ({c.DUI})", Value = c.DUI })
            .ToListAsync();

        ViewBag.Rooms = await _db.Rooms
            .Where(r => r.Status == RoomStatus.Disponible)
            .Select(r => new SelectListItem { Text = $"{r.Number} - {r.Type} (${r.Price})", Value = r.Number.ToString() })
            .ToListAsync();
    }

    public async Task<IActionResult> Index()
    {
        var list = await (from r in _db.Reservations
                          join c in _db.Clients on r.ClientDUI equals c.DUI
                          join room in _db.Rooms on r.RoomNumber equals room.Number
                          orderby r.CheckIn descending
                          select new { r, c, room }).ToListAsync();

        return View(list.Select(x => (x.r, x.c, x.room)));
    }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
        await LoadDrops();
        return View(new Reservation { CheckIn = DateTime.Today, CheckOut = DateTime.Today.AddDays(1) });
    }

    [HttpPost]
    public async Task<IActionResult> Create(Reservation model)
    {
        if (!ModelState.IsValid) return View(model);

        var room = await _db.Rooms.FirstOrDefaultAsync(r => r.Number == model.RoomNumber);
        if (room == null || room.Status != RoomStatus.Disponible)
        {
            ModelState.AddModelError("RoomNumber", "La habitación no está disponible.");
            return View(model);
        }

        bool overlap = await _db.Reservations.AnyAsync(r =>
            r.RoomNumber == model.RoomNumber &&
            model.CheckIn < r.CheckOut && r.CheckIn < model.CheckOut);
        if (overlap)
        {
            ModelState.AddModelError("RoomNumber", "Fechas solapadas para esta habitación.");
            return View(model);
        }

        model.Total = model.Nights * room.Price;

        _db.Reservations.Add(model);
        room.Status = RoomStatus.Ocupada;
        await _db.SaveChangesAsync();

        TempData["ok"] = $"Reserva creada. Total: ${model.Total}";
        return RedirectToAction(nameof(Index));
    }
}
