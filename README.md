# Service Agreement Document Viewer

A React component for rendering legal documents with hierarchical clause numbering and dynamic mentions.

## Features

- Hierarchical clause numbering
  - Top-level clauses use numerical numbering (1, 2, 3...)
  - Nested clauses use alphabetical numbering (a, b, c...)
  - Maintains proper numbering regardless of nesting depth or intermediate elements (only two levels of nesting though)
- Dynamic mentions system
  - Mentions are identified by their data-attribute, which could be used to filter all mentions of the same id to update.
  - CSS ids should be unique
- Clean typography and layout
  - Helvetica-based font stack
  - Proper spacing and indentation
  - White-space preservation in paragraphs and headers

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Usage

The viewer takes a JSON document structure and renders it with proper formatting and numbering:

$typescript
interface JsonElement {
    type?: 'block' | 'clause' | 'mention' | 'h1' | 'h4' | 'p' | 'li' | 'ul' | 'lic';
    children?: JsonElement[];
    color?: string;
    bold?: boolean;
    underline?: boolean;
    text?: string;
    title?: string;
    id?: string;
    value?: string;
}

<ServiceAgreementViewer element={documentJson} />
$

## Example Document Structure

$json
{
  "type": "block",
  "children": [
    {
      "type": "clause",
      "children": [
        {
          "type": "p",
          "children": [
            {
              "text": "Main clause text"
            }
          ]
        },
        {
          "type": "clause",
          "children": [
            {
              "type": "p",
              "children": [
                {
                  "text": "Nested clause text"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
$

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
