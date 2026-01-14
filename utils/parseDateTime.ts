export function parseDateTime(date: string, time: string) {
  const [rawTime, modifier] = time.split(" "); // "7:30", "PM"
  let [hours, minutes] = rawTime.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return new Date(`${date}T${String(hours).padStart(2, "0")}:${minutes}:00`);
}

export function isToday(date: string) {
  const parsedDate = new Date(date);
  const today = new Date();

  return (
    parsedDate.getDate() === today.getDate() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getFullYear() === today.getFullYear()
  );
}
