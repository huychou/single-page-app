using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ApiAngular.Models
{
    public class MusicDb : DbContext
    {
        public DbSet<Music> Musics { get; set; }
    }
}