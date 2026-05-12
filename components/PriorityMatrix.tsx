import type { UseCase } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  useCases: UseCase[];
}

const DOT_COLORS = ["#4f46e5", "#059669", "#d97706", "#dc2626", "#7c3aed"];

const W = 500;
const H = 380;
const PAD_LEFT = 48;
const PAD_RIGHT = 16;
const PAD_TOP = 12;
const PAD_BOTTOM = 48;
const PLOT_W = W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = H - PAD_TOP - PAD_BOTTOM;

function toX(effort: number) {
  return PAD_LEFT + ((effort - 1) / 4) * PLOT_W;
}
function toY(value: number) {
  return PAD_TOP + ((5 - value) / 4) * PLOT_H;
}

export default function PriorityMatrix({ useCases }: Props) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Value vs. Effort</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full max-w-xl mx-auto"
            aria-label="Priority matrix: business value vs. implementation effort"
          >
            {/* Quadrant backgrounds */}
            <rect
              x={PAD_LEFT}
              y={PAD_TOP}
              width={PLOT_W / 2}
              height={PLOT_H / 2}
              fill="#f0fdf4"
            />
            <rect
              x={PAD_LEFT + PLOT_W / 2}
              y={PAD_TOP}
              width={PLOT_W / 2}
              height={PLOT_H / 2}
              fill="#fffbeb"
            />
            <rect
              x={PAD_LEFT}
              y={PAD_TOP + PLOT_H / 2}
              width={PLOT_W / 2}
              height={PLOT_H / 2}
              fill="#f9fafb"
            />
            <rect
              x={PAD_LEFT + PLOT_W / 2}
              y={PAD_TOP + PLOT_H / 2}
              width={PLOT_W / 2}
              height={PLOT_H / 2}
              fill="#fff1f2"
            />

            {/* Quadrant labels */}
            <text
              x={PAD_LEFT + 8}
              y={PAD_TOP + 18}
              fontSize="11"
              fill="#16a34a"
              fontWeight="600"
            >
              Quick Wins
            </text>
            <text
              x={PAD_LEFT + PLOT_W / 2 + 8}
              y={PAD_TOP + 18}
              fontSize="11"
              fill="#d97706"
              fontWeight="600"
            >
              Strategic Bets
            </text>
            <text
              x={PAD_LEFT + 8}
              y={PAD_TOP + PLOT_H / 2 + 18}
              fontSize="11"
              fill="#9ca3af"
            >
              Fill-ins
            </text>
            <text
              x={PAD_LEFT + PLOT_W / 2 + 8}
              y={PAD_TOP + PLOT_H / 2 + 18}
              fontSize="11"
              fill="#f87171"
            >
              Avoid
            </text>

            {/* Border and divider lines */}
            <rect
              x={PAD_LEFT}
              y={PAD_TOP}
              width={PLOT_W}
              height={PLOT_H}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <line
              x1={PAD_LEFT + PLOT_W / 2}
              y1={PAD_TOP}
              x2={PAD_LEFT + PLOT_W / 2}
              y2={PAD_TOP + PLOT_H}
              stroke="#d1d5db"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1={PAD_LEFT}
              y1={PAD_TOP + PLOT_H / 2}
              x2={PAD_LEFT + PLOT_W}
              y2={PAD_TOP + PLOT_H / 2}
              stroke="#d1d5db"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* Y-axis label */}
            <text
              x={14}
              y={PAD_TOP + PLOT_H / 2}
              fontSize="11"
              textAnchor="middle"
              fill="#6b7280"
              transform={`rotate(-90, 14, ${PAD_TOP + PLOT_H / 2})`}
            >
              Business Value ↑
            </text>

            {/* X-axis label */}
            <text
              x={PAD_LEFT + PLOT_W / 2}
              y={H - 6}
              fontSize="11"
              textAnchor="middle"
              fill="#6b7280"
            >
              Implementation Effort →
            </text>

            {/* Data points */}
            {useCases.map((uc, i) => {
              const cx = toX(uc.implementationEffort);
              const cy = toY(uc.businessValue);
              const color = DOT_COLORS[i % DOT_COLORS.length];
              return (
                <g key={i}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={18}
                    fill={color}
                    fillOpacity={0.15}
                    stroke={color}
                    strokeWidth={2}
                  />
                  <text
                    x={cx}
                    y={cy + 5}
                    fontSize="12"
                    textAnchor="middle"
                    fill={color}
                    fontWeight="700"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 justify-center">
          {useCases.map((uc, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
              />
              <span>
                {i + 1}. {uc.name}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
