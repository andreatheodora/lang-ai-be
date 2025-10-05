import type { VercelRequest, VercelResponse } from "@vercel/node";
import { basicApi } from "../services/basicApi";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://lang-ai-beta.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method == "POST") {
    const { input, words = [], grammars = [], language, level } = req.body;
    try {
      const response = await basicApi(input, words, grammars, language, level);
      res.status(200).send(response);
    } catch (err) {
      console.error("API error: ", err);
      res.status(500).json({ message: err });
    }
  }
}
