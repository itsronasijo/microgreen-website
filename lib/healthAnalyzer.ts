import { supabase } from "./supabase";

export async function analyzeGoals(selectedGoals: string[]) {
  const { data, error } = await supabase
    .from("wellness_green_scores")
    .select("*")
    .eq("in_stock", true);

  if (error || !data) {
    throw error;
  }

  const ranked = data
    .map((green) => ({
      ...green,
      score: selectedGoals.reduce((total, goal) => {
        switch (goal) {
          case "Active Lifestyle":
            return total + green.active_lifestyle;

          case "Weight Management":
            return total + green.weight_management;

          case "Everyday Wellness":
            return total + green.everyday_wellness;

          case "Energy & Vitality":
            return total + green.energy_vitality;

          case "General Wellbeing":
            return total + green.general_wellbeing;

          case "Balanced Nutrition":
            return total + green.balanced_nutrition;

          default:
            return total;
        }
      }, 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked;
}
