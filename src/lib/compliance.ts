export type EntityType = "OIV" | "SE" | "GENERAL";
export type Severity = "LEVE" | "GRAVE" | "GRAVISIMA";
export type Status = "CUMPLE" | "PROGRESO" | "NO_CUMPLE";

export interface ChecklistItem {
  id: string;
  title: string;
  detail: string;
  severity: Severity;
  reference?: string;
}

export interface Domain {
  id: string;
  name: string;
  summary: string;
  items: ChecklistItem[];
}

export const ENTITIES: Record<
  EntityType,
  { label: string; short: string; description: string }
> = {
  OIV: {
    label: "Operador de Importancia Vital (OIV)",
    short: "OIV",
    description:
      "Proveedor calificado formalmente por la ANCI, sujeto a obligaciones reforzadas y sanciones duplicadas.",
  },
  SE: {
    label: "Prestador de Servicios Esenciales (SE)",
    short: "Servicios Esenciales",
    description:
      "Institución del catálogo legal, obligada a prevenir, resolver y reportar incidentes significativos.",
  },
  GENERAL: {
    label: "Evaluación ISO/IEC 27001",
    short: "Solo ISO 27001",
    description:
      "Diagnóstico voluntario del SGSI para organizaciones no calificadas como SE u OIV; sin cálculo sancionatorio ANCI.",
  },
};

export const SEVERITY_LABEL: Record<Severity, string> = {
  LEVE: "Leve",
  GRAVE: "Grave",
  GRAVISIMA: "Gravísima",
};

/** Topes referenciales en UTM por severidad y clasificación del sujeto obligado. */
export const FINE_MATRIX: Record<EntityType, Record<Severity, number>> = {
  OIV: { LEVE: 5000, GRAVE: 10000, GRAVISIMA: 40000 },
  SE: { LEVE: 5000, GRAVE: 10000, GRAVISIMA: 20000 },
  GENERAL: { LEVE: 0, GRAVE: 0, GRAVISIMA: 0 },
};

export const SEVERITY_WEIGHT: Record<Severity, number> = {
  LEVE: 1,
  GRAVE: 2,
  GRAVISIMA: 3,
};

export const DOMAINS: Domain[] = [
  {
    id: "gobernanza",
    name: "Gobernanza y Políticas",
    summary: "Roles, responsabilidades y documentación formal del SGSI.",
    items: [
      {
        id: "gob-1",
        title: "Alcance y contexto del SGSI definidos",
        detail:
          "Partes interesadas, procesos, sedes, interfaces y límites documentados conforme a las cláusulas 4.1–4.3.",
        severity: "GRAVE",
      },
      {
        id: "gob-2",
        title: "Oficial de Seguridad de la Información designado",
        detail:
          "Contraparte oficial ante la ANCI con dedicación y atribuciones documentadas.",
        severity: "GRAVISIMA",
      },
      {
        id: "gob-3",
        title: "Política de Seguridad de la Información aprobada",
        detail: "Aprobada por la alta dirección, difundida y revisada anualmente.",
        severity: "GRAVE",
      },
      {
        id: "gob-4",
        title: "Objetivos de seguridad medibles",
        detail:
          "Objetivos alineados al negocio, con responsables, métricas, recursos y fechas conforme a la cláusula 6.2.",
        severity: "GRAVE",
      },
      {
        id: "gob-5",
        title: "Auditoría interna y revisión por la dirección",
        detail: "Programa de auditoría, resultados, decisiones y acciones de mejora conforme a las cláusulas 9.2 y 9.3.",
        severity: "LEVE",
      },
    ],
  },
  {
    id: "riesgos",
    name: "Gestión de Riesgos y Controles Técnicos",
    summary: "Controles preventivos, detectivos y de recuperación.",
    items: [
      {
        id: "tec-1",
        title: "Cifrado de datos en tránsito y en reposo",
        detail: "TLS vigente y cifrado de bases con datos personales o sensibles.",
        severity: "GRAVISIMA",
      },
      {
        id: "tec-2",
        title: "Control de accesos y MFA en accesos privilegiados",
        detail: "Mínimo privilegio, revisión trimestral de cuentas y MFA obligatorio.",
        severity: "GRAVISIMA",
      },
      {
        id: "tec-3",
        title: "Gestión de vulnerabilidades y parches",
        detail: "Escaneos periódicos, SLA de remediación y pruebas de intrusión anuales.",
        severity: "GRAVE",
      },
      {
        id: "tec-4",
        title: "Backups inmutables y probados",
        detail: "Copias 3-2-1, aisladas de la red y con pruebas de restauración registradas.",
        severity: "GRAVISIMA",
      },
      {
        id: "tec-5",
        title: "Monitoreo y registro de eventos (logs)",
        detail: "Centralización de logs con retención suficiente para investigación forense.",
        severity: "GRAVE",
      },
      {
        id: "tec-6",
        title: "Inventario y clasificación de activos de información",
        detail: "Propietarios, clasificación, etiquetado y reglas de manejo alineadas con controles A.5.9–A.5.13.",
        severity: "LEVE",
      },
    ],
  },
  {
    id: "incidentes",
    name: "Respuesta a Incidentes y Notificación ANCI",
    summary: "Detección, escalamiento y cumplimiento de plazos legales.",
    items: [
      {
        id: "inc-1",
        title: "Protocolo de notificación en menos de 3 horas",
        detail:
          "Alerta temprana a la ANCI ante incidentes de efecto significativo dentro del plazo legal.",
        severity: "GRAVISIMA",
      },
      {
        id: "inc-2",
        title: "Segunda notificación e informe final a la ANCI",
        detail: "Flujo documentado para completar las etapas posteriores al alerta temprana y conservar evidencia.",
        severity: "GRAVE",
      },
      {
        id: "inc-3",
        title: "Plan de respuesta a incidentes documentado",
        detail: "Roles, matriz de escalamiento, clasificación de severidad y vocería.",
        severity: "GRAVE",
      },
      {
        id: "inc-4",
        title: "Registro y análisis post-incidente",
        detail: "Bitácora de incidentes con causa raíz y acciones correctivas verificadas.",
        severity: "LEVE",
      },
    ],
  },
  {
    id: "proveedores",
    name: "Gestión de Proveedores y Terceros",
    summary: "Riesgo de cadena de suministro y encargados de tratamiento.",
    items: [
      {
        id: "pro-1",
        title: "Cláusulas de ciberseguridad en contratos",
        detail: "Obligaciones de notificación, auditoría y niveles de servicio de seguridad.",
        severity: "GRAVE",
      },
      {
        id: "pro-2",
        title: "Acuerdos de seguridad con proveedores vigentes",
        detail: "Requisitos de seguridad, acceso, notificación y término del servicio según controles A.5.19–A.5.22.",
        severity: "GRAVE",
      },
      {
        id: "pro-3",
        title: "Due diligence y auditoría a proveedores críticos",
        detail: "Evaluación previa y reevaluación periódica con evidencia formal.",
        severity: "LEVE",
      },
      {
        id: "pro-4",
        title: "Seguridad de servicios cloud y cadena TIC",
        detail: "Adquisición, uso, cambios y salida de servicios cloud, más control de la cadena de suministro TIC.",
        severity: "GRAVISIMA",
      },
    ],
  },
  {
    id: "continuidad",
    name: "Continuidad Operacional",
    summary: "Resiliencia y recuperación ante interrupciones graves.",
    items: [
      {
        id: "con-1",
        title: "Plan de continuidad del negocio (BCP) vigente",
        detail: "Análisis de impacto, RTO/RPO definidos por proceso crítico.",
        severity: "GRAVE",
      },
      {
        id: "con-2",
        title: "Plan de recuperación ante desastres (DRP)",
        detail: "Procedimientos técnicos de recuperación y sitio alternativo.",
        severity: "GRAVISIMA",
      },
      {
        id: "con-3",
        title: "Simulacros testeados semestralmente",
        detail: "Ejercicios con acta de resultados y plan de mejora.",
        severity: "GRAVE",
      },
      {
        id: "con-4",
        title: "Gestión de crisis y comunicación",
        detail: "Vocería, plantillas de comunicación y canales alternos definidos.",
        severity: "LEVE",
      },
    ],
  },
];

export const ALL_ITEMS = DOMAINS.flatMap((d) => d.items);

export const STATUS_SCORE: Record<Status, number> = {
  CUMPLE: 1,
  PROGRESO: 0.5,
  NO_CUMPLE: 0,
};

/** Factor de exposición: incumplimiento total pesa 1, en progreso pesa 0.4. */
const EXPOSURE_FACTOR: Record<Status, number> = {
  CUMPLE: 0,
  PROGRESO: 0.4,
  NO_CUMPLE: 1,
};

export interface Assessment {
  compliancePercent: number;
  level: { label: string; tone: "critical" | "medium" | "good" };
  counts: Record<Severity, { open: number; progress: number }>;
  fineUTM: number;
  fineCLP: number;
  cappedByRevenue: boolean;
  revenueCapCLP: number | null;
  gaps: { item: ChecklistItem; status: Status; domain: string }[];
}

export function computeAssessment(
  answers: Record<string, Status>,
  entity: EntityType,
  utmValue: number,
  _annualRevenueCLP: number | null,
  _repeatOffender: boolean,
): Assessment {
  let weighted = 0;
  let weightTotal = 0;
  const counts: Record<Severity, { open: number; progress: number }> = {
    LEVE: { open: 0, progress: 0 },
    GRAVE: { open: 0, progress: 0 },
    GRAVISIMA: { open: 0, progress: 0 },
  };
  const gaps: Assessment["gaps"] = [];
  let fineUTM = 0;
  const matrix = FINE_MATRIX[entity];

  for (const domain of DOMAINS) {
    for (const item of domain.items) {
      const status = answers[item.id] ?? "NO_CUMPLE";
      const w = SEVERITY_WEIGHT[item.severity];
      weightTotal += w;
      weighted += w * STATUS_SCORE[status];

      if (status !== "CUMPLE") {
        if (status === "NO_CUMPLE") counts[item.severity].open += 1;
        else counts[item.severity].progress += 1;
        gaps.push({ item, status, domain: domain.name });
      }
      fineUTM += matrix[item.severity] * EXPOSURE_FACTOR[status] * 0.25;
    }
  }

  const severityCap = Math.max(
    ...(["GRAVISIMA", "GRAVE", "LEVE"] as Severity[]).map((s) =>
      counts[s].open + counts[s].progress > 0 ? matrix[s] : 0,
    ),
    0,
  );
  fineUTM = Math.min(fineUTM, severityCap);
  fineUTM = Math.round(fineUTM);

  let fineCLP = fineUTM * utmValue;
  const revenueCapCLP = null;
  const cappedByRevenue = false;

  const compliancePercent = weightTotal ? (weighted / weightTotal) * 100 : 0;
  const level =
    compliancePercent >= 80
      ? { label: "Cumplimiento Adecuado", tone: "good" as const }
      : compliancePercent >= 50
        ? { label: "Riesgo Medio", tone: "medium" as const }
        : { label: "Riesgo Crítico", tone: "critical" as const };

  return {
    compliancePercent,
    level,
    counts,
    fineUTM,
    fineCLP,
    cappedByRevenue,
    revenueCapCLP,
    gaps,
  };
}

export const SAMPLE_ANSWERS: Record<string, Status> = {
  "gob-1": "CUMPLE",
  "gob-2": "PROGRESO",
  "gob-3": "CUMPLE",
  "gob-4": "PROGRESO",
  "gob-5": "NO_CUMPLE",
  "tec-1": "CUMPLE",
  "tec-2": "PROGRESO",
  "tec-3": "CUMPLE",
  "tec-4": "NO_CUMPLE",
  "tec-5": "CUMPLE",
  "tec-6": "NO_CUMPLE",
  "inc-1": "NO_CUMPLE",
  "inc-2": "PROGRESO",
  "inc-3": "CUMPLE",
  "inc-4": "CUMPLE",
  "pro-1": "CUMPLE",
  "pro-2": "PROGRESO",
  "pro-3": "NO_CUMPLE",
  "pro-4": "PROGRESO",
  "con-1": "CUMPLE",
  "con-2": "PROGRESO",
  "con-3": "NO_CUMPLE",
  "con-4": "CUMPLE",
};

export const clp = (n: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

export const num = (n: number) => new Intl.NumberFormat("es-CL").format(Math.round(n));
