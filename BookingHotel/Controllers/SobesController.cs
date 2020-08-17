using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookingHotel.Data;
using BookingHotel.Models;

namespace BookingHotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class SobesController : ControllerBase
    {
        private readonly RezervacijeContext _context;

        public SobesController(RezervacijeContext context)
        {
            _context = context;
        }

        // GET: api/Sobes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sobe>>> GetSobe()
        {
            return await _context.Sobe.ToListAsync();
        }

        // GET: api/Sobes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sobe>> GetSobe(int id)
        {
            var sobe = await _context.Sobe.FindAsync(id);

            if (sobe == null)
            {
                return NotFound();
            }

            return sobe;
        }

        // PUT: api/Sobes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSobe(int id, Sobe sobe)
        {

            if (id != sobe.SobeId)
            {
                return BadRequest();
            }
            if (sobe.BrojSobe < 1)
            {
                return Conflict(new { message = $"Broj sobe mora biti pozitivan broj!" });
            }            
            Sobe test = _context.Sobe.Where(a => a.BrojSobe == sobe.BrojSobe && a.SobeId == id).FirstOrDefault();

            //foreach (Sobe s in _context.Sobe)
            //{
            //    if ((s.SobeId == sobe.SobeId) && (sobe.BrojSobe == s.BrojSobe))
            //    {
            //        istasoba = true;
            //        break;
            //    }
            //}    
            
            if (test!=null)
            {
                test.TipSobe = sobe.TipSobe;
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                if (SobeExists(sobe.BrojSobe))
                    return Conflict(new { message = $"Soba s brojem '{sobe.BrojSobe}' već postoji!" });
                else
                {
                    Sobe soba2 = _context.Sobe.Where(p => p.SobeId == sobe.SobeId).FirstOrDefault();
                    soba2.BrojSobe = sobe.BrojSobe;
                    soba2.TipSobe = sobe.TipSobe;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }       

        }

        // POST: api/Sobes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Sobe>> PostSobe(Sobe sobe)
        {
            if (SobeExists(sobe.BrojSobe))
            {
                return Conflict(new { message = $"Soba s brojem '{sobe.BrojSobe}' već postoji!" });

            }
            else if (sobe.BrojSobe < 1)
            {
                return Conflict(new { message = $"Broj sobe mora biti pozitivan broj!" });

            }
            _context.Sobe.Add(sobe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSobe", new { id = sobe.SobeId }, sobe);
        }

        // DELETE: api/Sobes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sobe>> DeleteSobe(int id)
        {
            var sobe = await _context.Sobe.FindAsync(id);
            if (sobe == null)
            {
                return NotFound();
            }

            _context.Sobe.Remove(sobe);
            await _context.SaveChangesAsync();

            return sobe;
        }

        private bool SobeExists(int id)
        {
            return _context.Sobe.Any(e => e.BrojSobe == id);
        }
    }
}
