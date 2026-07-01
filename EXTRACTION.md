## Overall strategy

How did you approach extracting structured data from these documents?

For really low volume, we can use ChatGPT manually (attach PDF and ask to give structured data in a code block).
This is the best in terms of cost, quality, and development speed.

For medium volume (getting hard to do manual extraction), we can use OpenAI APIs for high quality extraction.
Example script is in edp-data-extraction/extract.js

For high volume (economy of scale kicks in), we can use either a local machine or dedicated cloud GPU instance to parse the structured data using custom model network (e.g. pymupdf4llm + local LLM like Qwen + QLoRA optimization)

## Model and architecture

What did you use, and why that over the alternatives?

gpt-5 through OpenAI API

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

I considered making the gwp_total field an array to reduce the number of fields with null value.
But I decided against it for the sake of stricter schema.

Tried researching local LLM solution.
Found out that to get high quality results, we need parameter with high numbers of parameters.
We might train a checkpoint ???
Assumption: the pdf has extractable texts (not just images)