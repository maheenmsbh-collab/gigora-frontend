import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const submittingRef = useRef(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const normalizeEmail = (value) =>
    value.trim().replace(/^"|"$/g, "").toLowerCase();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignup = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (loading || submittingRef.current) return;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please enter your name, email, and password.");
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    console.log("Original:", email);
console.log("Normalized:", normalizedEmail);
console.log("JSON:", JSON.stringify(normalizedEmail));
console.log("Length:", normalizedEmail.length);

    if (!isValidEmail(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    submittingRef.current = true;

    try {
      // const { error } = await signup(
      //   name,
      //   normalizedEmail,
      //   password
      // );

      // if (error) throw error;
      const result = await signup(
  name,
  normalizedEmail,
  password
);

console.log(result);

if (result.error) {
  throw result.error;
}

      setMessage(
        "Account created successfully! Please check your email to verify your account."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">

        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-10">

          <div className="mb-10 max-w-xl">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-700">
              Start free
            </span>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Create your Gigora account
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Sign up and start managing your freelance workspace.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleSignup}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
                      </form>

          {message && (
            <div
              className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              role="status"
              aria-live="polite"
            >
              {message}
            </div>
          )}

          {error && (
            <div
              className="mt-6 rounded-3xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              Log in
            </Link>
          </p>
        </section>

        <aside className="hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-emerald-900 to-slate-700 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] lg:block">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">
                Built for Freelancers
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Start growing with Gigora.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-200">
                Create your account to access AI-powered freelance tools,
                optimize your gigs, generate better proposals, and manage your
                dashboard from one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Secure Signup
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Powered by Supabase Authentication with email verification.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Modern UI
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Responsive design optimized for desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}