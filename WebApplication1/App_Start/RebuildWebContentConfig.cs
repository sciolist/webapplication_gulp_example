using System;
using System.Diagnostics;
using System.IO;

namespace WebApplication1
{
    public class RebuildWebContentConfig
    {
        private readonly object _lock = new object();
        private DateTime _lastRebuilt;

        public static void Register()
        {
            new RebuildWebContentConfig().WatchForChanges();
        }

        public void WatchForChanges()
        {
            var contentWatcher = new FileSystemWatcher(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Content"));
            contentWatcher.IncludeSubdirectories = true;
            contentWatcher.Changed += Rebuild;
            contentWatcher.EnableRaisingEvents = true;
        }

        private void Rebuild(object watchSender, FileSystemEventArgs evt)
        {
            var minInterval = TimeSpan.FromSeconds(1);
            if (DateTime.Now - _lastRebuilt < minInterval) return;
            lock (_lock)
            {
                if (DateTime.Now - _lastRebuilt < minInterval) return;
                try
                {

                    var info = new ProcessStartInfo();
                    info.WorkingDirectory = AppDomain.CurrentDomain.BaseDirectory;
                    info.FileName = string.Format(@"cmd");
                    info.Arguments = @"/c .bin\npm.cmd run rebuild";
                    info.UseShellExecute = false;
                    info.CreateNoWindow = true;
                    info.RedirectStandardError = true;

                    var process = new Process();
                    process.StartInfo = info;
                    process.Start();
                    process.WaitForExit();
                    var errorMessage = process.StandardError.ReadToEnd();
                    Console.WriteLine(errorMessage);
                }
                finally
                {
                    _lastRebuilt = DateTime.Now;
                }
            }
        }
    }
}
