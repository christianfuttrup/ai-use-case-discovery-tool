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
  { value: "none", label: "None" },
  {
    value: "informal",
    label: "Using tools like Copilot or ChatGPT informally",
  },
  { value: "experimenting", label: "Actively experimenting with AI" },
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="industry">
          Industry <span className="text-destructive">*</span>
        </Label>
        <Select onValueChange={(v) => setForm({ ...form, industry: v })}>
          <SelectTrigger id="industry">
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
        <Label>
          Company size <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          onValueChange={(v) => setForm({ ...form, companySize: v })}
          className="flex flex-wrap gap-5"
        >
          {COMPANY_SIZES.map((size) => (
            <div key={size.value} className="flex items-center space-x-2">
              <RadioGroupItem value={size.value} id={`size-${size.value}`} />
              <Label
                htmlFor={`size-${size.value}`}
                className="font-normal cursor-pointer"
              >
                {size.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="workflows">
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
          onChange={(e) => setForm({ ...form, workflows: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label>
          Current AI maturity <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          onValueChange={(v) => setForm({ ...form, aiMaturity: v })}
          className="space-y-2"
        >
          {AI_MATURITY_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={opt.value}
                id={`maturity-${opt.value}`}
              />
              <Label
                htmlFor={`maturity-${opt.value}`}
                className="font-normal cursor-pointer"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="painPoints">
          Biggest pain points or bottlenecks{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="painPoints"
          rows={3}
          placeholder="Where do things slow down or break?"
          value={form.painPoints}
          onChange={(e) => setForm({ ...form, painPoints: e.target.value })}
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full" size="lg">
        {loading ? "Analysing your business…" : "Discover AI use cases →"}
      </Button>
    </form>
  );
}
