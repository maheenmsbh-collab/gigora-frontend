import { FiCheckCircle, FiKey, FiMail, FiSave } from "react-icons/fi";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../contexts/AuthContext";
import useProfile from "../hooks/useProfile";
import { showError, showSuccess } from "../lib/toast";
import { getUserDisplayName } from "../lib/getCurrentUser";

const formatDate = (date) => date ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(date)) : "Not available";

export default function Profile() {
  const { user } = useAuth();
  const { fullName, setFullName, isSaving, saveName, sendPasswordReset } = useProfile(user);
  const displayName = fullName || getUserDisplayName(user);
  const provider = user?.app_metadata?.provider || "email";
  const initials = displayName.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  const handleSave = async (event) => {
    event.preventDefault();
    if (!fullName.trim()) {
      showError("Please enter your full name.");
      return;
    }
    try {
      await saveName();
      showSuccess("Profile updated successfully.");
    } catch {
      showError("Unable to update your profile right now.");
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset();
      showSuccess("Password reset instructions have been sent to your email.");
    } catch {
      showError("Unable to send password reset instructions.");
    }
  };

  const summaryItems = [
    ["Member Since", formatDate(user?.created_at)],
    ["Last Login", formatDate(user?.last_sign_in_at)],
    ["Email Verified", user?.email_confirmed_at ? "Verified" : "Not verified"],
    ["Authentication Method", provider.charAt(0).toUpperCase() + provider.slice(1)],
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-600 text-2xl font-bold text-white">{initials || "U"}</div>
          <div><p className="text-xs uppercase tracking-[0.3em] text-indigo-600">Account</p><h1 className="mt-2 text-3xl font-bold text-slate-900">{displayName}</h1><p className="mt-1 flex items-center gap-2 text-sm text-slate-500"><FiMail />{user?.email}</p></div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileCard title="Profile Details">
          <form className="space-y-5" onSubmit={handleSave}>
            <label className="block text-sm font-medium text-slate-700">Full Name<input value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" /></label>
            <label className="block text-sm font-medium text-slate-700">Email<input value={user?.email || ""} readOnly className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500" /></label>
            <button disabled={isSaving} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"><FiSave />{isSaving ? "Saving..." : "Save Changes"}</button>
          </form>
        </ProfileCard>

        <ProfileCard title="Account Summary">
          <dl className="space-y-4">{summaryItems.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"><dt className="text-sm text-slate-500">{label}</dt><dd className="text-right text-sm font-medium text-slate-800">{label === "Email Verified" && user?.email_confirmed_at && <FiCheckCircle className="mr-1 inline text-emerald-500" />}{value}</dd></div>)}</dl>
        </ProfileCard>
      </div>

      <ProfileCard title="Security">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="flex items-center gap-2 font-medium text-slate-800"><FiKey />Change Password</p><p className="mt-1 text-sm text-slate-500">We will send reset instructions to {user?.email}.</p></div><button type="button" onClick={handlePasswordReset} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Send Reset Email</button></div>
      </ProfileCard>
    </div>
  );
}
