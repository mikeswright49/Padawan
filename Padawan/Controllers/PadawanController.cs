using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Padawan.Controllers
{
    public class PadawanController : Controller
    {
        //
        // GET: /Padawan/

        public ActionResult Index()
        {
            return View();
        }
        public string Application(string id, string application)
        {
            ViewBag.Application = application;
            var dataSet = new
            {
                Template = this.RenderView(id, new { Application = application}),
                Controllers = new string[2]{"nestedAppController", "aBrandNewController"}
            };
            return JsonConvert.SerializeObject(dataSet);
        }
        public ActionResult Partial(string id)
        {
            if (String.IsNullOrEmpty(id))
                throw new ArgumentNullException("id");
            if (id.Contains("."))
                id = id.Substring(0, id.IndexOf('.'));
            return PartialView(string.Format("~/Views/partial/_{0}.cshtml", id));
        }
    }
}
