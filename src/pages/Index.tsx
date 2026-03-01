import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import mallmarkLogo from "@/assets/mallmark-logo.png";

const steps = [
  { num: 1, icon: "🕐", title: "Order Pending", desc: "Your order is placed and awaiting payment confirmation" },
  { num: 2, icon: "✅", title: "Order Confirmed", desc: "Store has accepted your order" },
  { num: 3, icon: "📦", title: "Packaged", desc: "Store has packaged your order and is awaiting rider assignment" },
  { num: 4, icon: "🏍️", title: "Rider Assigned", desc: "A delivery rider has been assigned to your order" },
  { num: 5, icon: "🚀", title: "In Transit", desc: "Your order is on its way to you" },
  { num: 6, icon: "🎉", title: "Delivered!", desc: "Order has been successfully delivered" },
];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Dark Header Banner with Logo */}
      <header className="w-full bg-gradient-to-b from-mallmark-darker to-mallmark-main py-8 md:py-12">
        <div className="flex justify-center">
          <img
            src={mallmarkLogo}
            alt="MallMark Logo"
            className="w-32 md:w-44 cursor-pointer select-none drop-shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            onClick={handleLogoTap}
            draggable={false}
          />
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center bg-gradient-to-b from-background to-card">
        <div className="max-w-3xl mx-auto">
          <h1
            className="animate-on-scroll opacity-0 translate-y-6 text-3xl md:text-4xl lg:text-5xl font-bold text-mallmark-dark mb-6 leading-tight transition-all duration-700"
          >
            MallMark lets you shop from your favourite supermarkets and malls in your city with immediate delivery
          </h1>
          <p
            className="animate-on-scroll opacity-0 translate-y-6 text-2xl md:text-3xl font-extrabold text-mallmark-main mb-10 transition-all duration-700 delay-150"
          >
            Shop like never before
          </p>
          <div
            className="animate-on-scroll opacity-0 translate-y-6 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300"
          >
            <a
              href="https://apps.apple.com/ng/app/mallmark"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-mallmark-darker text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Download on App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mallmark.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-mallmark-main text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 hover:bg-mallmark-main-hover active:scale-95"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm.91-.91L19.59 12l-1.87-2.21-2.27 2.27 2.27 2.15zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/></svg>
              Get it on Google Play
            </a>
          </div>
        </div>
      </section>

      {/* How It Works – 6-step timeline */}
      <section className="px-6 py-16 md:py-24 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="animate-on-scroll opacity-0 translate-y-6 text-3xl md:text-4xl font-bold text-mallmark-dark text-center mb-16 transition-all duration-700">
            How MallMark Works
          </h2>

          {/* Desktop horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-10 left-[8%] right-[8%] h-0.5 bg-mallmark-light-active" />
              <div className="grid grid-cols-6 gap-4">
                {steps.map((step, i) => (
                  <div
                    key={step.num}
                    className="animate-on-scroll opacity-0 translate-y-6 flex flex-col items-center text-center transition-all duration-700"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div className="relative z-10 w-20 h-20 rounded-full bg-mallmark-main text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg mb-4 transition-transform duration-200 hover:scale-110">
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                    <h3 className="font-bold text-mallmark-dark text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-snug">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile vertical timeline */}
          <div className="md:hidden space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="animate-on-scroll opacity-0 translate-y-6 flex gap-4 transition-all duration-700"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-mallmark-main text-primary-foreground flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                    <span>{step.icon}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-mallmark-light-active my-1" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-mallmark-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mallmark-darker text-primary-foreground px-6 py-14">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <img src={mallmarkLogo} alt="MallMark" className="w-24 mx-auto brightness-200" />

          <div className="flex justify-center gap-6 text-sm">
            <a href="/terms" className="underline underline-offset-4 hover:text-mallmark-light-active transition-colors">Terms of Service</a>
            <a href="/privacy" className="underline underline-offset-4 hover:text-mallmark-light-active transition-colors">Privacy Policy</a>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6">
            <a href="https://instagram.com/mallmarkapp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-transform duration-200 hover:scale-110">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://x.com/mallmarkapp" target="_blank" rel="noopener noreferrer" aria-label="X" className="transition-transform duration-200 hover:scale-110">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@mallmarkapp" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-transform duration-200 hover:scale-110">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.69a8.28 8.28 0 004.76 1.51v-3.5a4.85 4.85 0 01-1-.01z"/></svg>
            </a>
          </div>

          <p className="text-sm text-mallmark-light-active">
            Contact: <a href="tel:+2349039540722" className="underline">+234 903 954 0722</a> | <a href="mailto:mallmarkapp@gmail.com" className="underline">mallmarkapp@gmail.com</a>
          </p>
          <p className="text-xs text-mallmark-light-active">© 2026 MallMark Limited. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
