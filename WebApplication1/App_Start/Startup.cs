namespace WebApplication1
{
    public class Startup
    {
        public static void Run()
        {
#if DEBUG
            RebuildWebContentConfig.Register();
#endif
        }
    }
}