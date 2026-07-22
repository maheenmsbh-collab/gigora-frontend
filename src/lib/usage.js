const KEY = "gigora-daily-usage";
const LIMIT = 5;
const today = () => new Date().toISOString().slice(0, 10);

export function getRemainingUses() {
  const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  return Math.max(0, LIMIT - (saved.date === today() ? saved.count : 0));
}

export function recordUse() {
  const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
  const count = saved.date === today() ? saved.count + 1 : 1;
  localStorage.setItem(KEY, JSON.stringify({ date: today(), count }));
  window.dispatchEvent(new Event("gigora-usage-change"));
  return Math.max(0, LIMIT - count);
}
