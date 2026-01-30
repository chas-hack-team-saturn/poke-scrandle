using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    [Index("Name", Name = "UX_Pokemon_Name")]
    public class Pokemon
    {
        [Key]
        public int DexId { get; set; }

        public string Name { get; set; } = null!;

        [Column(TypeName = "VARCHAR(2083)")]
        public string Url { get; set; } = null!;

        public int Votes { get; set; } 
    }
}
