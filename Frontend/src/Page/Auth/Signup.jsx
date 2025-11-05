import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/MainLoading";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const url = import.meta.env.VITE_API_URL;

  const calcStrength = (pwd) => {
    let score = 0;
    if (!pwd) return 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score; // 0..4
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const fullname = event.target.fullname.value.trim();
    const domain = event.target.domain.value.trim();
    const email = event.target.email.value.trim();
    const place = event.target.place.value.trim();
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const description = event.target.description.value.trim();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (calcStrength(password) < 2) {
      setMessage("Please choose a stronger password (at least 8 chars, include numbers or symbols)");
      return;
    }

    setIsLoading(true);

    const data = { fullname, domain, email, place, password, description };

    try {
      const response = await fetch(`${url}/v1/api/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responsedata = await response.json();

      if (!response.ok) {
        setMessage(responsedata?.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", `Bearer ${responsedata.jwt}`);
      localStorage.setItem("fullname", responsedata.fullname || fullname);
      localStorage.setItem("domain", responsedata.domain || domain);
      localStorage.setItem("place", responsedata.place || place);
      localStorage.setItem("description", responsedata.description || description);

      setMessage("Registered successfully — redirecting...");
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      setMessage(error?.message || "Something went wrong. Please try again.");
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="glass-card rounded-3xl overflow-hidden modern-shadow-lg">
          <div className="flex flex-col lg:flex-row">
            {/* Illustration / left panel */}
            <div className="hidden lg:flex lg:w-2/5 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dgmsfmeaz/image/upload/v1730360938/KnowledgeTest/zxyeddspyhi9pxxkh3ws.jpg')" }}>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full lg:w-3/5 p-8 md:p-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
                <p className="text-gray-600">Join thousands of learners — free and easy sign up.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fullname" className="text-sm font-medium text-gray-700">Full name</label>
                  <input id="fullname" name="fullname" required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Your full name" />
                </div>
                <div>
                  <label htmlFor="domain" className="text-sm font-medium text-gray-700">Profession</label>
                  <input id="domain" name="domain" required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g., Software Developer" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="you@domain.com" />
                </div>
                <div>
                  <label htmlFor="place" className="text-sm font-medium text-gray-700">Location</label>
                  <input id="place" name="place" required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="City, Country" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div className="relative">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    onChange={(e) => setPasswordStrength(calcStrength(e.target.value))}
                    className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Create a strong password"
                  />
                  <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-8 p-1 text-gray-500">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm password</label>
                  <input id="confirmPassword" name="confirmPassword" type={showConfirm ? 'text' : 'password'} required className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Repeat password" />
                  <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-2 top-8 p-1 text-gray-500">
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width: `${(passwordStrength / 4) * 100}%` }} className={`h-full rounded-full transition-all ${passwordStrength <= 1 ? 'bg-red-400' : passwordStrength === 2 ? 'bg-yellow-400' : 'bg-green-500'}`} />
                </div>
                <p className="text-xs text-gray-500 mt-2">Password strength: {['Very weak','Weak','Medium','Strong','Very strong'][passwordStrength]}</p>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">About (optional)</label>
                <textarea id="description" name="description" rows={3} className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Tell us what you're learning or your goals" />
              </div>

              <div className="flex items-start gap-3 mb-4">
                <input id="terms" type="checkbox" required className="mt-1 w-4 h-4 text-primary rounded" />
                <label htmlFor="terms" className="text-sm text-gray-600">I agree to the <a href="#" className="text-primary font-medium">Terms</a> and <a href="#" className="text-primary font-medium">Privacy Policy</a></label>
              </div>

              {message && <div role="status" className={`mb-4 text-sm p-3 rounded ${message.toLowerCase().includes('success') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>{message}</div>}

              <Button type="submit" className="w-full py-3.5 font-semibold rounded-xl bg-primary text-white hover:shadow-lg" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Account'}
              </Button>

              <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account? <a href="/login" className="text-primary font-medium">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
