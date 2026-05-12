"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
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
		<main className="min-h-screen py-12 px-4">
			<div className="max-w-4xl mx-auto space-y-10">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
							Your AI Opportunities
						</h1>
						<p className="text-muted-foreground mt-1.5">
							{result.useCases.length} use cases identified and
							ranked by priority
						</p>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => router.push("/")}
						className="shrink-0 text-muted-foreground hover:text-foreground"
					>
						← Start over
					</Button>
				</div>

				<section>
					<h2 className="text-xs font-semibold mb-4 text-foreground/60 uppercase tracking-widest">
						Use Cases
					</h2>
					<div className="space-y-4">
						{result.useCases.map((uc, i) => (
							<UseCaseCard
								key={i}
								useCase={uc}
								isTop={
									uc.name === result.topRecommendation.name
								}
							/>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-xs font-semibold mb-4 text-foreground/60 uppercase tracking-widest">
						Priority Matrix
					</h2>
					<PriorityMatrix useCases={result.useCases} />
				</section>

				<Card className="border-primary/30 bg-primary/[0.04] card-glow-strong">
					<CardHeader>
						<div className="flex items-center gap-2">
							<Sparkles className="w-4 h-4 text-primary shrink-0" />
							<CardTitle className="text-primary">
								Top Recommendation:{" "}
								{result.topRecommendation.name}
							</CardTitle>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-sm leading-relaxed text-foreground/85">
							{result.topRecommendation.reasoning}
						</p>
					</CardContent>
				</Card>

				<section>
					<h2 className="text-xs font-semibold mb-1 text-foreground/60 uppercase tracking-widest">
						90-Day Starter Plan
					</h2>
					<p className="text-muted-foreground text-sm mb-4">
						{result.topRecommendation.name}
					</p>
					<StarterPlan plan={result.starterPlan} />
				</section>

				<Card className="border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent">
					<CardContent className="py-10 text-center">
						<p className="text-foreground/70 mb-2 text-base font-medium">
							Want to go deeper?
						</p>
						<p className="text-muted-foreground text-sm mb-6">
							Book a free 30-minute discovery call to turn these
							insights into an action plan.
						</p>
						<Button asChild size="lg" className="btn-glow">
							<a
								href="https://www.linkedin.com/in/futtrup"
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
