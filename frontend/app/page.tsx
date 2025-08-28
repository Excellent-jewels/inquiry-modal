'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const images = [
  "/image2.jpg",
  "/image4.jpg",
  "/image6.jpg",
];

export default function LoginPage() {
  const [current, setCurrent] = useState(0);
  const [step, setStep] = useState<"login" | "forgot" | "otp" | "reset">("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Dummy handlers for demonstration
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to send OTP");
      }

      setStep("otp");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };



  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          otp: otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Invalid OTP");
      }

      setResetToken(data.reset_token);
      setStep("reset");
    } catch (err) {
      alert("Invalid or expired OTP");
      console.error(err);
    }
  };


  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resetToken,
          new_password: password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to reset password");
      }

      alert("Password reset successful!");
      setStep("login");
      setLoginEmail("");
      setOtp("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert("Reset failed");
      console.error(err);
    }
  };


  // Add this handler for sign in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password: password }), // use correct password state
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access_token); // store token
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem("userId", data.userId);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5E7EB] px-2">
      <div className="bg-white rounded-lg shadow-2xl flex flex-col-reverse md:flex-row w-full max-w-4xl md:max-w-6xl overflow-hidden">
        {/* Left: Login/Forgot/OTP/Reset Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-auto min-h-[400px] md:h-[600px] px-6 md:px-10 py-8 md:py-12 max-w-md mx-auto">
          {step === "login" && (
            <>
              <h2 className="text-2xl text-center font-bold mb-6">Sign In</h2>
              <form className="space-y-5" onSubmit={handleSignIn}>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={loginEmail}                             // ✅ bound to state
                    onChange={(e) => setLoginEmail(e.target.value)} // ✅ update state
                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={password}                             // ✅ bound to state
                    onChange={(e) => setPassword(e.target.value)} // ✅ update state
                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center text-sm mb-4 gap-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline text-right"
                    onClick={() => setStep("forgot")}
                  >
                    Forgot Password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Sign In
                </button>
              </form>
            </>
          )}

          {step === "forgot" && (
            <>
              <h2 className="text-2xl text-center font-bold mb-6">Forgot Password</h2>
              <form className="space-y-5" onSubmit={handleSendOtp}>
                <div>
                  <label className="block text-sm font-medium mb-2">Enter your email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Send OTP
                </button>
                <button
                  type="button"
                  className="w-full text-gray-600 py-2 rounded font-semibold hover:underline"
                  onClick={() => setStep("login")}
                >
                  Back to Sign In
                </button>
              </form>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl text-center font-bold mb-6">Enter OTP</h2>
              <form className="space-y-5" onSubmit={handleVerifyOtp}>
                <div>
                  <label className="block text-sm font-medium mb-2">OTP sent to {loginEmail}</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  className="w-full text-gray-600 py-2 rounded font-semibold hover:underline"
                  onClick={() => setStep("forgot")}
                >
                  Back
                </button>
              </form>
            </>
          )}

          {step === "reset" && (
            <>
              <h2 className="text-2xl text-center font-bold mb-6">Reset Password</h2>
              <form className="space-y-5" onSubmit={handleResetPassword}>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                >
                  Reset Password
                </button>
              </form>
            </>
          )}
        </div>
        {/* Right: Image & Text */}
        <div className="relative w-full md:w-1/2 h-64 min-h-[450px] md:h-auto flex flex-col justify-end items-start bg-black">
          <Image
            src={images[current]}
            alt="Profile"
            fill
            className="object-cover opacity-90 transition-all duration-700"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute bottom-10 left-10 text-white z-10">
            <div className="text-3xl font-bold mb-2"></div>
            <div className="text-xl font-semibold"></div>
          </div>
        </div>
      </div>
    </div>
  );
}