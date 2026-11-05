import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroCar from "@/assets/hero-car.jpg";
import sedan from "@/assets/car-sedan.jpg";
import pickup from "@/assets/car-pickup.jpg";
import couple from "@/assets/couple-checking.jpg";

const faqs = [
  ["¿Qué es el financiamiento de un auto seminuevo?", "Es una forma de adquirir un vehículo usado mediante un esquema de pagos ofrecido por una institución, dealer o agencia."],
  ["¿Todos los autos seminuevos pueden financiarse?", "No necesariamente. Depende de las políticas de la institución y de características como año, valor y condiciones del vehículo."],
  ["¿La antigüedad del auto puede importar?", "Sí. Algunas instituciones establecen límites de antigüedad."],
  ["¿Necesito enganche?", "Depende de las condiciones correspondientes. Consulta el monto requerido con quien ofrezca la opción."],
  ["¿Qué debo comparar?", "Enganche, plazo, mensualidad, tasa, CAT, comisiones, seguros y costo total."],
  ["¿Seminuevos.com otorga financiamiento?", "No. Seminuevos.com es un portal de anuncios y no otorga directamente financiamiento."],
  ["¿Seminuevos.com vende los autos?", "No. Los vehículos son publicados y comercializados por dealers, agencias y vendedores."],
  ["¿Quién determina si me aprueban?", "La institución que evalúe la solicitud."],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Financiamiento de autos seminuevos y usados | Seminuevos.com" },
      { name: "description", content: "Conoce cómo funciona el financiamiento de autos seminuevos, qué debes comparar, qué requisitos pueden pedirte y explora vehículos usados publicados por agencias y dealers." },
      { property: "og:title", content: "Financiamiento de autos seminuevos y usados | Seminuevos.com" },
      { property: "og:description", content: "Entiende cómo funciona el financiamiento de un auto seminuevo y qué comparar antes de elegir." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema) }],
  }),
  component: Index,
});

// Analytics events prepared conceptually (no GA4 yet)
function track(event: string, data?: Record<string, unknown>) {
  if (typeof window !== "undefined") (window as any).dataLayer?.push({ event, ...data });
}

const btn = "inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-bold transition-all";
const btnPrimary = `${btn} bg-brand text-brand-foreground hover:brightness-110 shadow-soft`;
const btnGhost = `${btn} border border-ink/20 text-ink hover:border-ink hover:bg-surface`;

function Section({ id, eyebrow, title, children, tone = "bg-background" }: { id?: string; eyebrow?: string; title: string; children: React.ReactNode; tone?: string }) {
  return (
    <section id={id} className={`${tone} scroll-mt-20 px-5 py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="section-title max-w-3xl">{title}</h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-8 flex gap-3 rounded-xl border-l-4 border-teal bg-accent/50 p-4 text-sm text-ink/80">{children}</p>;
}

function Index() {
  return (
    <div className="bg-background text-foreground">
      <Header />
      <Hero />
      <Basics />
      <WhatChanges />
      <Timeline />
      <Compare />
      <NewVsUsed />
      <Scenario />
      <Requirements />
      <CarChecklist />
      <Budget />
      <Providers />
      <Questions />
      <Myths />
      <Inventory />
      <Faq />
      <FinalCta />
      <Footer />
      <a href="#inventario" className={`${btnPrimary} fixed inset-x-4 bottom-4 z-40 md:hidden`}>Explorar seminuevos</a>
    </div>
  );
}

function Logo() {
  return <a href="#" className="text-xl font-extrabold tracking-tight text-ink">seminuevos<span className="text-brand">.com</span></a>;
}

function Header() {
  const links = [["#como-funciona", "¿Cómo funciona?"], ["#comparar", "Qué comparar"], ["#vs", "Seminuevo vs nuevo"], ["#requisitos", "Requisitos"], ["#faq", "Preguntas frecuentes"]];
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden gap-6 text-sm font-semibold text-ink/70 lg:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="hover:text-brand">{l}</a>)}
        </nav>
        <a href="#inventario" className={`${btnPrimary} h-10 min-h-10 px-5`}>Explorar autos</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden bg-surface px-5 pb-20 pt-12 md:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="eyebrow mb-5">Del auto al plan</p>
          <h1 className="text-4xl font-extrabold leading-[1.02] tracking-tight text-ink md:text-6xl">
            Financiamiento de autos <span className="text-brand">seminuevos</span>, explicado fácil
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink/70">Conoce qué debes revisar para entender las opciones de pago disponibles al buscar un auto seminuevo.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#basico" onClick={() => track("used_financing_education_start")} className={btnPrimary}>Entender cómo funciona</a>
            <a href="#inventario" className={btnGhost}>Explorar autos</a>
          </div>
          <p className="mt-8 max-w-md text-xs leading-relaxed text-ink/55">Seminuevos.com muestra vehículos publicados por dealers y agencias. Las condiciones de financiamiento dependen del vendedor o institución correspondiente.</p>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-card shadow-soft">
            <div className="flex items-center justify-between px-5 py-3 text-xs font-bold uppercase tracking-widest text-ink/50"><span>01 · El auto</span><span className="text-brand">●</span></div>
            <img src={heroCar} alt="SUV seminuevo en agencia" width={1280} height={832} className="aspect-[16/10] w-full object-cover" />
            <div className="grid grid-cols-4 divide-x divide-border text-center text-xs">
              {["Precio del auto", "Año", "Kilometraje", "Dealer"].map((l) => <div key={l} className="p-3"><div className="mx-auto mb-1 h-2 w-10 rounded bg-ink/10" /><span className="text-ink/60">{l}</span></div>)}
            </div>
          </div>
          <div className="relative -mt-6 ml-6 rounded-3xl bg-ink p-5 text-background shadow-soft md:ml-16">
            <div className="mb-3 flex justify-between text-xs font-bold uppercase tracking-widest"><span className="opacity-60">02 · El plan</span><span className="rounded-full bg-teal px-2 py-0.5">Conceptos a comparar</span></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["Enganche", "Plazo", "Mensualidad", "Costo total"].map((c) => <div key={c} className="rounded-xl border border-background/15 p-3 text-sm font-bold">{c}<div className="mt-2 h-1.5 w-8 rounded bg-background/25" /></div>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Basics() {
  const steps = ["Precio del auto", "Pago inicial", "Monto a financiar", "Pagos durante un plazo"] as const;
  return (
    <Section id="basico" eyebrow="¿Qué significa?" title="Empecemos por lo básico">
      <p className="max-w-2xl text-lg text-ink/70">Financiar un auto seminuevo significa adquirir un vehículo usado sin pagar todo su precio de una sola vez, utilizando una opción de pago ofrecida por una institución, dealer o agencia.</p>
      <div className="mt-10 grid items-center gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Box n="A" t={steps[0]} />
        <Arrow />
        <div className="grid gap-2"><Box n="B" t={steps[1]} small /><span className="text-center font-bold text-teal">+</span><Box n="C" t={steps[2]} small /></div>
        <Arrow />
        <Box n="D" t={steps[3]} accent />
      </div>
      <Note>Las condiciones cambian según el vehículo y la institución.</Note>
    </Section>
  );
}
function Arrow() { return <span className="text-center text-2xl text-brand md:rotate-0 rotate-90">→</span>; }
function Box({ n, t, small, accent }: { n: string; t: string; small?: boolean; accent?: boolean }) {
  return <div className={`rounded-2xl border ${accent ? "border-brand bg-brand text-brand-foreground" : "border-border bg-surface text-ink"} ${small ? "p-4" : "p-6"}`}><span className="text-xs font-bold opacity-60">{n}</span><p className="text-lg font-bold">{t}</p></div>;
}

function WhatChanges() {
  const cards = [
    ["Antigüedad", "Algunas instituciones pueden establecer límites sobre la edad del vehículo."],
    ["Kilometraje", "Dependiendo de la institución, el kilometraje puede influir en la elegibilidad."],
    ["Valor del auto", "El valor del vehículo puede influir en el monto que puede financiarse."],
    ["Condición del vehículo", "El estado general del auto puede ser relevante para algunas opciones."],
    ["Dealer o agencia", "Las alternativas disponibles pueden cambiar según dónde se compre el vehículo."],
  ];
  return (
    <Section eyebrow="Qué cambia por ser seminuevo" title="Un seminuevo no se evalúa igual que un auto nuevo" tone="bg-surface">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(([t, d], i) => (
          <div key={t} className="group rounded-2xl bg-card p-6 transition hover:-translate-y-1 hover:shadow-soft">
            <span className="text-3xl font-extrabold text-brand/25 group-hover:text-brand">0{i + 1}</span>
            <h3 className="mt-4 font-extrabold text-ink">{t}</h3>
            <p className="mt-2 text-sm text-ink/65">{d}</p>
          </div>
        ))}
      </div>
      <Note>Las políticas cambian entre instituciones. Consulta siempre las condiciones aplicables al vehículo específico.</Note>
    </Section>
  );
}

function Timeline() {
  const steps = [
    ["Encuentras un auto", "Explora vehículos dentro de tu presupuesto."],
    ["Revisas el precio", "Conoce cuánto cuesta el vehículo."],
    ["Consulta opciones", "Pregunta al dealer o agencia qué alternativas están disponibles."],
    ["Define tu pago inicial", "Conoce cuánto necesitas cubrir al principio."],
    ["Revisa las condiciones", "Compara plazo, pagos, costos y requisitos."],
    ["La institución evalúa", "La aprobación depende de las políticas correspondientes."],
  ];
  const [active, setActive] = useState(0);
  return (
    <Section id="como-funciona" eyebrow="Así suele funcionar" title="Del seminuevo al financiamiento">
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-surface"><div className="h-full bg-brand transition-all duration-500" style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
      <ol className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {steps.map(([t, d], i) => (
          <li key={t}>
            <button onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className={`h-full w-full rounded-2xl border p-5 text-left transition ${i <= active ? "border-brand bg-brand/5" : "border-border"}`}>
              <span className={`text-sm font-extrabold ${i <= active ? "text-brand" : "text-ink/40"}`}>0{i + 1}</span>
              <h3 className="mt-2 font-bold text-ink">{t}</h3>
              <p className="mt-1 text-sm text-ink/60">{d}</p>
            </button>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Compare() {
  const rows = [
    ["Enganche", "Pago inicial.", "Cuánto necesitas pagar al comienzo."],
    ["Plazo", "Tiempo durante el que realizarás pagos.", "Cuántos meses pagarás."],
    ["Mensualidad", "Pago periódico.", "Cuánto representa dentro de tu presupuesto."],
    ["Tasa", "Costo relacionado con el financiamiento.", "Compara diferentes propuestas."],
    ["CAT", "Indicador para comparar costos.", "Úsalo como referencia."],
    ["Comisiones", "Cargos adicionales.", "Pregunta cuáles aplican."],
    ["Seguro", "Puede ser requerido.", "Consulta cobertura y costo."],
    ["Costo total", "Lo que terminarás pagando.", "No lo pierdas de vista."],
  ];
  return (
    <Section id="comparar" eyebrow="Lo que debes comparar" title="No compares únicamente la mensualidad" tone="bg-surface">
      <div className="hidden overflow-hidden rounded-2xl bg-card md:block">
        <div className="grid grid-cols-3 bg-ink px-6 py-4 text-xs font-bold uppercase tracking-widest text-background"><span>Concepto</span><span>Qué significa</span><span>Qué revisar</span></div>
        {rows.map(([c, m, r]) => (
          <div key={c} className="grid grid-cols-3 border-t border-border px-6 py-4 transition hover:bg-accent/40">
            <span className={`font-extrabold ${c === "Costo total" ? "text-brand" : "text-ink"}`}>{c}</span><span className="text-ink/70">{m}</span><span className="text-ink/70">{r}</span>
          </div>
        ))}
      </div>
      <div className="grid gap-3 md:hidden">
        {rows.map(([c, m, r]) => <div key={c} className="rounded-2xl bg-card p-5"><h3 className="font-extrabold text-ink">{c}</h3><p className="mt-1 text-sm text-ink/70">{m}</p><p className="mt-2 text-sm font-semibold text-teal">{r}</p></div>)}
      </div>
    </Section>
  );
}

function NewVsUsed() {
  const data = [
    ["Antigüedad", "0 años", "Variable."],
    ["Disponibilidad de opciones", "Puede haber programas específicos.", "Puede depender del año y condiciones del vehículo."],
    ["Valor", "Precio inicial generalmente mayor.", "Puede ser menor que un vehículo nuevo equivalente."],
    ["Condiciones", "Dependen de la institución.", "Pueden variar según edad, precio y políticas."],
  ];
  const [i, setI] = useState(0);
  return (
    <Section id="vs" eyebrow="Seminuevo vs nuevo" title="¿Qué puede cambiar frente a un auto nuevo?">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {data.map(([t], k) => <button key={t} onClick={() => setI(k)} className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition ${i === k ? "bg-ink text-background" : "bg-surface text-ink/70"}`}>{t}</button>)}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-border p-8"><p className="eyebrow text-ink/50">Auto nuevo</p><p className="mt-4 text-2xl font-bold text-ink">{data[i]![1]}</p></div>
        <div className="rounded-3xl border-2 border-brand p-8"><p className="eyebrow text-brand">Auto seminuevo</p><p className="mt-4 text-2xl font-bold text-ink">{data[i]![2]}</p></div>
      </div>
      <p className="mt-10 max-w-3xl text-2xl font-extrabold tracking-tight text-ink md:text-3xl">Lo importante no es solo si es nuevo o seminuevo, sino entender las condiciones completas.</p>
    </Section>
  );
}

const mxn = (n: number) => n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

function Scenario() {
  const [price, setPrice] = useState(350000);
  const [down, setDown] = useState(20);
  const [term, setTerm] = useState(48);
  const rest = price * (1 - down / 100);
  const touch = () => track("used_financing_scenario_interaction");
  return (
    <Section eyebrow="Explorador de escenarios" title="Explora cómo puede cambiar un plan" tone="bg-surface">
      <div className="grid gap-6 rounded-3xl bg-card shadow-soft p-6 md:grid-cols-2 md:p-10">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between text-sm font-bold text-ink"><span>Precio del auto</span><span>{mxn(price)}</span></div>
            <input type="range" min={150000} max={1000000} step={10000} value={price} onChange={(e) => { setPrice(+e.target.value); touch(); }} className="mt-3 w-full accent-[var(--brand)]" />
          </div>
          <Choice label="Pago inicial" opts={[10, 20, 30, 40]} val={down} set={(v) => { setDown(v); touch(); }} fmt={(v) => `${v}%`} />
          <Choice label="Plazo" opts={[24, 36, 48, 60]} val={term} set={(v) => { setTerm(v); touch(); }} fmt={(v) => `${v} m`} />
        </div>
        <div className="rounded-2xl bg-surface p-6">
          {[["Precio", mxn(price)], ["Pago inicial", mxn(price - rest)], ["Monto restante", mxn(rest)], ["Plazo seleccionado", `${term} meses`]].map(([l, v]) => (
            <div key={l} className="flex justify-between border-b border-border py-3 text-ink"><span className="text-ink/60">{l}</span><span className="font-bold">{v}</span></div>
          ))}
          <div className="mt-5 rounded-xl border border-dashed border-teal p-4">
            <span className="rounded-full bg-teal px-2 py-0.5 text-xs font-bold text-background">Ejemplo educativo</span>
            <p className="mt-2 text-sm text-ink/70">Monto restante ÷ plazo, sin tasa, CAT, comisiones ni seguros:</p>
            <p className="text-2xl font-extrabold text-ink">{mxn(rest / term)} <span className="text-sm font-semibold text-ink/50">/ mes ilustrativo</span></p>
          </div>
          <p className="mt-4 text-xs text-ink/55">Esta herramienta no representa una cotización real.</p>
        </div>
      </div>
    </Section>
  );
}
function Choice({ label, opts, val, set, fmt }: { label: string; opts: number[]; val: number; set: (v: number) => void; fmt: (v: number) => string }) {
  return (
    <div>
      <p className="text-sm font-bold text-ink">{label}</p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {opts.map((o) => <button key={o} onClick={() => set(o)} className={`min-h-11 rounded-xl text-sm font-bold transition ${val === o ? "bg-brand text-brand-foreground" : "bg-surface text-ink hover:bg-border"}`}>{fmt(o)}</button>)}
      </div>
    </div>
  );
}

function Requirements() {
  const items = ["Identificación", "Comprobante de domicilio", "Comprobantes de ingresos", "Información laboral", "Historial crediticio", "Información del vehículo", "Pago inicial"];
  return (
    <Section id="requisitos" eyebrow="Requisitos que pueden pedirte" title="Ten esto preparado">
      <p className="max-w-2xl text-lg text-ink/70">Los requisitos cambian entre instituciones, pero normalmente podrían solicitar información como:</p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((t, i) => <div key={t} className="rounded-2xl border border-border p-5 transition hover:border-teal"><span className="text-xs font-bold text-teal">{String(i + 1).padStart(2, "0")}</span><p className="mt-2 font-bold text-ink">{t}</p></div>)}
      </div>
      <Note>Consulta siempre los requisitos con la institución o dealer correspondiente.</Note>
    </Section>
  );
}

function CarChecklist() {
  const items = ["Año", "Kilometraje", "Estado exterior", "Estado interior", "Historial del vehículo", "Documentación", "Adeudos", "Precio de mercado", "Condiciones del dealer"];
  const [done, setDone] = useState<string[]>([]);
  const toggle = (t: string) => { track("used_financing_vehicle_checklist", { item: t }); setDone((d) => (d.includes(t) ? d.filter((x) => x !== t) : [...d, t])); };
  return (
    <Section eyebrow="El auto también importa" title="No solo revises el financiamiento. Revisa el auto." tone="bg-surface">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <img src={couple} alt="Pareja revisando un auto seminuevo" loading="lazy" width={1200} height={800} className="rounded-3xl object-cover" />
        <div>
          <p className="text-lg text-ink/70">Antes de comprometerte con cualquier esquema de pago, conoce bien el vehículo que estás considerando.</p>
          <p className="mt-4 text-sm font-bold text-teal">{done.length} de {items.length} revisados</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {items.map((t) => {
              const on = done.includes(t);
              return <li key={t}><button onClick={() => toggle(t)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-4 text-left font-semibold transition ${on ? "bg-ink text-background" : "bg-card text-ink"}`}><span className={`grid h-5 w-5 place-items-center rounded border-2 text-xs ${on ? "border-brand bg-brand" : "border-ink/30"}`}>{on && "✓"}</span>{t}</button></li>;
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Budget() {
  const items = ["Pago mensual", "Seguro", "Combustible", "Mantenimiento", "Trámites", "Impuestos aplicables", "Estacionamiento", "Imprevistos"];
  return (
    <Section eyebrow="Presupuesto real" title="Tu presupuesto no termina en la mensualidad">
      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_1.2fr_1fr]">
        <div className="grid gap-3">{items.slice(0, 4).map((t) => <Chip key={t} t={t} first={t === "Pago mensual"} />)}</div>
        <img src={sedan} alt="Auto seminuevo" loading="lazy" width={992} height={672} className="rounded-3xl" />
        <div className="grid gap-3">{items.slice(4).map((t) => <Chip key={t} t={t} />)}</div>
      </div>
      <Note>Considera el costo de tener el auto, no únicamente el pago del vehículo.</Note>
    </Section>
  );
}
function Chip({ t, first }: { t: string; first?: boolean }) {
  return <div className={`rounded-full px-5 py-3 text-center font-bold ${first ? "bg-brand text-brand-foreground" : "bg-surface text-ink"}`}>{t}</div>;
}

function Providers() {
  const c = [["Banco", "Puede ofrecer productos de financiamiento según sus políticas."], ["Financiera", "Puede manejar diferentes requisitos y condiciones."], ["Dealer / Agencia", "Puede orientarte sobre las opciones disponibles para sus vehículos."]];
  return (
    <Section eyebrow="Banco, financiera o dealer" title="¿Quién puede ofrecer opciones?" tone="bg-surface">
      <div className="grid gap-4 md:grid-cols-3">{c.map(([t, d]) => <div key={t} className="rounded-3xl bg-card p-8"><h3 className="text-2xl font-extrabold text-ink">{t}</h3><p className="mt-3 text-ink/65">{d}</p></div>)}</div>
      <Note>Seminuevos.com no selecciona ni recomienda una opción específica.</Note>
    </Section>
  );
}

function Questions() {
  const q = ["¿Cuánto necesito de enganche?", "¿Cuánto pagaré al mes?", "¿Durante cuánto tiempo?", "¿Cuál es la tasa?", "¿Cuál es el CAT?", "¿Hay comisiones?", "¿Qué seguro necesito?", "¿Cuánto terminaré pagando?"];
  return (
    <Section eyebrow="Antes de decidir" title="Haz estas preguntas">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {q.map((t, i) => <div key={t} className="rounded-2xl border border-border p-6 transition hover:border-brand"><span className="text-sm font-extrabold text-brand">0{i + 1}</span><p className="mt-3 text-lg font-bold text-ink">{t}</p></div>)}
      </div>
    </Section>
  );
}

function Myths() {
  const m: [string, boolean, string?][] = [
    ["Todos los autos seminuevos pueden financiarse.", false, "Las condiciones dependen del vehículo y de las políticas de cada institución."],
    ["Un auto más antiguo puede tener condiciones diferentes.", true],
    ["Solo debo comparar la mensualidad.", false, "También conviene revisar plazo, enganche, tasa, CAT, comisiones y costo total."],
    ["Seminuevos.com decide si me aprueban.", false, "La aprobación corresponde a la institución que evalúe la solicitud."],
    ["Debo revisar el auto además de las condiciones de pago.", true],
  ];
  return (
    <Section eyebrow="Toca cada tarjeta" title="Financiamiento de seminuevos: mito o realidad" tone="bg-surface">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{m.map((x) => <Flip key={x[0]} data={x} />)}</div>
    </Section>
  );
}
function Flip({ data: [s, real, exp] }: { data: [string, boolean, string?] }) {
  const [f, setF] = useState(false);
  return (
    <button onClick={() => { setF(!f); track("used_financing_myth_interaction"); }} className="perspective h-56 text-left">
      <div className={`flip-inner relative h-full w-full ${f ? "rotate-y-180" : ""}`}>
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-2xl bg-card p-5"><p className="font-bold text-ink">“{s}”</p><span className="text-xs font-bold text-ink/40">¿Mito o realidad? →</span></div>
        <div className={`backface-hidden rotate-y-180 absolute inset-0 rounded-2xl p-5 ${real ? "bg-teal" : "bg-brand"} text-background`}><p className="text-2xl font-extrabold">{real ? "REALIDAD" : "MITO"}</p>{exp && <p className="mt-3 text-sm">{exp}</p>}</div>
      </div>
    </button>
  );
}

const cars = [
  { img: heroCar, marca: "Volvo", modelo: "XC90", año: 2021, precio: 789000, km: "42,000", ubic: "CDMX", dealer: "Agencia Norte", tipo: "SUV" },
  { img: sedan, marca: "Hyundai", modelo: "Accent", año: 2020, precio: 215000, km: "58,300", ubic: "Guadalajara", dealer: "Autos Vallarta", tipo: "Sedán" },
  { img: pickup, marca: "Ford", modelo: "F-150", año: 2019, precio: 545000, km: "71,200", ubic: "Monterrey", dealer: "Seminuevos MTY", tipo: "Pickup" },
  { img: couple, marca: "Volkswagen", modelo: "Polo", año: 2022, precio: 259000, km: "24,800", ubic: "Puebla", dealer: "Grupo Angelópolis", tipo: "Hatchback" },
  { img: sedan, marca: "Hyundai", modelo: "Elantra", año: 2021, precio: 318000, km: "39,500", ubic: "Querétaro", dealer: "Agencia Bajío", tipo: "Sedán" },
];

function Inventory() {
  const filters = ["Marca", "Modelo", "Precio", "Año", "Kilometraje", "Ubicación", "Tipo de auto"];
  const [act, setAct] = useState<string | null>(null);
  const [lead, ...rest] = cars;
  return (
    <section id="inventario" className="scroll-mt-20 bg-ink px-5 py-20 text-background md:py-28" onMouseEnter={() => track("used_financing_inventory_view")}>
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-3">Inventario</p>
        <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">Ahora encuentra tu seminuevo</h2>
        <p className="mt-4 max-w-xl text-background/70">Explora vehículos publicados por agencias y dealers en Seminuevos.com.</p>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {filters.map((f) => <button key={f} onClick={() => setAct(act === f ? null : f)} className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-bold transition ${act === f ? "border-brand bg-brand" : "border-background/25 hover:border-background"}`}>{f} ▾</button>)}
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <CarCard c={lead!} big />
          <div className="grid gap-4 sm:grid-cols-2">{rest.map((c) => <CarCard key={c.modelo} c={c} />)}</div>
        </div>
        <div className="mt-10 text-center"><a href="#" className={`${btn} bg-background text-ink`}>Ver todos los autos</a></div>
      </div>
    </section>
  );
}
function CarCard({ c, big }: { c: (typeof cars)[number]; big?: boolean }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-card text-ink">
      <img src={c.img} alt={`${c.marca} ${c.modelo}`} loading="lazy" className={`w-full object-cover ${big ? "aspect-[4/3]" : "aspect-[16/10]"}`} />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-ink/50">{c.año} · {c.km} km · {c.ubic}</p>
        <h3 className={`font-extrabold ${big ? "text-2xl" : ""}`}>{c.marca} {c.modelo}</h3>
        <p className={`font-extrabold text-brand ${big ? "text-2xl" : ""}`}>{mxn(c.precio)}</p>
        <p className="mt-1 text-xs text-ink/50">{c.dealer}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <a href="#" onClick={() => track("used_financing_vehicle_click")} className={`${btn} min-h-10 bg-brand px-4 text-brand-foreground`}>Ver auto</a>
          <a href="#" onClick={() => track("used_financing_dealer_contact")} className={`${btn} min-h-10 border border-ink/20 px-4`}>Consultar con dealer</a>
        </div>
      </div>
    </article>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Preguntas frecuentes sobre financiamiento de seminuevos">
      <div className="divide-y divide-border border-y border-border">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => { setOpen(open === i ? null : i); track("used_financing_faq_open"); }} className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-lg font-bold text-ink">
              {q}<span className={`text-2xl text-brand transition ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && <p className="pb-5 text-ink/70">{a}</p>}
          </div>
        ))}
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="bg-brand px-5 py-20 text-brand-foreground">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">Entiende tus opciones.<br />Encuentra tu seminuevo.</h2>
        <p className="mx-auto mt-5 max-w-xl opacity-90">Explora autos publicados por agencias y dealers y consulta directamente las opciones disponibles.</p>
        <a href="#inventario" className={`${btn} mt-8 bg-background text-ink`}>Explorar seminuevos</a>
        <p className="mt-6 text-xs opacity-75">Las condiciones de financiamiento dependen del dealer, agencia o institución correspondiente.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface px-5 pb-28 pt-12 md:pb-12">
      <div className="mx-auto max-w-6xl">
        <Logo />
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-ink/60">Seminuevos.com es un portal de anuncios. No otorga directamente financiamiento, no determina tasas, enganches, mensualidades, plazos ni aprobaciones. Las opciones y condiciones dependen del dealer, agencia o institución correspondiente.</p>
      </div>
    </footer>
  );
}
