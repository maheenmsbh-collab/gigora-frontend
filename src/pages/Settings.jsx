import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { PREFERENCES_KEY } from "../lib/constants";
import { showSuccess } from "../lib/toast";

const defaults = { darkMode: false, notifications: true, responseLength: "Balanced", proposalTone: "Professional" };

export default function Settings() {
  const [preferences, setPreferences] = useState(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(PREFERENCES_KEY)) }; }
    catch { return defaults; }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", preferences.darkMode);
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updatePreference = (key, value) => setPreferences((current) => ({ ...current, [key]: value }));
  const saveSettings = () => showSuccess("Settings saved successfully.");

  return <div className="mx-auto max-w-4xl space-y-6"><section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8"><p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Preferences</p><h1 className="mt-2 text-3xl font-bold text-slate-900">Settings</h1><p className="mt-2 text-slate-600">Personalize your Gigora workspace.</p></section><ProfileCard title="Workspace"><div className="space-y-5"><label className="flex cursor-pointer items-center justify-between gap-4"><span><span className="block font-medium text-slate-800">Dark Mode</span><span className="mt-1 block text-sm text-slate-500">Use a darker workspace appearance.</span></span><input type="checkbox" checked={preferences.darkMode} onChange={(event) => updatePreference("darkMode", event.target.checked)} className="h-5 w-5 accent-indigo-600" aria-label="Enable dark mode" /></label><label className="flex cursor-pointer items-center justify-between gap-4"><span><span className="block font-medium text-slate-800">Notifications</span><span className="mt-1 block text-sm text-slate-500">Show in-app updates for completed actions.</span></span><input type="checkbox" checked={preferences.notifications} onChange={(event) => updatePreference("notifications", event.target.checked)} className="h-5 w-5 accent-indigo-600" aria-label="Enable notifications" /></label></div></ProfileCard><ProfileCard title="AI Preferences"><div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-slate-700">AI Response Length<select value={preferences.responseLength} onChange={(event) => updatePreference("responseLength", event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"><option>Concise</option><option>Balanced</option><option>Detailed</option></select></label><label className="text-sm font-medium text-slate-700">Preferred Proposal Tone<select value={preferences.proposalTone} onChange={(event) => updatePreference("proposalTone", event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"><option>Professional</option><option>Friendly</option><option>Confident</option><option>Formal</option></select></label></div><button type="button" onClick={saveSettings} className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">Save Preferences</button></ProfileCard></div>;
}
