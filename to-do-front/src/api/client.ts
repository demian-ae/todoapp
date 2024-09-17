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

    return response.json();
};

export default apiCLient;
