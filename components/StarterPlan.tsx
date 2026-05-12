import type { DiscoveryOutput } from "@/lib/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  plan: DiscoveryOutput["starterPlan"];
}

const PHASES = [
  {
    key: "days1to30" as const,
    label: "Days 1–30",
    subtitle: "Diagnose",
    cardClass: "border-blue-200 bg-blue-50/60",
    titleClass: "text-blue-700",
  },
  {
    key: "days31to60" as const,
    label: "Days 31–60",
    subtitle: "Pilot",
    cardClass: "border-emerald-200 bg-emerald-50/60",
    titleClass: "text-emerald-700",
  },
  {
    key: "days61to90" as const,
    label: "Days 61–90",
    subtitle: "Review",
    cardClass: "border-purple-200 bg-purple-50/60",
    titleClass: "text-purple-700",
  },
];

export default function StarterPlan({ plan }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PHASES.map((phase) => (
        <Card key={phase.key} className={phase.cardClass}>
          <CardHeader className="pb-2">
            <p
              className={`text-xs font-semibold uppercase tracking-widest ${phase.titleClass}`}
            >
              {phase.label}
            </p>
            <CardTitle className={`text-lg ${phase.titleClass}`}>
              {phase.subtitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {plan[phase.key]}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
