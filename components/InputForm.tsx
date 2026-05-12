"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INDUSTRIES = [
  "Retail",
  "Logistics",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Professional Services",
  "Other",
];

const COMPANY_SIZES = [
  { value: "1-50", label: "1–50 employees" },
  { value: "51-500", label: "51–500 employees" },
  { value: "500+", label: "500+ employees" },
];

const AI_MATURITY_OPTIONS = [
  { value: "none", label: "None — we haven't explored AI yet" },
  {
    value: "informal",
    label: "Informal — using Copilot or ChatGPT occasionally",
  },
  { value: "experimenting", label: "Active — running AI experiments now" },
];

export default function InputForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    industry: "",
    companySize: "",
    workflows: "",
    aiMaturity: "",
    painPoints: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !form.industry ||
      !form.companySize ||
      !form.workflows.trim() ||
      !form.aiMaturity
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      sessionStorage.setItem("discoveryResult", JSON.stringify(data));
      router.push("/results");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-sm font-medium">
          Industry <span className="text-destructive">*</span>
        </Label>
        <Select onValueChange={(v) => setForm({ ...form, industry: v })}>
          <SelectTrigger id="industry" className="bg-input/30">
            <SelectValue placeholder="Select your industry…" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Company size <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          onValueChange={(v) => setForm({ ...form, companySize: v })}
          className="flex flex-wrap gap-2"
        >
          {COMPANY_SIZES.map((size) => (
            <div key={size.value}>
              <RadioGroupItem
                value={size.value}
                id={`size-${size.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size.value}`}
                className="flex cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
              >
                {size.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workflows" className="text-sm font-medium">
          3 most time-consuming workflows{" "}
          <span className="text-destructive">*</span>
        </Label>
        <p className="text-xs text-muted-foreground">
          Think about what your team repeats most — e.g. processing invoices,
          answering customer queries, reviewing documents
        </p>
        <Textarea
          id="workflows"
          rows={4}
          placeholder={"1. \n2. \n3. "}
          value={form.workflows}
          className="bg-input/30 resize-none"
          onChange={(e) => setForm({ ...form, workflows: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Current AI maturity <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          onValueChange={(v) => setForm({ ...form, aiMaturity: v })}
          className="flex flex-col gap-2"
        >
          {AI_MATURITY_OPTIONS.map((opt) => (
            <div key={opt.value}>
              <RadioGroupItem
                value={opt.value}
                id={`maturity-${opt.value}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`maturity-${opt.value}`}
                className="flex cursor-pointer rounded-lg border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="painPoints" className="text-sm font-medium">
          Biggest pain points or bottlenecks{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="painPoints"
          rows={3}
          placeholder="Where do things slow down or break?"
          value={form.painPoints}
          className="bg-input/30 resize-none"
          onChange={(e) => setForm({ ...form, painPoints: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full btn-glow"
        size="lg"
      >
        {loading ? "Analysing your business…" : "Discover AI use cases →"}
      </Button>
    </form>
  );
}
