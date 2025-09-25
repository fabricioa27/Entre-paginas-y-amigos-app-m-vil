using System.ComponentModel.DataAnnotations;

namespace SunsetParadise.Models
{
    public class Client
    {
        [Key]  // Asegúrate de que esta anotación esté presente
        [Required, StringLength(10, MinimumLength = 9)]  // La longitud del DUI, y la validación de requisitos
        public string DUI { get; set; } = "";

        [Required, StringLength(80)]  // Nombre del cliente
        public string Name { get; set; } = "";

        [Required, Phone]  // Teléfono del cliente
        public string Phone { get; set; } = "";
    }
}

