export function monthYear(timestamp) {
  const date = new Date(timestamp);
  const options = { month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
