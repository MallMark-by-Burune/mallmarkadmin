import { useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mallmarkLogo from "@/assets/mallmark-logo.png";

const Index = () => {
  const navigate = useNavigate();
  const tapCount = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoTap = useCallback(() => {
    tapCount.current += 1;
    if (tapCount.current >= 4) {
      tapCount.current = 0;
      if (tapTimer.current) clearTimeout(tapTimer.current);
      navigate("/login");
      return;
    }
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0;
    }, 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-mallmark-light">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center bg-gradient-to-b from-mallmark-light to-white">
        <img
          src={mallmarkLogo}
          alt="MallMark Logo"
          className="w-40 md:w-56 mb-8 cursor-pointer select-none"
          onClick={handleLogoTap}
          draggable={false}
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-mallmark-dark mb-4 leading-tight">
          Shop Local – Delivered Fast
        </h1>
        <p className="text-lg md:text-xl text-mallmark-main max-w-2xl mb-10">
          Browse supermarkets, malls &amp; stores in Abuja and beyond. Get your groceries, fashion, electronics and more delivered to your door in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="https://apps.apple.com/ng/app/mallmark"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-mallmark-darker text-mallmark-light px-8 py-4 rounded-xl text-lg font-semibold hover:bg-mallmark-dark transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.mallmark.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-mallmark-main text-mallmark-light px-8 py-4 rounded-xl text-lg font-semibold hover:bg-mallmark-main-hover transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm.91-.91L19.59 12l-1.87-2.21-2.27 2.27 2.27 2.15zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
            Get it on Google Play
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-mallmark-dark text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "🔍", title: "Browse", desc: "Explore products from local supermarkets, malls and stores near you." },
              { icon: "🛒", title: "Order", desc: "Add items to your cart and checkout securely in seconds." },
              { icon: "🚀", title: "Get Delivered", desc: "Sit back and receive your items at your doorstep in minutes." },
            ].map((f) => (
              <div key={f.title} className="bg-mallmark-light rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-mallmark-dark mb-2">{f.title}</h3>
                <p className="text-mallmark-main">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mallmark-darker text-mallmark-light px-6 py-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <img src={mallmarkLogo} alt="MallMark" className="w-24 mx-auto mb-4 brightness-200" />
          <div className="flex justify-center gap-6 text-sm">
            <a href="/terms" className="hover:text-mallmark-light-hover underline">Terms of Service</a>
            <a href="/privacy" className="hover:text-mallmark-light-hover underline">Privacy Policy</a>
          </div>
          <div className="flex justify-center gap-5">
            <a href="https://instagram.com/mallmarkapp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80">📷</a>
            <a href="https://x.com/mallmarkapp" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:opacity-80">𝕏</a>
            <a href="https://www.tiktok.com/@mallmarkapp" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:opacity-80">🎵</a>
          </div>
          <p className="text-sm text-mallmark-light-active">
            Contact: <a href="tel:+2349039540722" className="underline">+2349039540722</a> | <a href="mailto:mallmarkapp@gmail.com" className="underline">mallmarkapp@gmail.com</a>
          </p>
          <p className="text-xs text-mallmark-light-active">© 2026 MallMark Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
