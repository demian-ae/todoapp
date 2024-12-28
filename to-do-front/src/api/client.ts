const API_BASE_URL = 'http://localhost:9090/api/v1';

/**
 * Makes an API request to the specified endpoint with the given options.
 * 
 * @template T - The type of the response data.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {RequestInit} [options] - The headers and body of the request.
 * @returns {Promise<T>} - A promise that resolves to the response data.
 * @throws {Error} - If the response status is not ok.
 */
const apiCLient = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

export default apiCLient;
