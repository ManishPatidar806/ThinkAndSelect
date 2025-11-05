import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/MainLoading";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const data = {
      email: event.target.email.value.trim(),
      password: event.target.password.value,
    };

    try {
      const response = await fetch(`${url}/v1/api/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responsedata = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(responsedata?.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", `Bearer ${responsedata.jwt}`);
      localStorage.setItem("fullname", responsedata.fullname || "");
      localStorage.setItem("domain", responsedata.domain || "");
      localStorage.setItem("place", responsedata.place || "");
      localStorage.setItem("description", responsedata.description || "");

      if (remember) {
        localStorage.setItem("remember", "1");
      }

      setIsLoading(false);
      navigate("/home");
    } catch (err) {
      setIsLoading(false);
      setError(err?.message || "Network error, please try again");
      console.error(err);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="glass-card rounded-3xl overflow-hidden modern-shadow-lg">
          <div className="flex flex-col md:flex-row">
            {/* Visual panel */}
            <div className="hidden md:flex md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dgmsfmeaz/image/upload/v1732387282/KnowledgeTest/ihbrodxnhb6u6kxbzs9h.jpg')" }}>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 md:p-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
                <p className="text-gray-600">Enter your credentials to continue</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="you@domain.com" />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <input id="password" name="password" type={showPassword ? 'text' : 'password'} required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Enter your password" />
                  <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-8 p-1 text-gray-500">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={remember} onChange={() => setRemember(r => !r)} className="w-4 h-4" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-primary">Forgot password?</a>
                </div>

                {error && <div role="alert" className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

                <Button type="submit" className="w-full py-3.5 font-semibold rounded-xl bg-primary text-white hover:shadow-lg" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                Don't have an account? <a href="/signup" className="text-primary font-medium">Create one</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
