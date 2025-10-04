import type { VercelRequest, VercelResponse } from "@vercel/node";
import { vocabApi } from "../services/vocabApi";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method == "POST") {
    const { input, deck = [], language, level } = req.body;
    console.log(input);
    try {
      const response = await vocabApi(input, deck, language, level);
      res.send(response);
    } catch (err) {
      console.error("API error: ", err);
      res.status(500).json({ message: err });
    }
  }
}
