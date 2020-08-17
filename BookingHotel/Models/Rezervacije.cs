using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookingHotel.Models
{
    public class Rezervacije
    {
		[Key]
		public int RezervacijeId { get; set; }

		[Required]
		public int BrojSobe { get; set; }

		[Required]
		public string ImeGosta { get; set; }		

		[Required]
		public DateTime DatumDolaska { get; set; }

		[Required]
		public DateTime DatumOdlaska { get; set; }

		[ForeignKey("Sobe")]
		public Sobe Soba { get; set; }
	}
}
