import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { fullRecipeToPrismaUpdate } from "utils/converters/recipe";
import { defined } from "utils/define";
import { createRecipe, updateRecipe } from "utils/serverFunctions/persist";

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await post(req, res);
    case "DELETE":
      return await del(req, res);
    case "PUT":
      return await put(req, res);
    default:
      // Endpoint does not exist
      res.status(400).end();
  }
}

async function post(req: NextApiRequest, res: NextApiResponse<string>) {
  try {
    const recipe = await createRecipe(JSON.parse(req.body));
    const id = recipe.id;
    res.json(id);
  } catch (e: any) {
    console.warn("Creation Error: " + e);
    res.status(e.responseCode || 500).send(e.message);
  }
}

async function del(req: NextApiRequest, res: NextApiResponse) {
  try {
    // request should contain the ID
    const id = req.query.id as string;
    await prisma.recipe.delete({ where: { id } });
    res.status(200).end();
  } catch (e) {
    console.warn("Deletion Error: " + e);
    res.status(500).end();
  }
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  try {
    await updateRecipe(JSON.parse(req.body));
    res.status(200).end();
  } catch (e: any) {
    console.warn("Update Error: " + e);
    res.status(e.responseCode || 500).send(e.message);
  }
}
