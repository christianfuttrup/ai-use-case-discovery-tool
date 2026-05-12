import InputForm from "@/components/InputForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/40 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            AI Use Case Discovery
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
            Describe your business and workflows. Get back a prioritised list of
            AI opportunities — scored by business value and implementation effort
            — plus a 90-day plan to get started.
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tell us about your business</CardTitle>
            <CardDescription>
              Takes about 2 minutes. Five questions, then we do the rest.
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
