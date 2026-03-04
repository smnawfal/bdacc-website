import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef(null);

  const [status, setStatus] = useState({
    state: "idle", // idle | sending | success | error
    message: "",
  });

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ state: "sending", message: "Transmitting..." });

    try {
      const SERVICE_ID = "service_twwslym";
      const TEMPLATE_ID = "template_0xb8ewf";
      const PUBLIC_KEY = "TSCK8jupMT_RZJ-TS";

      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });

      setStatus({ state: "success", message: "Message sent ✅" });
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setStatus({ state: "error", message: "Failed to send ❌" });
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 md:px-10 lg:px-20 border-t border-white/5">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-mono tracking-[0.4em] text-slate-400">// CONTACT</p>
        <h2 className="text-3xl md:text-5xl font-bold mt-3">
          Contact <span className="text-blue-400">BDACC</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          {/* left */}
          <div className="lg:col-span-2 flex">
            <div className="w-full h-full rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-6 flex flex-col">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Contact info</h3>
                <p className="text-base text-slate-400 mt-2">
                  Reach us for workshops, collaborations, and event queries.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <InfoRow icon={<MailIcon />} label="Email" value="bdacc_club@nitw.ac.in" />
                <InfoRow icon={<PhoneIcon />} label="Phone/Whatsapp" value="+91 76740 34282" />
                <InfoRow icon={<MapPinIcon />} label="Location" value="NIT WARANGAL" />
              </div>

              <div className="mt-5 pt-5 border-t border-white/5 grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/917674034282"
                  aria-label="Join BDACC WhatsApp community"
                  className="w-full h-16 flex items-center justify-center rounded-xl border border-white/20 bg-surface-card text-gray-400 hover:border-[#25D366] hover:text-[#25D366] hover:shadow-[0_0_10px_#25D366] transition-all group pixel-corners"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href="https://www.instagram.com/bdacc_nitw/"
                  aria-label="Visit BDACC on Instagram"
                  className="w-full h-16 flex items-center justify-center rounded-xl border border-white/20 bg-surface-card text-gray-400 hover:border-[#E1306C] hover:text-[#E1306C] hover:shadow-[0_0_10px_#E1306C] transition-all group pixel-corners"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://in.linkedin.com/company/bdacc-nitw"
                  aria-label="Visit BDACC on LinkedIn"
                  className="w-full h-16 flex items-center justify-center rounded-xl border border-white/20 bg-surface-card text-gray-400 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:shadow-[0_0_10px_#0A66C2] transition-all group pixel-corners"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.youtube.com/@bdacc_club_nitw/featured"
                  aria-label="Visit BDACC on YouTube"
                  className="w-full h-16 flex items-center justify-center rounded-xl border border-white/20 bg-surface-card text-gray-400 hover:border-[#FF0000] hover:text-[#FF0000] hover:shadow-[0_0_10px_#FF0000] transition-all group pixel-corners"
                >
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="lg:col-span-3 flex">
            <div className="w-full h-full rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-6 md:p-8 shadow-[0_12px_40px_rgba(2,6,23,0.45)]">
              <h3 className="text-lg font-semibold">Send message</h3>
              <p className="text-sm text-slate-400 mt-1">
                Use this form to contact BDACC.
              </p>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full Name" name="user_name" placeholder="Your name" required />
                  <Field label="Email" name="user_email" placeholder="you@example.com" required type="email" />
                </div>

                <Field label="Subject" name="subject" placeholder="Event / Join / Collaboration" required />

                <div>
                  <label className="text-xs font-mono tracking-widest text-slate-400">MESSAGE</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    placeholder="Write your message..."
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/10"
                  />
                </div>

                {status.state !== "idle" && (
                  <div
                    className={`text-sm font-mono ${
                      status.state === "success"
                        ? "text-green-300"
                        : status.state === "error"
                        ? "text-red-300"
                        : "text-blue-300"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-100 hover:bg-blue-500/30 transition font-mono text-xs tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.state === "sending" ? "SENDING..." : "SEND"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-300">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-slate-500 font-mono text-xs tracking-[0.2em]">
          {label.toUpperCase()}
        </p>
        <p className="text-slate-200 font-mono text-sm md:text-base tracking-wide break-all">
          {value}
        </p>
      </div>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 3.5h3l1.5 4-2 1.5a14.5 14.5 0 0 0 6 6l1.5-2 4 1.5v3A2 2 0 0 1 18 20C10.27 20 4 13.73 4 6a2 2 0 0 1 2.5-2.5Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M22 12s0-3.2-.4-4.7a2.8 2.8 0 0 0-2-2C18 5 12 5 12 5s-6 0-7.6.3a2.8 2.8 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7a2.8 2.8 0 0 0 2 2C6 19 12 19 12 19s6 0 7.6-.3a2.8 2.8 0 0 0 2-2C22 15.2 22 12 22 12Z" />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <rect x="7" y="10" width="2.2" height="7" fill="black" />
      <circle cx="8.1" cy="7.6" r="1.2" fill="black" />
      <path
        d="M11.2 10h2.1v1c.5-.8 1.4-1.2 2.5-1.2 2.1 0 3.2 1.3 3.2 3.8V17h-2.2v-3.2c0-1.2-.4-2-1.5-2-1 0-1.6.7-1.9 1.4V17h-2.2V10Z"
        fill="black"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      <path
        fill="currentColor"
        d="M26.3 5.7A13.86 13.86 0 0 0 16.02 1.5C8.39 1.5 2.2 7.69 2.2 15.33c0 2.44.64 4.82 1.87 6.93L2 30.5l8.43-2.21a13.73 13.73 0 0 0 5.58 1.18h.01c7.63 0 13.82-6.19 13.82-13.83 0-3.69-1.43-7.16-4.04-9.94ZM16.02 27.1h-.01a11.3 11.3 0 0 1-5.74-1.57l-.41-.24-5 1.31 1.33-4.87-.27-.43a11.29 11.29 0 0 1-1.73-5.98c0-6.32 5.13-11.46 11.44-11.46 3.05 0 5.91 1.19 8.07 3.34a11.37 11.37 0 0 1 3.35 8.1c0 6.31-5.14 11.45-11.45 11.45Zm6.28-8.56c-.34-.17-2.03-1-2.34-1.11-.31-.12-.54-.17-.77.17-.22.34-.88 1.11-1.07 1.34-.2.22-.4.25-.74.08-.34-.17-1.42-.52-2.7-1.66-1-.89-1.68-1.98-1.88-2.31-.19-.34-.02-.52.15-.69.16-.16.34-.42.51-.62.17-.2.22-.34.34-.57.11-.22.05-.42-.03-.59-.09-.17-.77-1.85-1.06-2.54-.28-.68-.57-.59-.77-.6h-.66c-.23 0-.6.08-.91.42-.31.34-1.2 1.17-1.2 2.85s1.23 3.3 1.4 3.53c.17.22 2.41 3.67 5.84 5.15.82.35 1.46.56 1.96.72.82.26 1.57.23 2.16.14.66-.1 2.03-.83 2.31-1.63.29-.79.29-1.46.2-1.63-.08-.17-.31-.25-.65-.42Z"
      />
    </svg>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }) {
  return (
    <div>
      <label className="text-xs font-mono tracking-widest text-slate-400">
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm outline-none focus:border-blue-400/40 focus:ring-2 focus:ring-blue-500/10"
      />
    </div>
  );
}
export default Contact;

