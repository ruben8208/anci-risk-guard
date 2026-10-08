# Compliance Compass

genera una pagina con estos datos Crea una Single Page Application (SPA) profesional, moderna y totalmente interactiva para "MD Solutions Security", una consultora de ciberseguridad y cumplimiento normativo (Ley 21.719 de Protección de Datos Personales y Ley 21.663 Marco de Ciberseguridad / ANCI en Chile).

### 1. Identidad Visual y Estilo (UI/UX)

- **Tema:** Dark mode corporativo con estética de ciberseguridad (fondos azul medianoche/slate profundo `#0B0F19`, acentos en verde cian/neón `#00FFA3` y azul eléctrico `#3B82F6`, alertas de riesgo en rojo/ámbar).

- **Estilo:** Tailwind CSS moderno, tarjetas con `backdrop-blur` (glassmorphism), bordes sutiles, micro-interacciones suaves y badges de estado.

- **Header:** Logotipo con texto "MD Solutions Security", badge "Auditoría ANCI & Ley 21.719", botón de "Solicitar Asesoría Experta" y selector rápido de navegación.

---

### 2. Estructura de la Página

1. **Hero Section:**

   - Título impactante: *"Diagnóstico de Cumplimiento Regulatorio y Calculadora de Riesgo Sancionatorio ANCI / Ley 21.719"*.

   - Subtítulo: *"Evalúe el nivel de madurez de su organización, identifique brechas críticas y calcule su exposición a multas según su clasificación (OIV, Servicios Esenciales o Régimen General)."*

   - Indicador dinámico de valor UTM actualizado en CLP (ej. $67.000 CLP / configurable).

2. **Panel de Configuración de la Entidad:**

   - Selector tipo radio/cards para la **Clasificación del Sujeto Obligado**:

     - **Operador de Importancia Vital (OIV):** Nivel de exigencia crítico y multas más severas.

     - **Prestador de Servicios Esenciales (SE):** Obligaciones prioritarias de notificación y continuidad.

     - **Entidad General / Común:** Sujetos obligados bajo régimen estándar.

   - Input opcional: Ingresos anuales de la empresa (CLP) para cálculo de tope porcentual (hasta 2% / 4% en reincidencia).

3. **Checklist Interactivo de Cumplimiento (Evaluación Dinámica):**

   - Organizado en acordeones o pestañas por dominios normativos:

     - **Gobernanza y Políticas:** Designación de Oficial de Seguridad/DPO, políticas documentadas de SGSI.

     - **Gestión de Riesgos y Controles Técnicos:** Cifrado, control de accesos, gestión de vulnerabilidades, backups inmutables.

     - **Respuesta a Incidentes y Notificación ANCI:** Protocolo de notificación de brechas en plazos legales (< 3 horas para incidentes significativos).

     - **Gestión de Proveedores y Terceros:** Cláusulas de ciberseguridad y auditoría a la cadena de suministro.

     - **Continuidad Operacional:** Plan BCP/DRP testeado semestralmente.

   - Cada ítem debe tener un toggle / checkbox ("Cumple", "En Progreso", "No Cumple") con una ponderación de impacto asociada (Leve, Grave, Gravísima).

4. **Dashboard de Resultados en Tiempo Real (Scoreboard):**

   - **Medidor Circular de Cumplimiento (0% a 100%):** Con barra de progreso animada y categorización: *Riesgo Crítico (0-49%)*, *Riesgo Medio (50-79%)*, *Cumplimiento Adecuado (80-100%)*.

   - **Calculadora de Exposición a Multas ANCI / Ley 21.719:**

     - Cálculo automático del monto potencial de sanción según las faltas detectadas y el tipo de entidad seleccionada:

       - Faltas Leves (hasta 5.000 UTM).

       - Faltas Graves (hasta 10.000 UTM / 2% ventas).

       - Faltas Gravísimas / OIV (hasta 20.000 - 40.000 UTM / 4% ventas).

     - Mostrar el total arriesgado tanto en **UTM** como en **Pesos Chilenos (CLP)**.

   - **Botón para Generar Reporte / Resumen:** Descarga o visualización en modal de un resumen de brechas detectadas listo para presentar a gerencia.

5. **Servicios de Asesoría - MD Solutions Security:**

   - Tarjetas de servicio: *Auditoría de Brecha (Gap Analysis)*, *Implementación SGSI / ISO 27001*, *Oficial de Seguridad como Servicio (vCISO)*, *Simulacros y Respuesta a Incidentes ante la ANCI*.

6. **Formulario de Contacto y Footer:**

   - Formulario de contacto pre-llenado con el score de la evaluación para agendar un diagnóstico presencial/remoto.

   - Datos de contacto de la empresa: **MD Solutions Security**.

   - Footer con disclaimer legal: *"Herramienta de autodiagnóstico referencial basada en la normativa chilena vigente supervisada por la ANCI."*

---

### 3. Lógica y Estado (React / TypeScript)

- Manejar el estado reactivo con React State/Zustand:

  - `porcentajeCumplimiento = (puntosCumplidos / totalPuntos) * 100`

  - `multaEstimadaUTM = f(tipoEntidad, infraccionesLeves, infraccionesGraves, infraccionesGravisimas)`

- Permitir reiniciar el formulario o precargar un ejemplo para pruebas inmediatas.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cfade13a-f0d1-438e-80a0-9277efa606ec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
