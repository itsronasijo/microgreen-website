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
Create a healthy recipe using these ingredients:

${ingredients}

Return the response EXACTLY in this format:

Recipe Name:
[Recipe Name]

Ingredients:
- ingredient 1
- ingredient 2
- ingredient 3

Steps:
1. Step one
2. Step two
3. Step three

Nutrition:
Calories: xxx
Protein: xxg
Fiber: xxg
Vitamins: xxx

Recommended Microgreen:
[Best matching microgreen]

Do not add any extra text before or after this format.
`,
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
