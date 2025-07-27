// The backend URL will be read from an environment variable,
// but will default to your local server for development.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export async function uploadFile(file, generateSummary) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('generateSummary', generateSummary);

  try {
    // Use the dynamic BACKEND_URL
    const response = await fetch(`${BACKEND_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}

export async function sendQuery(query) {
  try {
    // Use the dynamic BACKEND_URL
    const response = await fetch(`${BACKEND_URL}/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Query error:', error);
    return { 
        decision: "Error", 
        amount: "N/A", 
        justification: ["Could not connect to the server or an API error occurred."] 
    };
  }
}
