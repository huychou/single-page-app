using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ApiAngular.Models;

namespace ApiAngular.Controllers
{
    public class MusicsController : ApiController
    {
        private readonly MusicDb _db = new MusicDb();

        // GET: api/Musics  
        public IQueryable<Music> GetMusics()
        {
            return _db.Musics;
        }

        // GET: api/Musics/5  
        [ResponseType(typeof(Music))]
        public IHttpActionResult GetMusic(int id)
        {
            var music = _db.Musics.Find(id);
            if (music == null)
            {
                return NotFound();
            }

            return Ok(music);
        }

        // PUT: api/Musics/5  
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMusic(int id, Music music)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != music.Id)
            {
                return BadRequest();
            }

            _db.Entry(music).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MusicExists(id))
                {
                    return NotFound();
                }
                throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Musics  
        [ResponseType(typeof(Music))]
        public IHttpActionResult PostMusic(Music music)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Musics.Add(music);
            _db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = music.Id }, music);
        }

        // DELETE: api/Musics/5  
        [ResponseType(typeof(Music))]
        public IHttpActionResult DeleteMusic(int id)
        {
            var music = _db.Musics.Find(id);
            if (music == null)
            {
                return NotFound();
            }

            _db.Musics.Remove(music);
            _db.SaveChanges();

            return Ok(music);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MusicExists(int id)
        {
            return _db.Musics.Count(e => e.Id == id) > 0;
        }
    }
}