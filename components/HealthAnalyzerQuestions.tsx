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

       <div className="w-full bg-white/10 rounded-full h-3 mb-12">

  <div
    className="bg-green-500 h-3 rounded-full transition-all duration-500"
    style={{
      width: `${(step / 3) * 100}%`,
    }}
  />

</div>

<div className="bg-white/5 border border-green-500/20 rounded-3xl p-8 min-h-[300px] flex items-center justify-center">

  {step === 1 && (
    <div className="w-full animate-in fade-in duration-300">

      <h3 className="text-3xl font-bold mb-8 text-center">
        Do you have any known food allergies?
      </h3>

      <div className="flex justify-center gap-6">

        <button
          onClick={() => {
            setHasAllergies(true);
            setStep(2);
          }}
          className="bg-red-500 hover:bg-red-400 px-10 py-4 rounded-2xl font-bold text-black"
        >
          Yes
        </button>

        <button
          onClick={() => {
            setHasAllergies(false);
            setStep(2);
          }}
          className="bg-green-500 hover:bg-green-400 px-10 py-4 rounded-2xl font-bold text-black"
        >
          No
        </button>

      </div>

    </div>
  )}

  {step === 2 && (
    <div className="w-full animate-in fade-in duration-300">

      <h3 className="text-3xl font-bold mb-8 text-center">
        Are you pregnant or breastfeeding?
      </h3>

      <div className="flex justify-center gap-6">

        <button
          onClick={() => {
            setPregnant(true);
            setStep(3);
          }}
          className="bg-red-500 hover:bg-red-400 px-10 py-4 rounded-2xl font-bold text-black"
        >
          Yes
        </button>

        <button
          onClick={() => {
            setPregnant(false);
            setStep(3);
          }}
          className="bg-green-500 hover:bg-green-400 px-10 py-4 rounded-2xl font-bold text-black"
        >
          No
        </button>

      </div>

    </div>
  )}

  {step === 3 && (
    <div className="w-full animate-in fade-in duration-300">

      <h3 className="text-3xl font-bold mb-8 text-center">
        Are you currently taking any medication?
      </h3>

      <div className="flex justify-center gap-6">

        <button
          onClick={() => {
            setMedication(true);
            onComplete();
          }}
          className="bg-red-500 hover:bg-red-400 px-10 py-4 rounded-2xl font-bold text-black"
        >
          Yes
        </button>

        <button
          onClick={() => {
            setMedication(false);
            onComplete();
          }}
          className="bg-green-500 hover:bg-green-400 px-10 py-4 rounded-2xl font-bold text-black"
        >
          No
        </button>

      </div>

    </div>
  )}

</div>
        <div className="flex justify-center mt-8">

  <button
    onClick={() => {
      if (step > 1) {
        setStep(step - 1);
      } else {
        onBack();
      }
    }}
    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20"
  >
    ← Back
  </button>

</div>

      </div>

    </section>
  );
}
