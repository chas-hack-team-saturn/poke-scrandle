using System;
using System.Collections.Generic;

namespace BackendAPI.Models;

public partial class Pokemon
{
    public int DexId { get; set; }

    public string Name { get; set; } = null!;

    public int? Votes { get; set; }
}
