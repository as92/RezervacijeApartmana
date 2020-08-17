using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BookingHotel.Models;

namespace BookingHotel.Data
{
    public class RezervacijeContext : DbContext
    {
        public RezervacijeContext (DbContextOptions<RezervacijeContext> options)
            : base(options)
        {
        }

        public DbSet<BookingHotel.Models.Rezervacije> Rezervacije { get; set; }
        public DbSet<BookingHotel.Models.Sobe> Sobe { get; set; }
    }
}
