import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  async function handleSendOtp(e) {
    e.preventDefault();
    if (isSending) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      alert("Please enter email");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetch("https://dog-cat-translator.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || `Failed to send OTP (HTTP ${res.status})`);
      }

      localStorage.setItem("email", normalizedEmail);
      navigate("/otp");
    } catch (err) {
      alert(err?.message || "Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div>
      <h2>Email Login</h2>

      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;