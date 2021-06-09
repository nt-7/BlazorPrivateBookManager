using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace StaticWebApps.Client.Shared
{
    public class Book
    {
        public string _id { get; set; }

        [JsonPropertyName("CId")]
        public string CId { get; set; }

        public string title { get; set; }
        public string subtitle { get; set; } = "";
        public List<string> authors { get; set; } = new List<string>();
        public string publishedDate { get; set; } = "";
        public string description { get; set; } = "";

        public string isbn10 { get; set; }

        public int status { get; set; } = 0;

        public string summary { get; set; } = "";
        public List<string> tweets { get; set; } = new List<string>();

        public string thumbnail { get; set; } = "";

        public DateTime createDate { get; set; }
        public DateTime updateDate { get; set; }

        // For Indexer
        public object this[string propertyName]
        {
            get
            {
                return typeof(Book).GetProperty(propertyName).GetValue(this);
            }

            set
            {
                typeof(Book).GetProperty(propertyName).SetValue(this, value);
            }
        }
    }
}
