## Overall strategy

How did you approach extracting structured data from these documents?

For really low volume, we can use ChatGPT manually (attach PDF and ask to give structured data in a code block).
This is the best in terms of cost, quality, and development speed.

For medium volume (getting hard to do manual extraction), we can use OpenAI APIs for high quality extraction.
Example script is in edp-data-extraction/extract.js

For high volume (economy of scale kicks in), we can use either a local machine or dedicated cloud GPU instance to parse the structured data using custom model network (e.g. pymupdf4llm + local LLM like Qwen + QLoRA optimization to create specialized LLM)

## Model and architecture

What did you use? gpt-5 through OpenAI API

Why that over the alternatives?

- need LLM because the task involves semantic understanding
- local solution for LLM need high spec GPU
- good extraction quality
- minimal development effort
- Assumption: the workload does not need very low latency
  - current parsing time is between 20 seconds and 5 minutes per pdf
- low total cost per file:
  - input token cost: 21,534 / 1,000,000 × $1.25 = $0.0269175
  - output token cost: 957 / 1,000,000 × $10 = $0.00957
  - total token cost: $0.03649

## Accuracy

How do you know the extracted data is correct? What could go wrong and how did you handle it?

Problem: make sure the data is correct
Solution:
- manual checking at first by the ops team (check generated data and compare with the PDF file).
  - this approach still saves data entry time compared to fully manual approach (input data through internal dashboard)
- use statistical method to check for unusual variance
  - and then send alert to the ops team to check throuh an internal dashboard.
- allow users to check pdf and compare with extracted data
  - also add reporting mechanism that will be monitored by the ops team.
Ops team's role can also be handled by the software engineer

Problem: multiple products in one pdf.
Solution: allow schema to return multiple products

Problem: runaway generation
Solution:
- use max_output_tokens in client.responses.create (might cause failure on unusually large pdfs)
- set a hard limit on OpenAI dashboard

Problem: multiple requests to OpenAI for one PDF.
Solution: set maxRetries to 0 to avoid cost explosion. only allow manual retry.

## Research and process

What did you try, what did you question, what did you find? We want to see the thinking, not just the conclusion.

Assumed that one pdf will only contain one product.
After proven wrong, I changed the schema to allow for multiple products.

For epd-australasia-com-wp-content-uploads-2023-08-epd-ies-0009353-003-hallett-ready-mix-concrete-2026-05-04-pdf.pdf:
- Combinatorial explosion of product name and location caused the LLM to not be able to get the data for all products.
- Solution: split the pdf per location so all data can be retrieved.
- This takes more time than just calling the API, but still saves a lot of manual data entry time.
- Still has 1 error out of 44 products which is COLSCLC2: should be S8010 (80 MPa) instead of S6520 (65 MPa)

Further improvement(s):
- check if we can save output token cost by
  - changing the schema
    - from: strict gwp_total with 18 fields,
    - to: gwp_total as `Array<{stage_name: string, gwpt_value: number}>`
    - need to re-check data accuracy
  - abbreviating field names:
    - put the mapping below inside input token
      - "manufacturer" => "m"
      - "manufacturing_location" => "l"
      - "gwp_total" => "g": [{s: "A1", "v":270}]
    - need to re-check data accuracy
- improve UI experience for comparing products
  - while horizontal scrolling is easy for mobile and laptop user, desktop users who only use mouse might struggle
  - find a better way for them to scroll (maybe draggable table, buttons to scroll, or other approaches)

## Bonus

I've created a similar research log for a production machine learning project for one of my previous employers.
You can check the log summary here if you're interested:
https://docs.google.com/presentation/d/1yX8lEYJCkp2J3-bmRwEJUK5pcY_ZwVxULVIdpywcB70/edit?slide=id.p#slide=id.p