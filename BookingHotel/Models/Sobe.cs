using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookingHotel.Models
{
    public class Sobe
    {
		[Key]
		public int SobeId { get; set; }

		[Required]
		public int BrojSobe { get; set; }

		[Required]
		public string TipSobe { get; set; }


	}
}
