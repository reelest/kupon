export function formatPhoneNumber(number_string) {
  const [failed, countryCode, ...parts] = String(number_string ?? "").split(
    /^(\+\d\d\d)?(\d\d\d)?(?:(\d\d\d)?(\d\d\d)?|(\d?\d\d\d)?(\d\d\d)?)(\d\d\d\d?)?$/
  );
  if (failed.length) return failed;
  return (
    (countryCode ? countryCode + " " : "") + parts.filter(Boolean).join("-")
  );
}

export function formatNumber(number_string) {
  const parts = String(number_string ?? "").split(
    /^(\d\d?)?(?:(\d\d\d)(?:(\d\d\d)(?:(\d\d\d)(?:(\d\d\d))?)?)?)?$/
  );
  return parts.filter(Boolean).join(",");
}
const timeFormat = (format) => (/** @type {Date}*/ date) => {
  return format
    .replace("%-I", String(date.getHours() % 12).padStart(2, "0"))
    .replace("%M", date.getMinutes())
    .replace("%p", date.getHours() >= 12 ? "pm" : "am")
    .replace("%e", date.getDate())
    .replace("%m", date.getMonth())
    .replace("%Y", date.getFullYear());
};
export const formatTime = timeFormat("%-I:%M%p");
export const formatDate = timeFormat("%e/%m/%Y");
