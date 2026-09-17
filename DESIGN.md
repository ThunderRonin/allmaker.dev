---
name: Terminal Console OLED
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e8bcbb'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#ae8787'
  outline-variant: '#5e3f3e'
  surface-tint: '#ffb3b3'
  primary: '#ffb3b3'
  on-primary: '#680014'
  primary-container: '#ff525f'
  on-primary-container: '#5b0011'
  inverse-primary: '#bf002e'
  secondary: '#ffb4a8'
  on-secondary: '#690000'
  secondary-container: '#920703'
  on-secondary-container: '#ff9a8a'
  tertiary: '#00e475'
  on-tertiary: '#003918'
  tertiary-container: '#00a754'
  on-tertiary-container: '#003114'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b3'
  on-primary-fixed: '#400009'
  on-primary-fixed-variant: '#920021'
  secondary-fixed: '#ffdad4'
  secondary-fixed-dim: '#ffb4a8'
  on-secondary-fixed: '#410000'
  on-secondary-fixed-variant: '#920703'
  tertiary-fixed: '#62ff96'
  tertiary-fixed-dim: '#00e475'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#005226'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
  obsidian-base: '#000000'
  surface-level-1: '#040406'
  surface-level-2: '#070709'
  surface-level-3: '#0a0a0d'
  border-hairline: '#141418'
  border-structural: '#1e1e24'
  text-phosphor: '#e2e4ea'
  text-slate: '#8a8d9b'
  telemetry-charcoal: '#4a4d5a'
  telemetry-deep: '#2e303a'
  laser-crimson: '#ff1744'
  arterial-ruby: '#8b0000'
  ruby-border: '#991b1b'
  phosphor-emerald: '#00e676'
  emerald-cyan: '#10b981'
typography:
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: JetBrains Mono
    fontSize: 1.625rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: JetBrains Mono
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.625rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 1.125rem
    fontWeight: '500'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
    letterSpacing: 0em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1.125rem
    letterSpacing: 0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
  code-snippet:
    fontFamily: JetBrains Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system expresses the discipline of a low-level systems engineering terminal and mission-critical telemetry display, calibrated specifically for **OLED 3AM** optical conditions. Built for architects, kernel hackers, and infrastructure engineers, it discards consumer gloss, decorative curves, and ambient blurs in favor of uncompromising, razor-sharp computational rigor.

The visual ethos blends **Sub-Pixel Monospace Telemetry** with **OLED Minimalist Brutalism**:
- **Absolute Optical Depth:** Employs true OLED pixel shutoff (`#000000`) across wide canvases, virtually eliminating backlight bleed and ocular fatigue during deep-night operations.
- **Zero-Tolerance Geometry:** Every card, line separator, tag, and terminal trigger conforms to strict 1-pixel hairline precision with sharp right angles.
- **Low-Glare Luminescence:** Off-white phosphor and muted cold slate replace high-beam text whites, preventing visual blooming against the pure black substrate.
- **Precision Telemetric Accents:** High-voltage electric laser crimson cuts through the dark for execution pointers and critical alerts, balanced by arterial ruby structural badges and phosphor emerald heartbeats.

## Colors

The color palette is calibrated for true OLED black levels and zero ambient glare. Luminance is strictly rationed: luminous energy is preserved solely for actionable signals and critical diagnostics.

### Substrate & Planar Tiers
- **OLED Ground (`#000000`):** Pure optical shutoff. Backlight remains inactive for maximum contrast ratio and power efficiency.
- **Deep Obsidian Surfaces:** `#040406` (primary panel backplate), `#070709` (elevated cards, console wells), and `#0a0a0d` (interactive states, hovered rows, active command bars).
- **Hairline Boundaries:** `#141418` for base segment dividers and `#1e1e24` for active frame strokes and structural borders.

### Readout & Typography
- **Phosphor Off-White (`#e2e4ea`):** Primary command labels, numerical stats, selected states, and core headlines. Engineered to prevent OLED haloing.
- **Cold Slate (`#8a8d9b`):** Balanced, low-friction body copy, command explanations, directory paths, and diagnostic descriptions.
- **Telemetry Charcoal (`#4a4d5a` & `#2e303a`):** Inactive flags, syntax delimiters (`::`, `//`, `|`), timestamps, line counters, and dormant UI controls.

### Laser Accents & Status Indicators
- **Electric Laser Crimson (`#ff1744`):** Primary action triggers, active terminal prompts (`>`), live selection pointers, and critical alarms.
- **Arterial Ruby (`#8b0000` / `#991b1b`):** Badge borders, container accent edges, and secondary hardware warning plates.
- **Phosphor Emerald & Cyan (`#00e676` / `#10b981`):** Microscopic real-time heartbeats, verified pings, network throughput status, and zero-error indications.

## Typography

The typographical engine uses a single, strictly monospaced hierarchy to enforce absolute horizontal grid alignment, deterministic line lengths, and mathematical rhythm across all viewport widths.

### Font Family Order & Rendering Directives
1. **Font Stack:** `'Hack'`, `'Hack Nerd Font Mono'`, `'JetBrains Mono'`, monospace.
2. **Sub-Pixel Antialiasing:** Font rendering is configured for razor-sharp legibility (`-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;`).
3. **Ligatures & Tabular Alignment:** Enable standard terminal programming ligatures (`font-variant-ligatures: contextual;`) while locking numeric tabular figures (`font-variant-numeric: tabular-nums;`).

### Structural Case Rules
- Metadata badges, terminal indices, memory addresses, status flags, and table column heads must be formatted in strictly uppercase (`text-transform: uppercase`).
- Command syntaxes, object references, and executable statements must maintain exact case sensitivity (`daliri.sys()`, `0x7FFF`, `ioctl`).
- Primary headings prepend bracketed indexing or prompt identifiers (`[01]::SYS_BOOT`, `> ARCH_KERNEL`).

## Layout & Spacing

The layout is engineered as an analytical workstation canvas: high density within components, bounded within an orchestrated 12-column terminal grid with a max width of `1360px`.

### Responsive Layout Architecture
- **Desktop (1024px+):** Asymmetrical telemetry workspace. Left-side hardware status rail (`280px`), center execution viewport (`12-column fluid grid`), and an optional right-side telemetry monitor (`300px`). Module borders connect edge-to-edge with 1px razor seams.
- **Tablet (768px – 1023px):** Side rails collapse into an ultra-dense horizontal telemetry strip positioned directly under the header bar. Grid gutters drop to `1rem`.
- **Mobile (< 768px):** Single-column stack with dynamic lateral spacing dropping to `margin-mobile: 1rem`. Tables and wide diagnostic streams switch to horizontal panic-scroll with fixed column widths to protect monospaced alignment.

### Spatial Rhythm
- **Rhythm Multiplier:** Strictly anchored to a `4px` sub-grid and an `8px` layout baseline.
- **Internal Density:** Components use compressed vertical paddings (`space-xs`, `space-sm`) to maximize visible information per square inch.
- **Section Isolation:** Distinct architecture modules are framed by crisp negative gaps (`space-xl`, `space-2xl`) against pure `#000000`, anchoring spatial separation without visual noise.

## Elevation & Depth

In an OLED environment, traditional blurred drop shadows are prohibited because diffuse shadows introduce unwanted optical haze and defeat pixel shutoff. Depth is achieved strictly through planar stacking and hairline containment.

### Planar Stepping
1. **Base Ground (Level 0):** Pure `#000000`. Hardware pixels are shut off.
2. **Structural Chassis (Level 1):** `#040406` with a `1px solid #141418` frame. Used for major content sectors, panels, and sidebars.
3. **Card Container (Level 2):** `#070709` with a `1px solid #1e1e24` frame. Used for isolated modules, interactive terminal blocks, and diagnostic cards.
4. **Active Flight / Popover (Level 3):** `#0a0a0d` with a `1px solid #1e1e24` boundary. Active contextual inspectors and dropdowns sit cleanly over background layers.

### Optical Edge Discipline
- **Hairline Seams:** All dividers, borders, and group separators must be rendered with an exact `1px` stroke. Sub-pixel lines or blurry 0.5px renderings are forbidden.
- **Accent Framing:** Focused or active panels replace the default `#141418` top border with a razor-thin `1px solid #ff1744` or `#8b0000` status hairline.

## Shapes

The design system enforces a **pure sharp (`0`) geometry**. Every component, card, button, tag, and modal possesses exact `0px` border-radii.

### Geometric Principles
- **Monolithic Rectangles:** Zero roundedness across all UI elements (`border-radius: 0px`).
- **Precision Alignment:** Sharp vertices maintain strict continuous pixel lines that align with the monospace typography grid and table cells.
- **Chamfers:** High-level status tab headers and CLI shell tabs may employ an optional `4px` 45-degree corner cut (chamfer) on top-right edges to evoke physical instrumentation panels, but organic corner rounding is disallowed.

## Components

### 1. Command Triggers & Buttons
- **Primary (Execute):** Sharp `0px` block. Solid background `#ff1744`, text `#000000` (`font-weight: 600`), font `label-md`. Leading prompt symbol `> ` built in. On hover: background `#e2e4ea`, text `#000000`.
- **Secondary (Inspect):** Background `transparent`, border `1px solid #1e1e24`, text `#e2e4ea`. On hover: background `#0a0a0d`, border-color `#8a8d9b`, text `#ff1744`.
- **Ghost Action:** Background `transparent`, border none, text `#8a8d9b`. Prepends `$` in `#4a4d5a`. On hover: text `#e2e4ea` with an active `#ff1744` underscore.

### 2. Telemetry Badges & Status Chips
- **Structural Spec:** Height `20px`, padding `0 6px`, font `label-sm`, letter-spacing `0.08em`, uppercase.
- **Default Badge:** Background `#040406`, border `1px solid #141418`, text `#8a8d9b`. Format: `[ARCH::x86_64]`.
- **Warning / Ruby Badge:** Background `#070709`, border `1px solid #991b1b`, text `#e2e4ea`. Format: `[SEC::ERR_TRAP]`.
- **Active Ping Badge:** Background `#040406`, border `1px solid #1e1e24`, text `#e2e4ea`. Prepends a `4px x 4px` solid `#00e676` square indicator with a CSS heartbeat step.

### 3. Cards & Telemetry Panels
- **Structure:** Background `#040406`, border `1px solid #141418`. Zero drop shadows.
- **Console Header:** Height `28px`, background `#070709`, border-bottom `1px solid #141418`, padding `0 12px`. Displays directory path (`~/kernel/daemon`) in `#8a8d9b` and window controls (`[X]`, `[_]`) in `#4a4d5a`.
- **Active State:** On focus or hover, the panel's top border turns `1px solid #ff1744`.

### 4. Lists & Terminal Tables
- **Directory Trees:** Built using native box-drawing glyphs (`├──`, `└──`, `│`) rendered in `#4a4d5a`. File labels render in `#8a8d9b`, executables in `#e2e4ea`, and links in `#ff1744`.
- **Table Structure:** Border-collapse with `1px solid #141418` row separators. Column headers in `label-sm`, `#4a4d5a`. Row mouseover applies a solid background fill of `#070709` and highlights the index pointer in `#ff1744`.

### 5. Input Fields & CLI Shells
- **Terminal Input:** Solid background `#000000`, border `1px solid #141418`. Padding `8px 12px`, text `#e2e4ea`.
- **Focus Indicator:** Replaces border with `1px solid #ff1744`. Zero glow or outline halo.
- **Console Shell Prompt:** Prepends `root@daliri:~$ ` in `#8a8d9b`. Unfocused cursor renders as a hollow `1px` rectangle; focused cursor renders as a solid `#ff1744` block with a 1000ms stepped blink.

### 6. Iconography & Glyph Rules
- **Font & Source:** Transparent SVG icons and Nerd Font mono glyphs exclusively.
- **Rendering:** No enclosed circular or rounded background tiles. Icons render strictly as clean vector strokes with transparent backgrounds.
- **Stroke Color Matrix:** Default strokes in `#8a8d9b`; interactive hover states in `#ff1744`; operational indicators in `#00e676`. Size is locked to typographical scales: `12px` (micro/telemetry), `14px` (inline code), and `16px` (navigation actions).