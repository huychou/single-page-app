using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ApiAngular.Models
{
    public class Music
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Singers { get; set; }
        public int RunTime { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}