import { useId, useMemo, useState } from 'react';

/**
 * Live version of the CLV case study's model.
 *
 *   CLV = (margin × revenue × retention) / (1 + discount − retention)
 *
 * Defaults are the case study's own assumptions (30% margin, 1% monthly
 * discount rate, 49.5% observed retention). Revenue is illustrative: the
 * write-up does not state it, and CLV scales linearly with it anyway, so it
 * changes the numbers but never the conclusion the demo exists to show —
 * the same relative uplift is worth more on retention than on margin.
 */

const clv = ({ margin, revenue, retention, discount }) =>
  (margin * revenue * retention) / (1 + discount - retention);

const money = (value) =>
  value >= 1000
    ? `$${Math.round(value).toLocaleString('en-US')}`
    : `$${value.toFixed(2)}`;

const pctText = (value, digits = 0) => `${(value * 100).toFixed(digits)}%`;

const Slider = ({ label, value, min, max, step, format, onChange, hint }) => {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-sans text-meta text-ink-muted">
          {label}
        </label>
        <output htmlFor={id} className="font-mono text-small tabular-nums text-ink">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="u-focus mt-2 w-full cursor-pointer accent-accent"
      />
      {hint && <p className="mt-1 font-sans text-[0.75rem] text-ink-faint">{hint}</p>}
    </div>
  );
};

/* ── Chart geometry ─────────────────────────────────────────── */

const W = 600;
const H = 300;
const PAD = { top: 30, right: 16, bottom: 36, left: 52 };
const R_MIN = 0.05;
const R_MAX = 0.85;

const niceMax = (value) => {
  if (value <= 0) return 1;
  const exp = 10 ** Math.floor(Math.log10(value));
  const n = value / exp;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * exp;
};

const Chart = ({ params, uplift }) => {
  const boosted = { ...params, margin: Math.min(params.margin * (1 + uplift), 1) };
  const upR = Math.min(params.retention * (1 + uplift), 0.99);

  const curve = (p) =>
    Array.from({ length: 60 }, (_, i) => {
      const r = R_MIN + ((R_MAX - R_MIN) * i) / 59;
      return [r, clv({ ...p, retention: r })];
    });

  const base = curve(params);
  const shifted = curve(boosted);

  const peak = Math.max(
    shifted[shifted.length - 1][1],
    clv({ ...params, retention: Math.min(upR, R_MAX) })
  );
  const yMax = niceMax(peak);

  const x = (r) => PAD.left + ((r - R_MIN) / (R_MAX - R_MIN)) * (W - PAD.left - PAD.right);
  const y = (v) => H - PAD.bottom - (v / yMax) * (H - PAD.top - PAD.bottom);
  const path = (points) =>
    points.map(([r, v], i) => `${i ? 'L' : 'M'}${x(r).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

  const now = [params.retention, clv(params)];
  const viaRetention = [Math.min(upR, R_MAX), clv({ ...params, retention: Math.min(upR, R_MAX) })];
  const viaMargin = [params.retention, clv(boosted)];

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * yMax);
  const xTicks = [0.1, 0.3, 0.5, 0.7, 0.85];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`CLV against retention. At ${pctText(params.retention, 1)} retention, CLV is ${money(now[1])}. Raising retention by ${pctText(uplift)} gives ${money(viaRetention[1])}; raising margin by ${pctText(uplift)} gives ${money(viaMargin[1])}.`}
    >
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PAD.left} x2={W - PAD.right} y1={y(v)} y2={y(v)} className="stroke-line" strokeWidth="1" />
          <text x={PAD.left - 8} y={y(v) + 4} textAnchor="end" className="fill-ink-faint font-mono text-[12px]">
            {Number.isInteger(v) ? v : v.toFixed(1)}
          </text>
        </g>
      ))}
      {xTicks.map((r) => (
        <text key={r} x={x(r)} y={H - PAD.bottom + 18} textAnchor="middle" className="fill-ink-faint font-mono text-[12px]">
          {pctText(r)}
        </text>
      ))}
      <text x={W - PAD.right} y={H - 4} textAnchor="end" className="fill-ink-muted font-sans text-[12px]">
        Monthly retention →
      </text>
      <text x={PAD.left} y={12} textAnchor="start" className="fill-ink-muted font-sans text-[12px]">
        CLV $
      </text>

      <path d={path(shifted)} fill="none" className="stroke-ink-faint" strokeWidth="2" strokeDasharray="5 5" />
      <path d={path(base)} fill="none" className="stroke-accent" strokeWidth="2.5" />

      {/* Arrows from today to each lever's result */}
      <line x1={x(now[0])} y1={y(now[1])} x2={x(viaMargin[0])} y2={y(viaMargin[1])} className="stroke-ink-muted" strokeWidth="1.5" />
      <circle cx={x(viaMargin[0])} cy={y(viaMargin[1])} r="5" className="fill-surface stroke-ink-muted" strokeWidth="2" />
      <circle cx={x(viaRetention[0])} cy={y(viaRetention[1])} r="5" className="fill-surface stroke-accent" strokeWidth="2" />
      <circle cx={x(now[0])} cy={y(now[1])} r="6" className="fill-accent" />
    </svg>
  );
};

/* ── Simulator ─────────────────────────────────────────────── */

const DEFAULTS = { retention: 0.495, margin: 0.3, revenue: 10, discount: 0.01 };

const ClvSimulator = () => {
  const [params, setParams] = useState(DEFAULTS);
  const [uplift, setUplift] = useState(0.1);

  const set = (key) => (value) => setParams((p) => ({ ...p, [key]: value }));

  const result = useMemo(() => {
    const now = clv(params);
    const viaRetention = clv({ ...params, retention: Math.min(params.retention * (1 + uplift), 0.99) });
    const viaMargin = clv({ ...params, margin: Math.min(params.margin * (1 + uplift), 1) });
    return {
      now,
      lifetime: 1 / (1 - params.retention),
      retentionGain: viaRetention / now - 1,
      marginGain: viaMargin / now - 1,
    };
  }, [params, uplift]);

  const isDefault =
    uplift === 0.1 && Object.keys(DEFAULTS).every((k) => params[k] === DEFAULTS[k]);

  const winner = result.retentionGain >= result.marginGain ? 'retention' : 'margin';
  const maxGain = Math.max(result.retentionGain, result.marginGain, 0.0001);

  return (
    <section
      aria-labelledby="clv-sim-title"
      className="my-12 max-w-wide rounded-lg border border-line bg-surface p-5 shadow-sm md:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 id="clv-sim-title" className="font-display text-h3 text-ink">
          Try the model
        </h3>
        <button
          type="button"
          onClick={() => {
            setParams(DEFAULTS);
            setUplift(0.1);
          }}
          disabled={isDefault}
          className="u-focus font-sans text-meta font-semibold text-accent disabled:cursor-default disabled:text-ink-faint"
        >
          Reset to case study values
        </button>
      </div>
      <p className="mt-2 max-w-measure font-sans text-small text-ink-muted">
        Move the sliders to see how CLV responds. Defaults are the case study&rsquo;s assumptions;
        revenue is illustrative.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr]">
        <div className="space-y-6">
          <Slider
            label="Monthly retention"
            value={params.retention}
            min={0.05}
            max={0.85}
            step={0.005}
            format={(v) => pctText(v, 1)}
            onChange={set('retention')}
            hint="Observed in the data: 49.5%"
          />
          <Slider
            label="Contribution margin"
            value={params.margin}
            min={0.05}
            max={0.8}
            step={0.01}
            format={(v) => pctText(v)}
            onChange={set('margin')}
          />
          <Slider
            label="Avg monthly revenue"
            value={params.revenue}
            min={1}
            max={100}
            step={1}
            format={(v) => `$${v}`}
            onChange={set('revenue')}
          />
          <Slider
            label="Monthly discount rate"
            value={params.discount}
            min={0.005}
            max={0.05}
            step={0.005}
            format={(v) => pctText(v, 1)}
            onChange={set('discount')}
          />
        </div>

        <div>
          <dl className="grid grid-cols-2 gap-6 border-b border-line pb-6">
            <div>
              <dt className="font-sans text-eyebrow uppercase text-ink-faint">Lifetime value</dt>
              <dd className="mt-2 font-display text-h2 tabular-nums text-ink">{money(result.now)}</dd>
            </div>
            <div>
              <dt className="font-sans text-eyebrow uppercase text-ink-faint">Avg. lifetime</dt>
              <dd className="mt-2 font-display text-h2 tabular-nums text-ink">
                {result.lifetime.toFixed(1)}
                <span className="ml-1 font-sans text-small text-ink-muted">months</span>
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <Slider
              label="Improve one lever by"
              value={uplift}
              min={0.05}
              max={0.5}
              step={0.05}
              format={(v) => `+${pctText(v)}`}
              onChange={setUplift}
            />

            <ul className="mt-5 space-y-3" aria-live="polite">
              {[
                { key: 'retention', label: 'Retention', gain: result.retentionGain, bar: 'bg-accent' },
                { key: 'margin', label: 'Margin', gain: result.marginGain, bar: 'bg-ink-muted' },
              ].map((row) => (
                <li key={row.key} className="grid grid-cols-[5.5rem_1fr_4.5rem] items-center gap-3">
                  <span className="font-sans text-meta text-ink-muted">{row.label}</span>
                  <span className="h-2.5 overflow-hidden rounded-sm bg-sunken">
                    <span
                      className={`block h-full rounded-sm transition-[width] duration-base ease-smooth ${row.bar}`}
                      style={{ width: `${(row.gain / maxGain) * 100}%` }}
                    />
                  </span>
                  <span className="text-right font-mono text-small tabular-nums text-ink">
                    +{pctText(row.gain, 1)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 font-sans text-small text-ink-body">
              The same +{pctText(uplift)} is worth{' '}
              <strong className="font-semibold text-ink">
                {(Math.max(result.retentionGain, result.marginGain) /
                  Math.max(Math.min(result.retentionGain, result.marginGain), 0.0001)).toFixed(1)}
                ×
              </strong>{' '}
              more on {winner} than on {winner === 'retention' ? 'margin' : 'retention'}.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <p className="mb-4 font-sans text-meta text-ink-muted">
          Retention compounds: CLV curves upward as retention rises, while a margin increase only lifts the curve a little.
        </p>
        <Chart params={params} uplift={uplift} />
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 font-sans text-[0.75rem] text-ink-muted">
          <li className="flex items-center gap-2">
            <span className="h-0.5 w-5 bg-accent" aria-hidden="true" /> CLV at current margin
          </li>
          <li className="flex items-center gap-2">
            <span className="h-0 w-5 border-t-2 border-dashed border-ink-faint" aria-hidden="true" /> With margin +{pctText(uplift)}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" /> You are here
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ClvSimulator;
