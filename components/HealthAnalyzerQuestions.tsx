"use client";

import { useState } from "react";

type Props = {
  onComplete: () => void;
  onBack: () => void;
};

export default function HealthAnalyzerQuestions({
  onComplete,
  onBack,
}: Props) {

  const [step, setStep] = useState(1);

  const [hasAllergies, setHasAllergies] =
    useState<boolean | null>(null);

  const [pregnant, setPregnant] =
    useState<boolean | null>(null);

  const [medication, setMedication] =
    useState<boolean | null>(null);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="max-w-2xl w-full">

        <h2 className="text-5xl font-bold text-green-400 text-center mb-4">
          🧠 Verde Safety Check
        </h2>

        <p className="text-center text-gray-400 mb-10">
          Question {step} of 3
        </p>

        <div className="bg-white/5 border border-green-500/20 rounded-3xl p-8">

          <h3 className="text-2xl font-bold">
            Component Working 🚀
          </h3>

        </div>

      </div>

    </section>
  );
}
