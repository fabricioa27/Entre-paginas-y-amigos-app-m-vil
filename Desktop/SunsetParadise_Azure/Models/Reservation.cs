
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunsetParadise.Models
{
    public class Reservation
    {
        public int Id { get; set; }

        [Required, Display(Name="Cliente")]
        public string ClientDUI { get; set; } = "";

        [Required, Display(Name="Habitación")]
        public int RoomNumber { get; set; }

        [DataType(DataType.Date), Display(Name="Entrada")]
        public DateTime CheckIn { get; set; }

        [DataType(DataType.Date), Display(Name="Salida")]
        public DateTime CheckOut { get; set; }

        [Display(Name="Total")]
        public decimal Total { get; set; }

        [NotMapped]
        public int Nights => (int)Math.Max(0, (CheckOut - CheckIn).TotalDays);
    }
}
