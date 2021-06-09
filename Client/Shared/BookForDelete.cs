using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace StaticWebApps.Client.Shared
{
    public class BookForDelete
    {
        [JsonPropertyName("CId")]
        public string CId { get; set; }
        public string _id { get; set; }

    }
}
