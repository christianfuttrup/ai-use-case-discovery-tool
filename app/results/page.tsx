"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { DiscoveryOutput } from "@/lib/schema";
import UseCaseCard from "@/components/UseCaseCard";
import PriorityMatrix from "@/components/PriorityMatrix";
import StarterPlan from "@/components/StarterPlan";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiscoveryOutput | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("discoveryResult");
    if (!stored) {
      router.replace("/");
      return;
    }
    setResult(JSON.parse(stored));
  }, [router]);

  if (!result) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Your AI Opportunities
            </h1>
            <p className="text-muted-foreground mt-1">
              {result.useCases.length} use cases identified and ranked by
              priority
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            ← Start over
          </Button>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
          <div className="space-y-4">
            {result.useCases.map((uc, i) => (
              <UseCaseCard
                key={i}
                useCase={uc}
                isTop={uc.name === result.topRecommendation.name}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Priority Matrix</h2>
          <PriorityMatrix useCases={result.useCases} />
        </section>

        <Card className="border-primary/40 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">
              Top Recommendation: {result.topRecommendation.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">
              {result.topRecommendation.reasoning}
            </p>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            90-Day Starter Plan:{" "}
            <span className="text-primary">
              {result.topRecommendation.name}
            </span>
          </h2>
          <StarterPlan plan={result.starterPlan} />
        </section>

        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-5 text-base">
              Want to go deeper? Book a free 30-minute discovery call.
            </p>
            <Button asChild size="lg">
              <a
                href="https://www.linkedin.com/in/christianfuttrup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a consultation →
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
