using System.ComponentModel.DataAnnotations;

namespace SunsetParadise.Models
{
    public class Room
    {
        [Required, Display(Name="Número")]
        public int Number { get; set; }

        [Required, StringLength(40)]
        public string Type { get; set; } = "";

        [Range(0, 10000), Display(Name="Precio por noche")]
        public decimal Price { get; set; }

        [Required, Display(Name="Estado")]
        public RoomStatus Status { get; set; } = RoomStatus.Disponible;
    }

    public enum RoomStatus
    {
        Disponible,
        Ocupada,
        Mantenimiento
    }
}
