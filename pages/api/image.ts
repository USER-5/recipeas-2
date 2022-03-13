import { randomUUID } from "crypto";
import formidable, { File as fFile, IncomingForm } from "formidable";
import fs from "fs";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { promisify } from "util";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only supporting post requests
  if (req.method !== "POST") {
    res.status(405).end();
  }

  // Only supported content-type
  const contentType = req.headers["content-type"];
  if (!contentType?.includes("multipart/form-data")) {
    res.status(415).end();
  }

  // Set up form parameters
  const formParams: Partial<formidable.Options> = {
    multiples: false,
    maxFiles: 1,
    maxFileSize: 7 * 1024 * 1024, //7MB
  };
  try {
    const [_, file] = await asyncParse(formParams, req);
    const fileId = await saveFile(file.file as fFile);
    res.json(fileId);
  } catch (e: any) {
    res.status(e.httpCode || 500).end();
  }
  res.status(500).end();
}

/** Turns the formidable form.parse(...) into a promise-based function */
async function asyncParse(
  formOptions: Partial<formidable.Options>,
  req: IncomingMessage
): Promise<[formidable.Fields, formidable.Files]> {
  const form = new IncomingForm(formOptions);
  return new Promise((resolve, reject) => {
    form.parse(
      req,
      (
        err: IncomingMessage,
        fields: formidable.Fields,
        files: formidable.Files
      ) => {
        if (!err) {
          resolve([fields, files]);
        } else {
          reject(err);
        }
      }
    );
  });
}

async function saveFile(file: fFile): Promise<string> {
  const id = randomUUID();
  await promisify(fs.rename)(file.filepath, `./public/uploaded/${id}`);
  return id;
}
