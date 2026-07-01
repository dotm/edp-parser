
## Data Extraction

- Put EDP files in `<root-project-directory>/edp-files`
- cd edp-data-extraction
- npm install
- export OPENAI_API_KEY=your_api_key
  - Powershell: $env:OPENAI_API_KEY="your_api_key"
- node extract.js ../edp-files/EPD_HUB-5210_2026-06-27_en.pdf