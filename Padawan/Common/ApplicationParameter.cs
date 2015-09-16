using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Padawan.Common
{
    public class ApplicationParameter
    {
        public static bool RunSpecs
        {
            get
            {
                return ConfigurationManager.AppSettings["RunSpecs"] == "1";
            }
        }
    }
}