const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is working properly");
});

// In-memory OTP store (resets if server restarts).
// Structure: { [email: string]: number }
let otpStore = {};

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "samarsrivastav35@gmail.com",
    pass: "gqotfbklynisbjna"   // 👈 yahan apna 16 digit app password dalo (without spaces)
  }
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;

  try {
    const info = await transporter.sendMail({
      from: "samarsrivastav35@gmail.com",
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}`
    });

    // Helpful for local debugging. (OTP is NOT returned to the frontend.)
    console.log(`[send-otp] email=${email} otp=${otp} messageId=${info?.messageId}`);
    res.json({ success: true, messageId: info?.messageId });
  } catch (err) {
    console.error("[send-otp] Failed to send OTP:", err);
    res.status(500).json({ success: false, error: err?.message || "Failed to send OTP" });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || otp === undefined || otp === null) {
    return res.json({ success: false, error: "Email and OTP are required" });
  }

  const storedOtp = otpStore[email];

  if (storedOtp !== undefined && String(storedOtp) === String(otp).trim()) {
    delete otpStore[email];
    res.json({ success: true });
  } else {
    res.json({ success: false, error: "Wrong OTP" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));