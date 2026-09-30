import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, Facebook, House, Instagram, MapPin, Menu, Phone, Play, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import homeImage from "@/assets/green-renewals-home.webp";
import windowsImage from "@/assets/self-hosted/windows-optimized.webp";
import roofingImage from "@/assets/self-hosted/green-renewals-roof-optimized.webp";
import hvacImage from "@/assets/hvac.webp";
import insulationImage from "@/assets/self-hosted/attic-optimized.webp";
import logo from "@/assets/self-hosted/logo.png";
import video from "@/assets/self-hosted/green-renewals-video.mp4";
import teamPhoto from "@/assets/self-hosted/team-photo.png";
import qualificationsImage from "@/assets/self-hosted/program-qualifications.png";
import { supabase } from "@/integrations/supabase/client";

const seoTitle = "Impact Windows, Roofing & HVAC in South Florida | Green Renewals";
const seoDescription = "Get impact windows & doors, a new roof, HVAC or insulation with flexible financing. Serving Miami-Dade, Broward & West Palm Beach. Check if you qualify in 30 seconds — free.";
const siteUrl = "https://green-renewals-home.lovable.app/";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: homeImage, fetchPriority: "high" },
      { rel: "canonical", href: siteUrl },
    ],
    meta: [
      { title: seoTitle },
      { name: "description", content: seoDescription },
      { property: "og:title", content: "Protect Your South Florida Home — Check If You Qualify | Green Renewals" },
      { property: "og:description", content: "Hurricane-ready impact windows, roofing, HVAC and insulation with financing for qualified homeowners in Miami-Dade, Broward & West Palm Beach. Free eligibility check." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seoTitle },
      { name: "twitter:description", content: seoDescription },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HomeAndConstructionBusiness",
        name: "Green Renewals",
        url: siteUrl,
        telephone: "+1-786-606-4596",
        address: { "@type": "PostalAddress", streetAddress: "9000 Sheridan St, Suite 104", addressLocality: "Pembroke Pines", addressRegion: "FL", postalCode: "33024", addressCountry: "US" },
        areaServed: ["Miami-Dade County, FL", "Broward County, FL", "Palm Beach County, FL"],
        sameAs: ["https://www.instagram.com/green_renewals/", "https://www.facebook.com/profile.php?id=61594797155664"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Home Improvement Services",
          itemListElement: ["Impact Windows & Doors", "Roofing", "HVAC Systems", "Wall & Attic Insulation"].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
        },
      }),
    }],
  }),
  component: Index,
});

const phone = "+17866064596";
const address = "9000 Sheridan St, Suite 104, Pembroke Pines, FL 33024";
const mapUrl = "https://www.google.com/maps/dir/?api=1&destination=9000%20Sheridan%20St%2C%20Suite%20104%2C%20Pembroke%20Pines%2C%20FL%2033024";
const instagramUrl = "https://www.instagram.com/green_renewals/";
const facebookUrl = "https://www.facebook.com/profile.php?id=61594797155664";

const services = [
  { title: "Impact Windows & Doors", image: windowsImage, description: "Help protect your home and enjoy greater peace of mind with quality impact-resistant windows and doors." },
  { title: "Roofing", image: roofingImage, description: "Dependable roofing solutions built to safeguard your home and stand up to South Florida weather." },
  { title: "HVAC Systems", image: hvacImage, description: "Keep your home comfortable with efficient heating and cooling solutions tailored to your needs." },
  { title: "Wall & Attic Insulation", image: insulationImage, description: "Improve indoor comfort and energy efficiency with insulation for your walls and attic." },
];

function ScrollReveal({ children, index = 0, className = "" }: { children: ReactNode; index?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    element.classList.add('motion-ready');
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        frame = requestAnimationFrame(() => element.classList.add('is-visible'));
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return <div ref={ref} className={`scroll-reveal reveal-delay-${index} ${className}`}>{children}</div>;
}

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#top" className={`inline-flex items-center ${inverse ? "rounded-sm bg-background px-3 py-2" : ""}`} aria-label="Green Renewals home">
      <img src={logo} alt="Green Renewals — Build today for a stronger tomorrow" className="h-12 w-auto sm:h-14" />
    </a>
  );
}

function VideoCard() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="relative aspect-video overflow-hidden rounded-sm border border-border bg-forest shadow-sm">
        {playing ? (
          <video className="h-full w-full bg-forest" src={video} poster={qualificationsImage} controls autoPlay playsInline preload="metadata" />
        ) : (
          <>
            <img src={qualificationsImage} alt="Green Renewals program qualifications — check now if you qualify" width={1920} height={1080} loading="lazy" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-forest/10" aria-hidden="true" />
            <Button type="button" variant="ghost" onClick={() => setPlaying(true)} aria-label="Play the Green Renewals video" className="group absolute inset-0 flex h-full w-full items-center justify-center rounded-none hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm">
              <span className="flex size-14 items-center justify-center rounded-full bg-background/95 text-forest shadow-lg transition-transform duration-200 group-hover:scale-110"><Play size={22} className="ml-0.5" fill="currentColor" /></span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

type FormVariant = "card" | "compact" | "band";

function QualificationForm({ variant = "card", id, source = "General inquiry" }: { variant?: FormVariant; id?: string; source?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");
  const dark = variant === "band";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const leadPhone = String(data.get("phone") ?? "").trim();
    if (name.length < 2) { setError("Please enter your name."); return; }
    if (leadPhone.replace(/\D/g, "").length < 10) { setError("Please enter a valid phone number."); return; }
    setError("");
    setStatus("submitting");
    const { error: insertError } = await supabase.from("leads").insert({
      name,
      phone: leadPhone,
      email: null,
      service: source,
      county: null,
      message: null,
    });
    if (insertError) {
      setStatus("idle");
      setError("Something went wrong. Please call us instead at (786) 606-4596.");
      return;
    }
    form.reset();
    setStatus("done");
  }

  const fieldClass = `h-12 w-full rounded-sm border px-3 text-sm focus:outline-none focus:ring-2 ${dark ? "border-forest-foreground/30 bg-forest-foreground text-forest placeholder:text-forest/50 focus:ring-warm" : "border-border bg-background text-foreground placeholder:text-muted-foreground focus:ring-primary/40"}`;
  const labelClass = `flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.08em] ${dark ? "text-forest-foreground/85" : "text-foreground"}`;
  const submitLabel = variant === "band" ? "See My Options" : variant === "compact" ? "Check My Eligibility" : "Send My Details";

  if (status === "done") {
    return (
      <div id={id} className={`scroll-mt-24 rounded-sm border p-6 ${dark ? "border-forest-foreground/25" : "border-border bg-card shadow-sm"}`}>
        <Check className={`size-8 ${dark ? "text-warm" : "text-primary"}`} strokeWidth={2} />
        <h3 className={`mt-3 font-display text-lg font-bold ${dark ? "" : "text-forest"}`}>Thank you — we received your details.</h3>
        <p className={`mt-2 text-sm leading-relaxed ${dark ? "text-forest-foreground/85" : "text-muted-foreground"}`}>A member of our team will contact you shortly. Prefer to talk now? Call <a href={`tel:${phone}`} className="font-bold underline">(786) 606-4596</a>.</p>
      </div>
    );
  }

  const fields = (
    <>
      <label className={labelClass}>Full name<input name="name" type="text" required maxLength={100} autoComplete="name" placeholder="Your name" className={fieldClass} /></label>
      <label className={labelClass}>Phone<input name="phone" type="tel" required maxLength={20} autoComplete="tel" inputMode="tel" placeholder="(786) 000-0000" className={fieldClass} /></label>
    </>
  );
  const submit = (
    <Button type="submit" size="lg" variant={dark ? "inverse" : "default"} disabled={status === "submitting"} className="h-12 w-full rounded-sm px-6 font-bold sm:w-auto">
      {status === "submitting" ? "Sending…" : submitLabel} <ArrowRight />
    </Button>
  );
  const note = <p className={`mt-3 flex items-center gap-2 text-xs ${dark ? "text-forest-foreground/70" : "text-muted-foreground"}`}><ShieldCheck size={14} /> Free, no-obligation check. We never share your information.</p>;
  const errorLine = error && <p role="alert" className={`mt-3 text-sm font-semibold ${dark ? "text-warm" : "text-destructive"}`}>{error}</p>;

  if (variant === "card") {
    return (
      <form id={id} onSubmit={handleSubmit} noValidate className="scroll-mt-24 rounded-sm border border-border border-t-4 border-t-primary bg-card p-6 shadow-sm sm:p-7">
        <h3 className="font-display text-lg font-bold text-forest">Check if you qualify</h3>
        <p className="mt-1 text-sm text-muted-foreground">Two quick details — our team calls you back with your options.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{fields}</div>
        {errorLine}
        <div className="mt-5">{submit}</div>
        {note}
      </form>
    );
  }

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={`scroll-mt-24 ${variant === "compact" ? "rounded-sm border border-border bg-mist p-5" : ""}`}>
      <div className="grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">{fields}{submit}</div>
      {errorLine}
      {note}
    </form>
  );
}

export function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div id="top" className="min-h-screen bg-background pb-16 lg:pb-0">
      <div className="bg-forest text-forest-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-5 py-2 text-xs font-medium sm:justify-end sm:px-8 lg:px-10">
          <a href={`tel:${phone}`} className="inline-flex shrink-0 items-center gap-2 hover:underline"><Phone size={13} /> <span className="hidden sm:inline">Call us:</span> (786) 606-4596</a>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <Brand />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            <a href="#top" className="text-sm font-semibold text-primary">Home</a>
            <a href="#services" className="text-sm font-semibold text-foreground transition-colors hover:text-primary">Our Services</a>
            <a href="#about" className="text-sm font-semibold text-foreground transition-colors hover:text-primary">About Us</a>
            <a href="#financing" className="text-sm font-semibold text-foreground transition-colors hover:text-primary">Financing</a>
            <a href="#contact" className="text-sm font-semibold text-foreground transition-colors hover:text-primary">Contact</a>
          </nav>
          <div className="hidden lg:block"><Button asChild size="lg" className="h-11 rounded-sm px-5 font-bold"><a href={`tel:${phone}`}>Call for a Consultation <ArrowRight /></a></Button></div>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && (
          <nav className="absolute inset-x-0 top-full flex flex-col border-t border-border bg-background px-5 py-3 shadow-lg lg:hidden" aria-label="Mobile navigation">
            {[["Home", "#top"], ["Our Services", "#services"], ["About Us", "#about"], ["Financing", "#financing"], ["Contact", "#contact"]].map(([label, href]) => <a key={href} href={href} onClick={closeMenu} className="border-b border-border py-3 text-sm font-semibold text-foreground last:border-0">{label}</a>)}
          </nav>
        )}
      </header>

      <main>
        <section className="hero-photo relative flex min-h-[550px] items-center text-forest-foreground sm:min-h-[595px]" style={{ "--hero-image": `url(${homeImage})` } as React.CSSProperties} aria-labelledby="hero-title">
          <div className="hero-overlay absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
            <div className="max-w-[620px]">
              <p className="hero-enter mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-forest-foreground/90"><span className="h-px w-9 bg-warm" /> South Florida Home Improvement</p>
              <h1 id="hero-title" className="hero-enter hero-d1 font-display text-[39px] font-bold leading-[1.15] sm:text-[52px] lg:text-[58px]">Green Renewals</h1>
              <p className="hero-enter hero-d2 mt-4 font-display text-xl font-semibold leading-snug sm:text-[27px]">Upgrade Your Home.<br />Protect Your Investment.</p>
<p className="hero-enter hero-d3 mt-5 max-w-[500px] text-base leading-relaxed text-forest-foreground/90 sm:text-lg">Quality home improvement solutions for the comfort, protection, and value of your South Florida home.</p>
              <p className="hero-enter hero-d3 mt-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-forest-foreground/80"><MapPin size={14} className="text-warm" /> Serving Miami-Dade, Broward & West Palm Beach</p>
              <div className="hero-enter hero-d4 mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-12 rounded-sm px-6 font-bold"><a href={`tel:${phone}`}>Speak With Our Team <ArrowRight /></a></Button>
                <Button asChild variant="heroOutline" size="lg" className="h-12 rounded-sm px-6 font-bold"><a href="#services">Explore Our Services</a></Button>
              </div>
            </div>
          </div>
        </section>

        <div className="border-b border-border bg-mist">
          <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:grid-cols-3 sm:px-8 lg:px-10">
            <ScrollReveal index={0} className="benefit-reveal flex items-center gap-3 py-5 sm:pr-5"><ShieldCheck className="size-6 shrink-0 text-primary" strokeWidth={1.8} /><span className="text-sm font-semibold">Quality Product and Workmanship</span></ScrollReveal>
            <ScrollReveal index={1} className="benefit-reveal flex items-center gap-3 border-t border-border py-5 sm:border-l sm:border-t-0 sm:px-6"><Check className="size-6 shrink-0 text-primary" strokeWidth={1.8} /><span className="text-sm font-semibold">Clear, Reliable Service</span></ScrollReveal>
            <ScrollReveal index={2} className="benefit-reveal flex items-center gap-3 border-t border-border py-5 sm:border-l sm:border-t-0 sm:pl-6"><House className="size-6 shrink-0 text-primary" strokeWidth={1.8} /><span className="text-sm font-semibold">Solutions for Your Home</span></ScrollReveal>
          </div>
        </div>

        <section id="services" className="scroll-mt-24 overflow-x-clip py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <ScrollReveal className="mb-10 max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">What We Do</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-forest sm:text-4xl">Impact windows, roofing, HVAC & insulation in South Florida.</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">Complete solutions to help you protect, improve, and enjoy your home for years to come.</p>
            </ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                 <ScrollReveal key={service.title} index={index} className={`service-reveal service-direction-${index} h-full`}>
                <article className="group h-full overflow-hidden rounded-sm border border-border bg-card transition-shadow hover:shadow-md">
                   <div className="aspect-[4/3] overflow-hidden"><img src={service.image} alt={service.title} width={1024} height={768} loading="eager" decoding="async" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]" /></div>
                  <div className="p-5">
                    <h3 className="min-h-[3.5rem] font-display text-lg font-bold leading-snug text-forest">{service.title}</h3>
                    <p className="mt-2 min-h-[6rem] text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <a href={`tel:${phone}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-forest">Ask about this service <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" /></a>
                  </div>
                </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-border bg-mist py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10">
            <ScrollReveal>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">About Green Renewals</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-forest sm:text-4xl">Behind every successful project is a team committed to qualified professionalism and attention to detail</h2>
              <div className="rule-grow mt-7 h-1 w-14 bg-primary" />
              <img src={teamPhoto} alt="The Green Renewals team outside our office" width={1920} height={1080} loading="lazy" className="mt-8 w-full rounded-sm border border-border object-cover shadow-sm" />
            </ScrollReveal>
            <ScrollReveal index={1} className="space-y-5 text-base leading-[1.8] text-foreground/85">
              <p>Green Renewals is a South Florida home improvement company dedicated to helping homeowners upgrade, protect, and improve their homes with high-quality products, professional service, and reliable workmanship.</p>
              <p>We specialize in roofing, impact windows and doors, HVAC systems, and insulation, providing homeowners with complete solutions designed to improve comfort, energy efficiency, protection, and the overall value of their property.</p>
              <p>From the initial consultation through project completion, our team is committed to making the process simple, transparent, and stress-free. We work with trusted professionals and quality materials while helping each homeowner understand the options available for their specific property and project.</p>
              <p>At Green Renewals, our goal is simple: professional service, quality work, clear communication, and results homeowners can feel confident about.</p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:px-10">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold leading-tight text-forest sm:text-4xl">Program Qualifications</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">Find out today whether your home meets the requirements for our financing program, and take the first step toward a stronger, longer-lasting, more energy-efficient property.</p>
              <div className="mt-8 max-w-2xl"><QualificationForm variant="compact" source="Program qualifications form" /></div>
            </ScrollReveal>
            <ScrollReveal index={1} className="flex justify-start lg:justify-end"><VideoCard /></ScrollReveal>
          </div>
        </section>

        <section id="financing" className="scroll-mt-24 bg-forest py-16 text-forest-foreground sm:py-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10">
            <ScrollReveal className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-warm">Flexible Options</p>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">Upgrade now. Pay over time.</h2>
              <p className="mt-4 text-base leading-relaxed text-forest-foreground/85">Flexible financing options are available for qualified homeowners, making it easier to complete important improvements without the burden of a large upfront investment.</p>
            </ScrollReveal>
            <ScrollReveal index={1} className="w-full lg:max-w-xl"><p className="mb-4 font-display text-lg font-bold">Find out in 30 seconds — no cost, no commitment.</p><QualificationForm variant="band" source="Financing form" /></ScrollReveal>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <ScrollReveal>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-primary">Get in Touch</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-forest sm:text-4xl">Let’s talk about your home.</h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Whether you’re planning an upgrade or exploring your options, our team is ready to help you take the next step.</p>
              <div className="mt-8 max-w-xl"><QualificationForm id="qualify" source="Contact form" /></div>
            </ScrollReveal>
            <ScrollReveal index={1} className="border-t border-border lg:border-l lg:border-t-0 lg:pl-12">
              <div className="flex gap-5 border-b border-border py-7"><Phone className="mt-1 size-6 shrink-0 text-primary" /><div><h3 className="font-display text-base font-bold text-forest">Phone</h3><a href={`tel:${phone}`} className="mt-1 inline-block text-lg text-foreground hover:text-primary">(786) 606-4596</a></div></div>
              <div className="flex gap-5 border-b border-border py-7"><MapPin className="mt-1 size-6 shrink-0 text-primary" /><div><h3 className="font-display text-base font-bold text-forest">Office Address</h3><p className="mt-1 text-base text-foreground">{address}</p><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-forest">Get directions <ArrowRight size={15} /></a></div></div>
              <div className="flex gap-5 border-b border-border py-7"><MapPin className="mt-1 size-6 shrink-0 text-primary" /><div><h3 className="font-display text-base font-bold text-forest">Service Areas</h3><p className="mt-1 text-base text-foreground">Miami-Dade, Broward & West Palm Beach counties</p></div></div>
              <div className="flex items-center gap-4 py-7"><span className="text-sm font-bold text-forest">Follow us</span><Button asChild variant="outline" size="icon" className="size-11 rounded-sm" title="Instagram"><a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Green Renewals on Instagram"><Instagram /></a></Button><Button asChild variant="outline" size="icon" className="size-11 rounded-sm" title="Facebook"><a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Green Renewals on Facebook"><Facebook /></a></Button></div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <footer className="bg-forest text-forest-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-3 sm:px-8 lg:px-10">
          <div><Brand inverse /><p className="mt-5 max-w-xs text-sm leading-relaxed text-forest-foreground/75">Upgrade Your Home. Protect Your Investment.</p></div>
          <div><h2 className="font-display text-sm font-bold uppercase">Quick Links</h2><div className="mt-5 flex flex-col gap-3 text-sm text-forest-foreground/75"><a href="#services" className="hover:text-forest-foreground">Our Services</a><a href="#about" className="hover:text-forest-foreground">About Us</a><a href="#financing" className="hover:text-forest-foreground">Financing</a><a href="#contact" className="hover:text-forest-foreground">Contact</a></div></div>
          <div><h2 className="font-display text-sm font-bold uppercase">Contact</h2><div className="mt-5 space-y-3 text-sm leading-relaxed text-forest-foreground/75"><a href={`tel:${phone}`} className="block hover:text-forest-foreground">(786) 606-4596</a><a href={mapUrl} target="_blank" rel="noopener noreferrer" className="block hover:text-forest-foreground">{address}</a><div className="flex items-center gap-4 pt-3"><a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Green Renewals on Instagram" title="Instagram" className="inline-flex size-11 items-center justify-center border border-divider text-forest-foreground hover:bg-forest-foreground/10"><Instagram size={20} /></a><a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Green Renewals on Facebook" title="Facebook" className="inline-flex size-11 items-center justify-center border border-divider text-forest-foreground hover:bg-forest-foreground/10"><Facebook size={20} /></a></div></div></div>
        </div>
        <div className="border-t border-divider"><div className="mx-auto max-w-7xl px-5 py-5 text-xs text-forest-foreground/65 sm:px-8 lg:px-10">© {new Date().getFullYear()} Green Renewals. All rights reserved.</div></div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background px-4 py-2 shadow-lg lg:hidden" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        <Button asChild size="lg" className="h-12 w-full rounded-sm font-bold"><a href={`tel:${phone}`}><Phone size={18} /> Call (786) 606-4596</a></Button>
      </div>
    </div>
  );
}
