using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace StaticWebApps.Client.Shared
{
    public class ClientObj
    {
        [JsonPropertyName("CId")]
        public string CId { get; set; }
    }
}
