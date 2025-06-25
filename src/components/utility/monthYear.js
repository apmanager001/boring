export function monthYear(timestamp) {
  const date = new Date(timestamp);
  const options = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

export function formatFullDate(timestamp) {
  const date = new Date(timestamp);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}