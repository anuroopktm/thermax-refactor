export function IndustrialHero() {
  return (
    <div className="relative hidden flex-1 overflow-hidden bg-foreground md:block">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2070&auto=format&fit=crop"
        alt="Industrial Facility"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-40 transition-transform duration-[8s]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/20 to-foreground/50" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-12 lg:p-16 text-muted">
        {/* Headline */}
        <div className="max-w-2xl space-y-6">
          <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
            Sustainable Engineering for
            <br />
            <span className="text-primary">Energy & Environment</span>
          </h2>

          <p className="text-lg text-muted/80 leading-relaxed">
            Delivering reliable solutions across heating, cooling, power, and
            environmental systems for global industries.
          </p>
        </div>

        {/* Enterprise Card */}
        <div className="rounded-2xl border border-background/10 bg-background/5 p-8 backdrop-blur-lg">
          <h3 className="text-lg text-primary font-bold uppercase tracking-widest">
            Why Thermax
          </h3>

          <p className="mt-4 text-base text-muted/80 leading-relaxed">
            We combine engineering excellence with sustainability to help
            businesses optimize energy efficiency and reduce environmental
            impact.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xl font-semibold">50+</p>
              <p className="text-xs text-muted/60">Countries</p>
            </div>
            <div>
              <p className="text-xl font-semibold">1000+</p>
              <p className="text-xs text-muted/60">Projects</p>
            </div>
            <div>
              <p className="text-xl font-semibold">40+ yrs</p>
              <p className="text-xs text-muted/60">Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
