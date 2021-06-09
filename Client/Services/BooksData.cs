using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using StaticWebApps.Client.Shared;

namespace StaticWebApps.Client.Services
{
    public class BooksData
    {
        public Dictionary<string, Book> BookDict { get; set; } = new Dictionary<string, Book>();
    }
}
