import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ShieldCheck,
  Radar,
  Siren,
  Network,
  Activity,
  RotateCcw,
  Sparkles,
  FileText,
  Lock,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComplianceGauge } from "@/components/compliance-gauge";
import {
  ALL_ITEMS,
  DOMAINS,
  ENTITIES,
  SEVERITY_LABEL,
  SAMPLE_ANSWERS,
  clp,
  computeAssessment,
  num,
  type EntityType,
  type Severity,
  type Status,
} from "@/lib/compliance";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Diagnóstico ANCI y Ley 21.719 | MD Solutions Security",
      },
      {
        name: "description",
        content:
          "Autodiagnóstico de cumplimiento ANCI y Ley 21.719: mida su madurez, detecte brechas y calcule su exposición a multas en UTM y CLP.",
      },
      {
        property: "og:title",
        content: "Diagnóstico ANCI y Ley 21.719 | MD Solutions Security",
      },
      {
        property: "og:description",
        content:
          "Calculadora de riesgo sancionatorio y checklist interactivo de ciberseguridad para OIV, Servicios Esenciales y régimen general.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STATUS_OPTIONS: { value: Status; label: string; icon: typeof CheckCircle2 }[] = [
  { value: "CUMPLE", label: "Cumple", icon: CheckCircle2 },
  { value: "PROGRESO", label: "En progreso", icon: Clock },
  { value: "NO_CUMPLE", label: "No cumple", icon: AlertTriangle },
];

const SEVERITY_STYLE: Record<Severity, string> = {
  LEVE: "border-muted-foreground/40 text-muted-foreground bg-muted/40",
  GRAVE: "border-warning/50 text-warning bg-warning/10",
  GRAVISIMA: "border-destructive/50 text-destructive bg-destructive/10",
};

const SERVICES = [
  {
    icon: Radar,
    title: "Auditoría de Brecha (Gap Analysis)",
    text: "Levantamiento técnico y legal contra la Ley 21.663 y 21.719, con hoja de ruta priorizada por riesgo sancionatorio.",
  },
  {
    icon: ShieldCheck,
    title: "Implementación SGSI / ISO 27001",
    text: "Diseño e implantación del sistema de gestión, políticas, controles y evidencia auditable de extremo a extremo.",
  },
  {
    icon: Lock,
    title: "Oficial de Seguridad como Servicio (vCISO)",
    text: "Contraparte formal ante la ANCI, gobierno de seguridad, comité de riesgos y reporte ejecutivo mensual.",
  },
  {
    icon: Siren,
    title: "Simulacros y Respuesta ante la ANCI",
    text: "Ejercicios de crisis, tabletops y acompañamiento en notificación de incidentes dentro de los plazos legales.",
  },
];

function Index() {
  const [entity, setEntity] = useState<EntityType>("SE");
  const [utmValue, setUtmValue] = useState(67000);
  const [revenue, setRevenue] = useState<string>("");
  const [repeat, setRepeat] = useState(false);
  const [answers, setAnswers] = useState<Record<string, Status>>({});
  const [reportOpen, setReportOpen] = useState(false);

  const revenueCLP = revenue ? Number(revenue.replace(/\D/g, "")) : 0;

  const assessment = useMemo(
    () => computeAssessment(answers, entity, utmValue, revenueCLP || null, repeat),
    [answers, entity, utmValue, revenueCLP, repeat],
  );

  const answered = ALL_ITEMS.filter((i) => answers[i.id]).length;

  const setStatus = (id: string, value: Status) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const reset = () => {
    setAnswers({});
    setRepeat(false);
    setRevenue("");
    toast.info("Evaluación reiniciada");
  };

  const loadSample = () => {
    setAnswers({ ...SAMPLE_ANSWERS });
    setRevenue("2500000000");
    toast.success("Ejemplo precargado para pruebas");
  };

  const domainProgress = (domainId: string) => {
    const items = DOMAINS.find((d) => d.id === domainId)!.items;
    const ok = items.filter((i) => answers[i.id] === "CUMPLE").length;
    return (ok / items.length) * 100;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/40">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight">MD Solutions Security</p>
              <p className="text-[11px] text-muted-foreground">
                Ciberseguridad &amp; Cumplimiento Normativo
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent md:inline">
            Auditoría ANCI &amp; Ley 21.719
          </span>
          <nav className="ml-auto hidden items-center gap-1 text-sm text-muted-foreground lg:flex">
            {[
              ["#configuracion", "Configuración"],
              ["#checklist", "Checklist"],
              ["#resultados", "Resultados"],
              ["#servicios", "Servicios"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-md px-3 py-1.5 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="ml-auto lg:ml-0">
            <Button asChild size="sm">
              <a href="#contacto">Solicitar Asesoría Experta</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-glow relative overflow-hidden border-b border-border/60">
        <div className="grid-lines absolute inset-0 opacity-20" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Activity className="h-3.5 w-3.5" /> Ley 21.663 · Ley 21.719 · ANCI
          </span>
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            Diagnóstico de Cumplimiento Regulatorio y{" "}
            <span className="text-neon">Calculadora de Riesgo Sancionatorio</span> ANCI /
            Ley 21.719
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base text-muted-foreground sm:text-lg">
            Evalúe el nivel de madurez de su organización, identifique brechas críticas y
            calcule su exposición a multas según su clasificación (OIV, Servicios
            Esenciales o Régimen General).
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="#checklist">
                Iniciar autodiagnóstico <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="secondary" onClick={loadSample}>
              <Sparkles className="mr-1 h-4 w-4" /> Precargar ejemplo
            </Button>
          </div>

          <div className="glass-panel mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-4 rounded-xl px-5 py-4">
            <div className="text-left">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                Valor UTM configurable
              </p>
              <p className="text-xl font-semibold text-primary tabular-nums">
                {clp(utmValue)}
              </p>
            </div>
            <Input
              type="number"
              value={utmValue}
              min={1000}
              onChange={(e) => setUtmValue(Number(e.target.value) || 0)}
              className="w-32"
              aria-label="Valor de la UTM en pesos chilenos"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Configuración de la entidad */}
        <section id="configuracion" className="py-16">
          <SectionTitle
            eyebrow="Paso 1"
            title="Panel de configuración de la entidad"
            subtitle="La clasificación del sujeto obligado define el nivel de exigencia y los topes de multa aplicables."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {(Object.keys(ENTITIES) as EntityType[]).map((key) => {
              const active = entity === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setEntity(key)}
                  aria-pressed={active}
                  className={`glass-panel rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    active
                      ? "ring-2 ring-primary/70"
                      : "ring-1 ring-transparent hover:ring-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{ENTITIES[key].short}</p>
                    <span
                      className={`h-3 w-3 rounded-full ${active ? "bg-primary" : "bg-muted"}`}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {ENTITIES[key].description}
                  </p>
                  <p className="mt-3 text-xs text-accent">
                    Tope: {ENTITIES[key].capPercent}% de ventas anuales
                  </p>
                </button>
              );
            })}
          </div>

          <div className="glass-panel mt-6 grid gap-6 rounded-xl p-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="revenue">Ingresos anuales (CLP) — opcional</Label>
              <Input
                id="revenue"
                inputMode="numeric"
                placeholder="Ej: 2.500.000.000"
                value={revenue ? num(Number(revenue.replace(/\D/g, ""))) : ""}
                onChange={(e) => setRevenue(e.target.value.replace(/\D/g, ""))}
              />
              <p className="text-xs text-muted-foreground">
                Permite calcular el tope porcentual de la sanción (hasta{" "}
                {ENTITIES[entity].capPercent}%, duplicado en reincidencia).
              </p>
            </div>
            <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-secondary/40 p-4">
              <div>
                <p className="text-sm font-medium">Reincidencia declarada</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Duplica los topes de multa y el porcentaje sobre ventas.
                </p>
              </div>
              <Switch
                checked={repeat}
                onCheckedChange={setRepeat}
                aria-label="Reincidencia"
              />
            </div>
          </div>
        </section>

        {/* Checklist + Dashboard */}
        <section id="checklist" className="pb-16">
          <SectionTitle
            eyebrow="Paso 2"
            title="Checklist interactivo de cumplimiento"
            subtitle={`Evalúe cada control por dominio normativo. ${answered} de ${ALL_ITEMS.length} ítems respondidos.`}
          />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-4">
              <Accordion
                type="multiple"
                defaultValue={[DOMAINS[0].id]}
                className="space-y-4"
              >
                {DOMAINS.map((domain) => (
                  <AccordionItem
                    key={domain.id}
                    value={domain.id}
                    className="glass-panel overflow-hidden rounded-xl border-b-0 px-4"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex w-full flex-col gap-2 pr-2 text-left">
                        <div className="flex items-center gap-2">
                          <Network className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{domain.name}</span>
                          <span className="ml-auto text-xs tabular-nums text-muted-foreground">
                            {domainProgress(domain.id).toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={domainProgress(domain.id)} className="h-1.5" />
                        <span className="text-xs font-normal text-muted-foreground">
                          {domain.summary}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3 pb-5">
                      {domain.items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-lg border border-border/60 bg-secondary/30 p-4"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <p className="text-sm font-medium">{item.title}</p>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${SEVERITY_STYLE[item.severity]}`}
                            >
                              {SEVERITY_LABEL[item.severity]}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.detail}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((opt) => {
                              const active = answers[item.id] === opt.value;
                              const Icon = opt.icon;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setStatus(item.id, opt.value)}
                                  aria-pressed={active}
                                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                    active
                                      ? opt.value === "CUMPLE"
                                        ? "border-primary/60 bg-primary/15 text-primary"
                                        : opt.value === "PROGRESO"
                                          ? "border-warning/60 bg-warning/15 text-warning"
                                          : "border-destructive/60 bg-destructive/15 text-destructive"
                                      : "border-border/70 text-muted-foreground hover:bg-secondary"
                                  }`}
                                >
                                  <Icon className="h-3.5 w-3.5" />
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" onClick={loadSample}>
                  <Sparkles className="mr-1 h-4 w-4" /> Precargar ejemplo
                </Button>
                <Button variant="ghost" onClick={reset}>
                  <RotateCcw className="mr-1 h-4 w-4" /> Reiniciar evaluación
                </Button>
              </div>
            </div>

            {/* Scoreboard */}
            <aside id="resultados" className="lg:sticky lg:top-24 lg:self-start">
              <div className="glass-panel space-y-6 rounded-2xl p-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Dashboard en tiempo real
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {ENTITIES[entity].label}
                  </p>
                </div>

                <ComplianceGauge
                  percent={assessment.compliancePercent}
                  label={assessment.level.label}
                  tone={assessment.level.tone}
                />

                <div className="grid grid-cols-3 gap-2 text-center">
                  {(["LEVE", "GRAVE", "GRAVISIMA"] as Severity[]).map((s) => (
                    <div
                      key={s}
                      className="rounded-lg border border-border/60 bg-secondary/40 p-3"
                    >
                      <p className="text-lg font-semibold tabular-nums">
                        {assessment.counts[s].open}
                      </p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {SEVERITY_LABEL[s]}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        +{assessment.counts[s].progress} en curso
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
                  <p className="text-xs uppercase tracking-widest text-destructive">
                    Exposición sancionatoria estimada
                  </p>
                  <p className="mt-2 text-3xl font-bold tabular-nums">
                    {num(assessment.fineUTM)} UTM
                  </p>
                  <p className="text-lg font-semibold tabular-nums text-muted-foreground">
                    {clp(assessment.fineCLP)}
                  </p>
                  {assessment.cappedByRevenue && (
                    <p className="mt-2 text-xs text-warning">
                      Monto limitado por el tope de {ENTITIES[entity].capPercent}
                      {repeat ? "% x2" : "%"} de ventas anuales.
                    </p>
                  )}
                  <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                    <li>Leves: hasta 5.000 UTM</li>
                    <li>Graves: hasta 10.000 UTM / 2% ventas</li>
                    <li>Gravísimas / OIV: 20.000 – 40.000 UTM / 4% ventas</li>
                  </ul>
                </div>

                <Button className="w-full" onClick={() => setReportOpen(true)}>
                  <FileText className="mr-1 h-4 w-4" /> Generar reporte de brechas
                </Button>
              </div>
            </aside>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="border-t border-border/60 py-16">
          <SectionTitle
            eyebrow="MD Solutions Security"
            title="Servicios de asesoría"
            subtitle="Acompañamiento experto para cerrar brechas y sostener el cumplimiento en el tiempo."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="glass-panel group rounded-xl p-5 transition-transform duration-200 hover:-translate-y-1"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent ring-1 ring-accent/30">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-semibold">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="border-t border-border/60 py-16">
          <SectionTitle
            eyebrow="Paso 3"
            title="Agende su diagnóstico experto"
            subtitle="El formulario incluye automáticamente el resultado de su autoevaluación."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <form
              className="glass-panel grid gap-4 rounded-xl p-6 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Solicitud enviada", {
                  description: "Un consultor de MD Solutions Security le contactará.",
                });
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre y cargo</Label>
                <Input id="nombre" required placeholder="Ana Pérez — Gerente de TI" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="empresa">Organización</Label>
                <Input id="empresa" required placeholder="Nombre de la entidad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email corporativo</Label>
                <Input id="email" type="email" required placeholder="ana@empresa.cl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fono">Teléfono</Label>
                <Input id="fono" placeholder="+56 9 ..." />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="mensaje">Contexto</Label>
                <Textarea
                  id="mensaje"
                  rows={4}
                  defaultValue={`Clasificación: ${ENTITIES[entity].label}. Cumplimiento: ${assessment.compliancePercent.toFixed(0)}% (${assessment.level.label}). Exposición estimada: ${num(assessment.fineUTM)} UTM (${clp(assessment.fineCLP)}). Brechas abiertas: ${assessment.gaps.length}.`}
                  key={`${entity}-${assessment.fineUTM}-${assessment.gaps.length}`}
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Solicitar diagnóstico
                </Button>
              </div>
            </form>

            <div className="glass-panel space-y-4 rounded-xl p-6">
              <p className="font-semibold">MD Solutions Security</p>
              <p className="text-sm text-muted-foreground">
                Consultoría en ciberseguridad y cumplimiento normativo chileno.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  contacto@mdsolutionssecurity.cl
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  +56 2 2345 6789
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Santiago, Chile — atención remota y presencial
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 bg-secondary/20 py-8">
        <div className="mx-auto max-w-7xl space-y-3 px-4 text-center text-xs text-muted-foreground sm:px-6">
          <p className="font-semibold text-foreground">MD Solutions Security</p>
          <p>
            Herramienta de autodiagnóstico referencial basada en la normativa chilena
            vigente supervisada por la ANCI. No constituye asesoría legal ni certificación
            de cumplimiento.
          </p>
          <p>© {new Date().getFullYear()} MD Solutions Security. Todos los derechos reservados.</p>
        </div>
      </footer>

      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resumen ejecutivo de brechas</DialogTitle>
            <DialogDescription>
              {ENTITIES[entity].label} · UTM referencial {clp(utmValue)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric label="Cumplimiento" value={`${assessment.compliancePercent.toFixed(0)}%`} />
            <Metric label="Nivel de riesgo" value={assessment.level.label} />
            <Metric label="Exposición" value={`${num(assessment.fineUTM)} UTM`} />
          </div>
          <p className="text-sm text-muted-foreground">
            Monto potencial en pesos: <strong>{clp(assessment.fineCLP)}</strong>
            {assessment.revenueCapCLP !== null &&
              ` · Tope por ventas: ${clp(assessment.revenueCapCLP)}`}
          </p>
          <div className="space-y-2">
            {assessment.gaps.length === 0 ? (
              <p className="text-sm text-primary">
                Sin brechas registradas: todos los controles evaluados cumplen.
              </p>
            ) : (
              assessment.gaps.map(({ item, status, domain }) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-border/60 bg-secondary/30 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${SEVERITY_STYLE[item.severity]}`}
                    >
                      {SEVERITY_LABEL[item.severity]}
                    </span>
                    <span className="text-xs text-muted-foreground">{domain}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground">
                      {status === "PROGRESO" ? "En progreso" : "No cumple"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))
            )}
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              window.print();
            }}
          >
            Descargar / imprimir reporte
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-secondary/40 p-3">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">{subtitle}</p>
    </div>
  );
}
