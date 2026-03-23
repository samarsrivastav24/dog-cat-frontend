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
      const res = await fetch("http://localhost:5000/send-otp", {
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
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Step 1 · Sign in</span>
        <h1 className="page-title">Email login</h1>
        <p className="page-subtitle">Enter your email, then verify the OTP we send you.</p>
      </div>

      <div className="page-content">
        <form onSubmit={handleSendOtp} className="form-field">
          <label className="field-label" htmlFor="email-input">
            Email
          </label>
          <input
            id="email-input"
            className="text-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="primary-button" type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;