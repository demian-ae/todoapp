const API_BASE_URL = 'http://localhost:9090';

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
    // console.log(response)



    // return response.json();

    // // Log the response content type and length
    // console.log('Content-Type:', response.headers.get('Content-Type'));
    // console.log('Content-Length:', response.headers.get('Content-Length'));

    // Check if the response is empty
    if (response.headers.get('Content-Length') === '0') {
        throw new Error('Empty response body');
    }

    // Try to parse the response JSON
    const data = await response.json();
    return data;
};

export default apiCLient;
