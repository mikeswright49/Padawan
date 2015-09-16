using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Diagnostics;
using System.Linq;
namespace Padawan.Javascript.Test
{
    [TestClass]
    public class JasmineTests
    {
        [TestMethod]
        public void JasmineSpec()
        {
            ProcessStartInfo start = new ProcessStartInfo();

            var path = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().GetName().CodeBase);
            var enviromentPath = System.Environment.GetEnvironmentVariable("PATH");

            var pathLocations = enviromentPath.Split(';');
            var nodePath = pathLocations.Where(x => x.Contains("npm")).First();
            var directory = path.Substring(path.IndexOf("C:"), path.LastIndexOf("\\bin") - path.IndexOf("C:"));
            start.Arguments = nodePath + @"\node_modules\karma-cli\bin\karma start --single-run --browsers PhantomJS";
            start.FileName = "node";
            start.WorkingDirectory = directory;
            start.WindowStyle = ProcessWindowStyle.Hidden;
            start.RedirectStandardOutput = true;
            start.UseShellExecute = false;
            start.CreateNoWindow = true;
            int exitCode = 0;
            string output = "";
            using (Process chutzpah = Process.Start(start))
            {
                output = chutzpah.StandardOutput.ReadToEnd();
                chutzpah.WaitForExit();
                exitCode = chutzpah.ExitCode;
            }
            Assert.IsTrue(!string.IsNullOrEmpty(output) && !output.Contains("TypeError"));
            System.Diagnostics.Debug.Write(output);
            Assert.AreEqual(exitCode, 0);
        }
    }
}
