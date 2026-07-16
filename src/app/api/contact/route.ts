import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

// Modern equivalent of the original site's sendmail.php:
// takes name / email / phone / message and emails the enquiry to the company inbox.
// Configure SMTP via environment variables (see .env.local.example).

export const runtime = "nodejs";

interface Payload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // honeypot — real users never fill this
}

function esc(s: string) {
  return s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bot trap: if the hidden field is filled, pretend success and drop it.
  if (data.company) return NextResponse.json({ ok: true });

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const phone = (data.phone ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !phone || !email) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, email, and phone." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || user;

  // Fail loudly (in logs) but gracefully (to the user) if SMTP isn't set up yet.
  if (!host || !user || !pass) {
    console.error("[contact] SMTP env vars missing — cannot send email.");
    return NextResponse.json(
      { ok: false, error: "Email is not configured yet. Please contact us on WhatsApp." },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${from}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `New consultation request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || "(none)"}`,
      html: `
        <h2 style="font-family:sans-serif">New consultation request</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0"><b>Name</b></td><td>${esc(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Email</b></td><td>${esc(email)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Phone</b></td><td>${esc(phone)}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap"><b>Message:</b><br>${esc(message) || "(none)"}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }
}
