using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookingHotel.Data;
using BookingHotel.Models;
using Nest;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace BookingHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class RezervacijesController : ControllerBase
    {
        private readonly RezervacijeContext _context;
        //private readonly SobeContext _contextSobe;

        public RezervacijesController(RezervacijeContext context)
        {
            _context = context;

        }

        // GET: api/Rezervacijes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rezervacije>>> GetRezervacije()
        {
            return await _context.Rezervacije.ToListAsync();

        }

        // GET: api/Rezervacijes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rezervacije>> GetRezervacije(int id)
        {
            var rezervacije = await _context.Rezervacije.FindAsync(id);

            if (rezervacije == null)
            {
                return NotFound();
            }

            return rezervacije;
        }

        // PUT: api/Rezervacijes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRezervacije(int id, Rezervacije rezervacije)
        {
            var setRezervacija = _context.Rezervacije.Where(a => (a.BrojSobe == rezervacije.BrojSobe && a.RezervacijeId != rezervacije.RezervacijeId)).ToList();

            if (id != rezervacije.RezervacijeId)
            {
                return BadRequest();
            }
            if (!SobeExists(rezervacije.BrojSobe))
            {
                return Conflict(new { message = $"Soba broj '{rezervacije.BrojSobe}' ne postoji, molimo osvježite stranicu!" });

            }
            else
            {
                //foreach (Rezervacije rez in _context.Rezervacije)
                //{
                //    if ((rez.RezervacijeId != id) && (rez.BrojSobe == rezervacije.BrojSobe))
                //    {
                //          if (ProvjeriDatum(rezervacije.DatumDolaska, rezervacije.DatumOdlaska, rez.DatumDolaska, rez.DatumOdlaska))
                //            {
                //                datum = false;
                //            }                        
                //    }                    
                //}
                if (setRezervacija.Count() > 0)
                {
                    foreach (Rezervacije rez in setRezervacija)
                    {
                        if (rez.BrojSobe == rezervacije.BrojSobe)
                        {

                            if (ProvjeriDatum(rezervacije.DatumDolaska, rezervacije.DatumOdlaska, rez.DatumDolaska, rez.DatumOdlaska))
                            {
                                return Conflict(new { message = $"Datum nove rezervacije se podudara s prijašnjim rezervacijama u sobi broj '{rezervacije.BrojSobe}'!" });
                            }

                        }
                    }
                }
            }
            //_context.Entry(rezervacije).State = EntityState.Modified;     
            Rezervacije r = _context.Rezervacije.Where(p => p.RezervacijeId == rezervacije.RezervacijeId).FirstOrDefault();
            r.BrojSobe = rezervacije.BrojSobe;
            r.DatumDolaska = rezervacije.DatumDolaska.ToLocalTime();
            r.DatumOdlaska = rezervacije.DatumOdlaska.ToLocalTime();
            r.ImeGosta = rezervacije.ImeGosta;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRezervacije", new { id = rezervacije.RezervacijeId }, rezervacije);
        }

        // POST: api/Rezervacijes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Rezervacije>> PostRezervacije(Rezervacije rezervacije)
        {
            var setRezervacija = _context.Rezervacije.Where(a => a.BrojSobe == rezervacije.BrojSobe).ToList();
            if (SobeExists(rezervacije.BrojSobe))
            {
                //foreach (Rezervacije rez in _context.Rezervacije)
                //{
                //    if (rez.BrojSobe == rezervacije.BrojSobe)
                //    {

                //        if (ProvjeriDatum(rezervacije.DatumDolaska, rezervacije.DatumOdlaska, rez.DatumDolaska, rez.DatumOdlaska))
                //        {
                //            tocandatum = false;
                //        }

                //    }

                //}
                foreach (Rezervacije rez in setRezervacija)
                {
                    if (rez.BrojSobe == rezervacije.BrojSobe)
                    {

                        if (ProvjeriDatum(rezervacije.DatumDolaska, rezervacije.DatumOdlaska, rez.DatumDolaska, rez.DatumOdlaska))
                        {
                            return Conflict(new { message = $"Datum nove rezervacije se podudara s prijašnjim rezervacijama u sobi broj '{rezervacije.BrojSobe}'!" });

                        }

                    }
                }

            }
            else
            {
                return Conflict(new { message = $"Soba s brojem '{rezervacije.BrojSobe}' ne postoji, molimo osvježite stranicu!" });
            }

            rezervacije.DatumDolaska = rezervacije.DatumDolaska.ToLocalTime();
            rezervacije.DatumOdlaska = rezervacije.DatumOdlaska.ToLocalTime();
            _context.Rezervacije.Add(rezervacije);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetRezervacije", new { id = rezervacije.RezervacijeId }, rezervacije);



        }

        // DELETE: api/Rezervacijes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Rezervacije>> DeleteRezervacije(int id)
        {
            var rezervacije = await _context.Rezervacije.FindAsync(id);
            if (rezervacije == null)
            {
                return NotFound();
            }

            _context.Rezervacije.Remove(rezervacije);
            await _context.SaveChangesAsync();

            return rezervacije;
        }

        private bool RezervacijeExists(int id)
        {
            return _context.Rezervacije.Any(e => e.BrojSobe == id);
        }
        private bool SobeExists(int id)
        {
            return _context.Sobe.Any(e => e.BrojSobe == id);
        }
        private bool ProvjeriDatum(DateTime datumd, DateTime datumo, DateTime dolazak, DateTime odlazak)
        {
            return ((datumd >= dolazak && datumd < odlazak) || (datumo >= dolazak && datumo < odlazak) || (datumd < dolazak && datumo >= odlazak));
        }
    }

}
