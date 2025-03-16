# OpenAI API Integration

This project is a simple Node.js application that integrates with the OpenAI API to generate HTML, CSS, and JavaScript code based on user prompts.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository.
2. Install the dependencies.

### Running the Application

1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running on `http://localhost:3000`.

### API Endpoints

#### GET /

- **Description**: Returns a welcome message and available endpoints.
- **Response**:
    ```json
    {
      "message": "Endpoint available: POST /openai"
    }
    ```

#### POST /openai

- **Description**: Generates HTML, CSS, and JavaScript code based on the provided prompt.
- **Headers**:
    - `x-api-key`: Your OpenAI API key.
- **Request Body**:
    ```json
    {
      "prompt": "Your prompt here"
    }
    ```
- **Response**:
    ```json
    {
      "html": "<!DOCTYPE html><html>...</html>"
    }
    ```

### Example Usage

1. Send a POST request to `http://localhost:3000/openai` with the following body:
    ```json
    {
      "prompt": "Create a simple HTML page with a header and a paragraph."
    }
    ```

2. The response will contain the generated HTML code.

3. Open the generated HTML file in a browser to view the result.q

### cURL

```sh
curl --location 'http://localhost:3000/openai' \
--header 'Content-Type: application/json' \
--header 'x-api-key: <YOUR-API-KEY>' \
--data '{
    "prompt": "Generate an interface for a login page"
}'
```
