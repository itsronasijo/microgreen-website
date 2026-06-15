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
  <section className="h-full bg-black text-white flex items-center justify-center px-6 py-10">
      <div className="max-w-2xl w-full">

       <div className="mb-8">
          <p className="text-green-400 text-sm font-semibold uppercase tracking-wider">
          Health Analyzer
          </p>

        <h2 className="text-3xl font-bold text-white mt-2">
        Safety Check
        </h2>

        <p className="text-gray-400 text-sm mt-2">
        Answer a few questions to get personalized recommendations.
      </p>
</div>
        <div className="flex justify-between items-center mb-6">

  <button
    onClick={() => {
      if (step > 1) {
        setStep(step - 1);
      } else {
        onBack();
      }
    }}
    className="text-gray-400 hover:text-white transition"
  >
    ← Back
  </button>

  <span className="text-green-400 font-semibold">
    Question {step}/3
  </span>

</div>

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

      <div className="space-y-4 mt-8">

       <button
  onClick={() => {
    setHasAllergies(true);
    setStep(2);
  }}
  className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-red-500/30
    hover:border-red-400
    hover:bg-red-500/10
    transition-all
    text-left
  "
>
  <div className="flex items-center gap-4">

    <div className="text-3xl">
      ⚠️
    </div>

    <div>
      <p className="font-bold text-lg">
        Yes
      </p>

      <p className="text-gray-400 text-sm">
        I have known food allergies
      </p>
    </div>

  </div>
</button>

       <button
  onClick={() => {
    setHasAllergies(false);
    setStep(2);
  }}
  className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-green-500/30
    hover:border-green-400
    hover:bg-green-500/10
    transition-all
    text-left
  "
>
  <div className="flex items-center gap-4">

    <div className="text-3xl">
      ✅
    </div>

    <div>
      <p className="font-bold text-lg">
        No
      </p>

      <p className="text-gray-400 text-sm">
        No known food allergies
      </p>
    </div>

  </div>
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
    setHasAllergies(true);
    setStep(2);
  }}
  className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-red-500/30
    hover:border-red-400
    hover:bg-red-500/10
    transition-all
    text-left
  "
>
  <div className="flex items-center gap-4">

    <div className="text-3xl">
      ⚠️
    </div>

    <div>
      <p className="font-bold text-lg">
        Yes
      </p>

      <p className="text-gray-400 text-sm">
       
      Pregnant or breastfeeding
      </p>
    </div>

  </div>
</button>

        <button
  onClick={() => {
    setHasAllergies(false);
    setStep(2);
  }}
  className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-green-500/30
    hover:border-green-400
    hover:bg-green-500/10
    transition-all
    text-left
  "
>
  <div className="flex items-center gap-4">

    <div className="text-3xl">
      ✅
    </div>

    <div>
      <p className="font-bold text-lg">
        No
      </p>

      <p className="text-gray-400 text-sm">
       
      Not pregnant or breastfeeding
      </p>
    </div>

  </div>
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
    setHasAllergies(true);
    setStep(2);
  }}
  className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-red-500/30
    hover:border-red-400
    hover:bg-red-500/10
    transition-all
    text-left
  "
>
  <div className="flex items-center gap-4">

    <div className="text-3xl">
      ⚠️
    </div>

    <div>
      <p className="font-bold text-lg">
        Yes
      </p>

      <p className="text-gray-400 text-sm">
       Currently taking medication

      </p>
    </div>

  </div>
</button>

       <button
  onClick={() => {
    setHasAllergies(false);
    setStep(2);
  }}
  className="
    w-full
    p-5
    rounded-2xl
    bg-white/5
    border
    border-green-500/30
    hover:border-green-400
    hover:bg-green-500/10
    transition-all
    text-left
  "
>
  <div className="flex items-center gap-4">

    <div className="text-3xl">
      ✅
    </div>

    <div>
      <p className="font-bold text-lg">
        No
      </p>

      <p className="text-gray-400 text-sm">
       Not taking medication
      </p>
    </div>

  </div>
</button>

      </div>

    </div>
  )}

</div>
       
      </div>

    </section>
  );
}
