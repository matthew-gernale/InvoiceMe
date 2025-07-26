using System.Globalization;

namespace InvoiceMe.Server.Utilities
{
    public class TimeUtils
    {

        private static readonly TimeZoneInfo PhilippineTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Asia/Manila");

        public static DateTime PHTime() => TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, PhilippineTimeZone);

        public static DateTime ToPHTime(DateTime? dateTime)
        {
            if (!dateTime.HasValue)
                return PHTime();

            var phNow = PHTime();

            var localDateWithPHTime = new DateTime(
                dateTime.Value.Year,
                dateTime.Value.Month,
                dateTime.Value.Day,
                phNow.Hour,
                phNow.Minute,
                phNow.Second,
                DateTimeKind.Unspecified
            );

            return TimeZoneInfo.ConvertTime(localDateWithPHTime, PhilippineTimeZone);
        }

        public static DateTime StartOfWeek()
        {
            var today = PHTime().Date;
            int diff = (today.DayOfWeek == DayOfWeek.Sunday ? 6 : (int)today.DayOfWeek - 1); // Monday as start
            return today.AddDays(-diff);
        }

        public static DateTime EndOfWeek() => StartOfWeek().AddDays(6);

        public static DateTime StartOfMonth() => new DateTime(PHTime().Year, PHTime().Month, 1);

        public static DateTime EndOfMonth() => StartOfMonth().AddMonths(1).AddDays(-1);

        public static DateTime StartOfYear() => new DateTime(PHTime().Year, 1, 1);

        public static DateTime EndOfYear() => new DateTime(PHTime().Year, 12, 31);

        public static int GetWeekNumber(DateTime date)
        {
            return CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstFullWeek, DayOfWeek.Monday);
        }
        public static string GetTimeElapsed(DateTime? dateCreated)
        {
            if (dateCreated == null) return string.Empty;

            TimeSpan timeSpan = PHTime() - dateCreated.Value;
            if (timeSpan.TotalMinutes < 1)
            {
                return $"{timeSpan.Seconds} seconds ago";
            }
            if (timeSpan.TotalHours < 1)
            {
                return $"{timeSpan.Minutes} minutes ago";
            }
            if (timeSpan.TotalDays < 1)
            {
                return $"{timeSpan.Hours} hours ago";
            }
            return $"{timeSpan.Days} days ago";
        }
    }
}
