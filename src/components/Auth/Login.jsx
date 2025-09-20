import React, { useState, useEffect, useRef } from "react";

const Login = ({ handleLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bioAuthStatus, setBioAuthStatus] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Camera stream
  useEffect(() => {
    if (videoRef.current && stream) videoRef.current.srcObject = stream;
  }, [stream]);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  // Mouse move for background gradient
  useEffect(() => {
    const move = (e) =>
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const demoCreds = [
    { label: "Admin", email: "admin@example.com", pass: "123", color: "emerald" },
    { label: "Employee", email: "e@e.com", pass: "123", color: "cyan" },
  ];

  // ----- BIO AUTH -----
  const handleFingerprint = async () => {
    if (!window.PublicKeyCredential) return setBioAuthStatus("❌ WebAuthn not supported");
    try {
      setBioAuthStatus("🔍 Scanning fingerprint...");
      await navigator.credentials.get({ publicKey: { challenge: new Uint8Array(32), userVerification: "required" } });
      setBioAuthStatus("✅ Fingerprint authenticated!");
    } catch {
      setBioAuthStatus("❌ Fingerprint failed");
    }
  };

  const handleFaceID = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setShowCamera(true);
      setBioAuthStatus("📷 Camera active - Face Scan...");
    } catch {
      setBioAuthStatus("❌ Camera access denied");
    }
  };

  // ----- FORM SUBMIT -----
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      handleLogin(email, password);
      setEmail("");
      setPassword("");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 overflow-hidden">
      
    {/* Back to Home Button */}
<div className="fixed top-6 left-6 z-50">
  <button
    onClick={() => (window.location.href = "/")}
    className="px-6 py-3 text-lg bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md shadow-lg transition"
  >
    ← Back to Home
  </button>
</div>



      {/* Moving Gradient Blobs */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 top-[-10%] left-[-10%] bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-full blur-3xl animate-blob opacity-70"></div>
        <div className="absolute w-80 h-80 bottom-[-10%] right-[-10%] bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-70"></div>
        <div className="absolute w-64 h-64 top-1/3 left-1/2 bg-gradient-to-r from-orange-400 via-pink-500 to-red-400 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-70"></div>
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.1), transparent 70%)`,
            }}
          />
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/40 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md z-20">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition" />
          <div className="relative bg-black/70 backdrop-blur-3xl border border-white/20 rounded-3xl p-8">
            
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                <span className="text-3xl animate-pulse">⚡</span>
              </div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-white/80">Sign in to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="w-full px-6 py-4 pr-12 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:scale-105 transition disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Bio Auth */}
            <div className="flex justify-center space-x-4 pt-6">
              <button
                onClick={handleFingerprint}
                className="flex flex-col items-center p-4 bg-white/10 hover:bg-emerald-500/20 rounded-xl transition hover:scale-110"
              >
                <span className="text-2xl">👆</span>
                <span className="text-xs text-white/60">Fingerprint</span>
              </button>
              <button
                onClick={handleFaceID}
                className="flex flex-col items-center p-4 bg-white/10 hover:bg-blue-500/20 rounded-xl transition hover:scale-110"
              >
                <span className="text-2xl">📷</span>
                <span className="text-xs text-white/60">Face ID</span>
              </button>
            </div>

            {showCamera && (
              <video ref={videoRef} autoPlay playsInline className="w-full mt-4 h-48 rounded-xl border border-white/20" />
            )}

            {/* Demo creds */}
            <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-400/20 text-xs">
              <p className="text-emerald-400 font-semibold mb-2">Demo Credentials</p>
              {demoCreds.map((c, i) => (
                <div key={i} className="flex justify-between text-white/80">
                  <span>{c.label}:</span>
                  <span className={`font-mono text-${c.color}-300`}>
                    {c.email} / {c.pass}
                  </span>
                </div>
              ))}
            </div>

            {/* Signup */}
            <div className="text-center mt-8 pt-6 border-t border-white/20">
              <p className="text-white/60 mb-3">Don't have an account?</p>
              <button onClick={onSwitchToSignup} className="text-cyan-400 hover:text-cyan-300 font-semibold text-lg">
                Create Account →
              </button>
            </div>

            {bioAuthStatus && <p className="text-center mt-4 text-sm text-purple-400">{bioAuthStatus}</p>}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(40px,-30px) scale(1.2); }
          66% { transform: translate(-30px,30px) scale(0.9); }
        }
        .animate-blob { animation: blob 12s infinite; }
        .animation-delay-2000 { animation-delay:2s; }
        .animation-delay-4000 { animation-delay:4s; }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float { animation: float 10s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Login;
