



import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "@/services/auth/authService";

export function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ username, password });
      navigate("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-full max-w-md bg-amber-50 border-4 border-slate-700 p-8 shadow-[8px_8px_0px_0px_rgba(51,65,85,1)]">
        <h2 className="text-3xl font-bold text-slate-700 mb-6 text-center border-b-4 border-slate-300 pb-2 italic">
          Admin Access
        </h2>

        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 mb-4 font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-bold italic" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="border-2 border-slate-700 p-2 focus:bg-amber-100 outline-none transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-700 font-bold italic" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border-2 border-slate-700 p-2 focus:bg-amber-100 outline-none transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-slate-700 text-white font-bold p-3 border-2 border-slate-700 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {loading ? "AUTHENTICATING..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}

