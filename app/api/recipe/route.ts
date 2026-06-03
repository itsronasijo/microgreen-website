import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const ingredients = body.ingredients;

    const completion =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

          {
            role: "system",

            content:
              "You are a healthy organic chef that creates recipes using microgreens.",
          },

          {
            role: "user",

            content: `
Create a healthy recipe using:
${ingredients}

Return:
1. Recipe Name
2. Ingredients
3. Steps
4. Nutrition Tips
5. Best Microgreen Pairing
`,
          },

        ],

      });

    return Response.json({
      recipe:
        completion.choices[0].message.content,
    });

  } catch (error) {

    return Response.json({
      error: "Failed to generate recipe",
    });

  }

}
