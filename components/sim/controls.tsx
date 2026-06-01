"use client";

import katex from "katex";
import { ReactNode } from "react";

function mathLabel(label: string, tex?: boolean): ReactNode {
  if (!tex) return label;
  return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(label, { throwOnError: false }) }} />;
}

/**
 * Labeled slider. Set tex to render the label as math.
 *   <Slider label={String.raw`\Omega`} tex min={0} max={5} step={0.1}
 *           value={omega} onChange={setOmega} unit="MHz" />
 */
export function Slider({
  label,
  tex,
  min,
  max,
  step = (max - min) / 100,
  value,
  onChange,
  unit,
  format,
}: {
  label: string;
  tex?: boolean;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
  format?: (v: number) => string;
}) {
  const shown = format ? format(value) : Number(value.toFixed(3)).toString();
  return (
    <label className="sim-slider">
      <span className="sim-slider-top">
        <span className="sim-slider-label">{mathLabel(label, tex)}</span>
        <span className="sim-slider-val">
          {shown}
          {unit ? <span className="sim-slider-unit"> {unit}</span> : null}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

/** On/off toggle. */
export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="sim-toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

/** Segmented control / radio group. */
export function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="sim-segmented">
      {label ? <span className="sim-segmented-label">{label}</span> : null}
      <div className="sim-segmented-opts">
        {options.map((o) => (
          <button
            key={String(o.value)}
            className={`sim-seg-btn ${o.value === value ? "is-active" : ""}`}
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** A read-only value chip (for derived quantities a sim wants to surface). */
export function Readout({ label, value, tex }: { label: string; value: ReactNode; tex?: boolean }) {
  return (
    <div className="sim-readout">
      <span className="sim-readout-label">{mathLabel(label, tex)}</span>
      <span className="sim-readout-val">{value}</span>
    </div>
  );
}

/** Layout wrapper that arranges sliders/toggles in a tidy grid. */
export function Controls({ children }: { children: ReactNode }) {
  return <div className="sim-controls">{children}</div>;
}
