using System.Web;
using System.Web.Optimization;

namespace Padawan
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {


            #region CDN Scripts
            var jquery = new ScriptBundle("~/bundles/jquery", "https://code.jquery.com/jquery-2.1.1.min.js").Include(
                        "~/Scripts/lib/jquery-2.1.1.min.js");
            jquery.CdnFallbackExpression = "$";
            bundles.Add(jquery);

            var bundle = new ScriptBundle("~/bundles/angular", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular.min.js").Include(
                        "~/Scripts/lib/angular/angular.min.js");
            bundle.CdnFallbackExpression = "window.angular";
            bundles.Add(bundle);

            bundle = new ScriptBundle("~/bundles/angular-sanitize", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-sanitize.min.js").Include(
                "~/Scripts/lib/angular/angular-sanitize.min.js");
            bundle.CdnFallbackExpression = angularModuleCheck("ngSanitize");
            bundles.Add(bundle);

            bundle = new ScriptBundle("~/bundles/angular-mocks", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-mocks.min.js").Include(
                "~/Scripts/lib/angular/angular-mocks.min.js");
            bundle.CdnFallbackExpression = angularModuleCheck("ngMocks");
            bundles.Add(bundle);

            bundle = new ScriptBundle("~/bundles/angular-route", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-route.min.js").Include(
                "~/Scripts/lib/angular/angular-route.min.js");
            bundle.CdnFallbackExpression = angularModuleCheck("ngRoute");
            bundles.Add(bundle);

            bundle = new ScriptBundle("~/bundles/angular-resource", "https://ajax.googleapis.com/ajax/libs/angularjs/1.3.10/angular-resource.min.js").Include(
                "~/Scripts/lib/angular/angular-resource.min.js");
            bundle.CdnFallbackExpression = angularModuleCheck("ngResource");
            bundles.Add(bundle);

            bundle = new ScriptBundle("~/bundles/require", "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.16/require.min.js").Include(
                "~/Scripts/lib/require.js");
            bundle.CdnFallbackExpression = "require";
            bundles.Add(bundle);


            #endregion

            bundle = new ScriptBundle("~/bundles/jasmine")
            .Include("~/scripts/lib/jasmine/jasmine.js")
            .Include("~/scripts/lib/jasmine/jasmine-html.js")
            .Include("~/scripts/lib/jasmine/boot.js");
            bundles.Add(bundle);

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/Site.css",
                "~/Content/TodoList.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));


        }

        private static string angularModuleCheck(string module)
        {
            return @"(function() { try {  window.angular.module('" + module + "');} catch(e) {return false;}return true; })()";
        }
    }
}