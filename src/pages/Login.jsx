import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../contexts/AuthContext";
import { showSuccess, showError } from "../lib/toast";

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  

  const normalizeEmail = (value) =>
    value.trim().replace(/^"|"$/g, "").toLowerCase();

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailLogin = async (event) => {
    event.preventDefault();

    
    if (loading) return;

    if (!email.trim() || !password.trim()) {
      showError("Please enter both email and password.");
      return;
    }

    const normalizedEmail = normalizeEmail(email);

    if (!isValidEmail(normalizedEmail)) {
      showError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await login(
        normalizedEmail,
        password
      );

      if (error) throw error;
showSuccess("Login successful!");

setTimeout(() => {
  navigate("/dashboard");
}, 1000);
    } catch (err) {
  showError(err.message || "Login failed.");
} finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    

    try {
      const { error } = await googleLogin();

      if (error) throw error;
    } catch (err) {
  showError(err.message || "Google login failed.");
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">

        <section className="rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:p-10">

          <div className="mb-10 max-w-xl">
            <span className="inline-flex rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-700">
              Secure access
            </span>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Login to Gigora
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Enter your credentials or continue with Google to access your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>

          <div className="relative my-8 text-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />

            <span className="relative inline-block bg-white px-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              or use your email
            </span>
          </div>

          <form
            className="space-y-6"
            onSubmit={handleEmailLogin}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                placeholder="Enter your password"
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
                      </form>

        

      

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign up
            </Link>
          </p>
        </section>

        <aside className="hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-700 p-10 text-white shadow-[0_30px_80px_rgba(15,23,42,0.16)] lg:block">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">
                Designed for modern teams
              </p>

              <h2 className="mt-4 text-3xl font-semibold">
                Fast, secure login flows.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-200">
                Gigora provides a polished authentication experience powered by
                Supabase with secure email/password login and Google OAuth.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Responsive
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Optimized for desktop, tablet, and mobile devices.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Secure Authentication
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  Email/password login with Supabase Auth and optional Google
                  Sign-In.
                </p>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}