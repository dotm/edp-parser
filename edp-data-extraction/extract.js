import OpenAI, { toFile } from "openai";
import fs from "node:fs/promises";
import path from "node:path";

console.time("Total");

console.time("Setup");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 0, //avoid multiple requests. allow manual retry only to avoid cost explosion.
});

const pdfPath = process.argv[2];

if (!pdfPath) {
  console.error("Usage: node extract.js <pdf>");
  process.exit(1);
}
console.timeEnd("Setup");

console.time("Read PDF");
const pdf = await toFile(
  await fs.readFile(pdfPath),
  path.basename(pdfPath),
);
console.timeEnd("Read PDF");

console.time("Upload PDF");
const uploaded = await client.files.create({
  file: pdf,
  purpose: "user_data",
});
console.timeEnd("Upload PDF");

console.time("Parsing");
const response = await client.responses.create({
  model: "gpt-5",
  max_output_tokens: 25000,
  input: [{
    role: "user",
    content: [
      {
        type: "input_file",
        file_id: uploaded.id,
      },
      {
        type: "input_text",
        text: `
Extract every distinct product described in this EPD.

Return one object per product.

A product is uniquely identified by:
- product name
- manufacturing location
- compressive strength
- GWP values

If the EPD contains multiple products, return multiple objects.

If the EPD contains only one product, return an array with a single object.

Use null when a value cannot be found.
Do not infer or hallucinate missing values.
        `,
      },
    ],
  }],
  text: {
    format: {
      type: "json_schema",
      name: "epd_extraction",
      strict: true,
      schema: {
        type: "object",
        additionalProperties: false,
        properties: {
          products: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                manufacturer: {
                  type: ["string", "null"]
                },
                product_name: {
                  type: ["string", "null"]
                },
                manufacturing_location: {
                  type: ["string", "null"]
                },
                compressive_strength_mpa: {
                  type: ["number", "null"]
                },
                gwp_total: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    A1: { type: ["number", "null"] },
                    A2: { type: ["number", "null"] },
                    A3: { type: ["number", "null"] },
                    A1_A3: { type: ["number", "null"] },
                    A4: { type: ["number", "null"] },
                    A5: { type: ["number", "null"] },
                    B1: { type: ["number", "null"] },
                    B2: { type: ["number", "null"] },
                    B3: { type: ["number", "null"] },
                    B4: { type: ["number", "null"] },
                    B5: { type: ["number", "null"] },
                    B6: { type: ["number", "null"] },
                    B7: { type: ["number", "null"] },
                    C1: { type: ["number", "null"] },
                    C2: { type: ["number", "null"] },
                    C3: { type: ["number", "null"] },
                    C4: { type: ["number", "null"] },
                    D: { type: ["number", "null"] }
                  },
                  required: [
                    "A1","A2","A3","A1_A3","A4","A5",
                    "B1","B2","B3","B4","B5","B6","B7",
                    "C1","C2","C3","C4","D"
                  ]
                }
              },
              required: [
                "manufacturer",
                "product_name",
                "manufacturing_location",
                "compressive_strength_mpa",
                "gwp_total"
              ]
            }
          }
        },
        required: ["products"]
      }
    }
  },
});
console.timeEnd("Parsing");

console.time("Write JSON");
const json = JSON.parse(response.output_text);

await fs.mkdir("../data", {
  recursive: true,
});

const outputFile = path.join(
  "../data",
  path.basename(pdfPath, path.extname(pdfPath)) + ".json"
);

await fs.writeFile(
  outputFile,
  JSON.stringify(json, null, 2)
);
console.timeEnd("Write JSON");

console.log(`Saved: ${outputFile}`);

console.log("\n=== Token Usage ===");
console.log(response.usage);
console.timeEnd("Total");
