using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Padawan.Api
{
    [RoutePrefix("api/data")]
    public class DataController : ApiController
    {
        [HttpGet]
        [Route("page/{id}")]
        public object GetPageContent(string id)
        {
            id = id.Replace(" ", "").Replace("-", "");
            var path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase);

            path = path.Substring(path.IndexOf("C:"), path.LastIndexOf("\\") - path.IndexOf("C:")) + "\\Data\\";
            string allText = System.IO.File.ReadAllText(path+id+".json");

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }
        [HttpGet]
        [Route("article/{id}")]
        public object GetArticleContent(string id)
        {
            id = id.Replace(" ", "").Replace("-", "");
            var path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase);

            path = path.Substring(path.IndexOf("C:"), path.LastIndexOf("\\") - path.IndexOf("C:")) + "\\Data\\article\\";
            string allText = System.IO.File.ReadAllText(path + id + ".json");

            object jsonObject = JsonConvert.DeserializeObject(allText);
            return jsonObject;
        }
    }
}
