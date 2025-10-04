import { ai } from "../aiClient";
import { history } from "../history";

//VOCAB (in use) - User chooses a Vocab deck. AI gives a sentence or prompt (EN), user translates
export async function vocabApi(
  input: string,
  deck: string,
  language: string,
  level: string
): Promise<string | undefined> {
  if (history.length >= 10) {
    history.shift();
  }

  history.push({
    role: "user",
    parts: [{ text: input }],
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: history,
    config: {
      systemInstruction: `You are a ${language} tutor. 
        When correcting mistakes, use English. Other than that, use ${language}
        Your task is to help the user practice this vocabulary deck: ${deck}
        You will give a sentence using a word from this vocabulary deck in English for the user to translate into ${language}.
        The user's language comprehension level is ${level}.
        Adjust the difficulty level to this comprehension level.
        Make a different sentence every time.
        You must correct the user if they make a mistake or if the sentence feels awkward
        Follow this response structure
        Example:
        Question: If I had money, I would buy a car
        User: Ich würde mir ein neues Auto kaufen, wenn ich Geld hätte
        Response: CORRECT
        <next_question>If I were you, I would visit the doctor</next_question>
        Example: 
        Question: If I had money, I would buy a car
        User: Ich will ein neues Auto kaufen, wenn ich Geld haben
        Response: INCORRECT
        <correction>Ich würde mir ein neues Auto kaufen, wenn ich Geld hätte</correction>
        <explanation></explanation>
        <next_question>If I were you, I would visit the doctor</next_question>`,
    },
  });

  const reply = response.text;
  history.push({
    role: "model",
    parts: [{ text: reply }],
  });
  return reply;
}
