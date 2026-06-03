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

            content:
              "Create a healthy recipe using these ingredients: " +
              ingredients +
              ". Return Recipe Name, Ingredients, Steps, Nutrition Tips, and Best Microgreen Pairing.",
          },

        ],

      });

    return Response.json({

      recipe:
        completion.choices[0].message.content,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      error:
        "Failed to generate recipe",

    });

  }

}
