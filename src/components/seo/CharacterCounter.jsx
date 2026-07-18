export default function CharacterCounter({
  current,
  max,
}) {
  const percentage = (current / max) * 100;

  let color = "text-slate-500";

  if (percentage > 90) {
    color = "text-red-600";
  } else if (percentage > 75) {
    color = "text-amber-600";
  }

  return (
    <div className={`mt-2 text-right text-xs font-medium ${color}`}>
      {current} / {max} characters
    </div>
  );
}