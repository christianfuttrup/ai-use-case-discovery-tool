import type { UseCase } from "@/lib/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  useCase: UseCase;
  isTop: boolean;
}

function ScoreBar({
  score,
  colorClass,
}: {
  score: number;
  colorClass: string;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`h-1.5 w-6 rounded-full ${n <= score ? colorClass : "bg-muted/60"}`}
        />
      ))}
    </div>
  );
}

export default function UseCaseCard({ useCase, isTop }: Props) {
  return (
    <Card
      className={
        isTop
          ? "border-primary/30 bg-primary/[0.04] card-glow"
          : "border-border/60 bg-card/80"
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-snug">
            {useCase.name}
          </CardTitle>
          {isTop && (
            <Badge className="shrink-0 bg-primary/20 text-primary border border-primary/30 hover:bg-primary/20">
              Recommended
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{useCase.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Business Value
            </p>
            <ScoreBar
              score={useCase.businessValue}
              colorClass="bg-emerald-400"
            />
            <p className="text-xs text-muted-foreground">
              {useCase.businessValueJustification}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Implementation Effort
            </p>
            <ScoreBar
              score={useCase.implementationEffort}
              colorClass="bg-amber-400"
            />
            <p className="text-xs text-muted-foreground">
              {useCase.implementationEffortNote}
            </p>
          </div>
        </div>
        <div className="border-t border-border/50 pt-3">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
            Data Requirements
          </p>
          <p className="text-xs text-muted-foreground">
            {useCase.dataRequirements}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
