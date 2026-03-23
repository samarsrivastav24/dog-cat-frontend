import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  async function handleVerify() {
    const email = localStorage.getItem("email");
    const otpValue = otp.trim();

    if (!otpValue) {
      alert("Please enter OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Wrong OTP");
      }

      if (data.success) {
        // ✅ Set login flag
        localStorage.setItem("isLoggedIn", "true");

        // ✅ Redirect to first protected page
        navigate("/select-animal");
      }
    } catch (error) {
      console.error(error);
      alert(error?.message || "Server error");
    }
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <span className="page-kicker">Step 2 · OTP verify</span>
        <h1 className="page-title">Enter OTP</h1>
        <p className="page-subtitle">We sent a 6-digit OTP to your email.</p>
      </div>

      <div className="page-content">
        <div className="form-field">
          <label className="field-label" htmlFor="otp-input">
            OTP
          </label>
          <input
            id="otp-input"
            className="text-input"
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button className="primary-button" type="button" onClick={handleVerify}>
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpPage;