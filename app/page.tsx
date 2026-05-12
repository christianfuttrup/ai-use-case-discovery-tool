import { BrainCircuit } from "lucide-react";
import InputForm from "@/components/InputForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import "./globals.css";

export default function Home() {
	return (
		<main className="min-h-screen py-14 px-4">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-10">
					<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6 shadow-[0_0_24px_hsl(var(--primary)/0.15)]">
						<BrainCircuit className="w-7 h-7 text-primary" />
					</div>
					<h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent">
						AI Use Case Discovery
					</h1>
					<p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
						Describe your business and workflows. Get back a
						prioritised list of AI opportunities — scored by
						business value and implementation effort — plus a 90-day
						plan to get started.
					</p>
				</div>

				<Card className="card-glow border-primary/10">
					<CardHeader>
						<CardTitle>Tell us about your business</CardTitle>
						<CardDescription>
							Takes about 2 minutes. Five questions, then we do
							the rest.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<InputForm />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
