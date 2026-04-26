# HNG Stage 0 — API Integration &amp; Data Processing Assessment

A simple browser-based app that predicts the gender of a given name using the [Genderize.io](https://genderize.io/) API.

## Features

- Accepts a name as input via a form
- Validates input (empty string, non-string types)
- Fetches gender prediction data from the Genderize.io API
- Renames `count` to `sample_size` for clarity
- Flags high-confidence results (`probability > 0.7` and `sample_size > 100`)
- Returns a structured JSON response with a UTC ISO 8601 `processed_at` timestamp

## Project Structure

```
Stage 0/
├── index.html   # UI — name input form
└── index.js     # Logic — validation, API call, response formatting
```

## How to Run

> **Important:** Open via a local HTTP server, not by double-clicking the file.  
> The `file://` protocol causes CORS errors when fetching from the API.

**Recommended — VS Code Live Server:**
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

**Alternative — Python:**
```bash
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

## Response Format

### Success
```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.98,
    "sample_size": 154821,
    "is_confident": true,
    "processed_at": "2026-04-27T00:00:00.000Z"
  }
}
```

### Error — Empty input
```json
{
  "status": "error",
  "message": "Bad Request"
}
```

### Error — Low confidence result
```json
{
  "status": "error",
  "message": "Probability is less than 0.7 or sample size is less than 100"
}
```

## API Reference

- **Endpoint:** `https://api.genderize.io/?name={name}`
- **Docs:** [genderize.io](https://genderize.io/)
- No API key required for basic usage

## Tech Stack

- HTML5
- Vanilla JavaScript (ES2017+ async/await)
- Genderize.io public API
