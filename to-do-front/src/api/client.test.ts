/**
 * This file contains tests for the `apiClient` module.
 *
 * @module apiClientTest
 */

// This code is mocking the global `fetch` function using Jest's mocking functionality.
global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

import apiClient from './client';

describe('apiClient', () => {
    beforeEach(() => {
        mockFetch.mockReset();
    });

    test('should make a GET request and return JSON data', async () => {
        const mockResponse = { data: 'test' };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });

        const result = await apiClient('/test-endpoint');

        expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/test-endpoint', {
            headers: { 'Content-Type': 'application/json' },
        });
        expect(result).toEqual(mockResponse);
    });


    test('should make a POST request with the correct options', async () => {
        const mockResponse = { success: true };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
    
        const result = await apiClient('/test-endpoint', {
            method: 'POST',
            body: JSON.stringify({ key: 'value' }),
        });
    
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/test-endpoint', {
            method: 'POST',
            body: JSON.stringify({ key: 'value' }),
            headers: { 'Content-Type': 'application/json' },
        });
        expect(result).toEqual(mockResponse);
    });

    test('should include custom headers in the request', async () => {
        const mockResponse = { success: true };
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(mockResponse),
        });
    
        await apiClient('/test-endpoint', {
            headers: { Authorization: 'Bearer token123' },
        });
    
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/test-endpoint', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer token123',
            },
        });
    });

    
    test('should throw an error for non-OK HTTP status', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: jest.fn(),
        });
    
        await expect(apiClient('/test-endpoint')).rejects.toThrow('HTTP error! Status: 404');
    });

    test('should throw an error if fetch fails', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
        await expect(apiClient('/test-endpoint')).rejects.toThrow('Network error');
    });

    
    test('should handle response with no JSON body', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce(undefined),
        });
    
        const result = await apiClient('/test-endpoint');
    
        expect(result).toBeUndefined();
    });

    test('should prepend API_BASE_URL to the endpoint', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({}),
        });
    
        await apiClient('/relative-path');
    
        expect(mockFetch).toHaveBeenCalledWith('http://localhost:9090/relative-path', {
            headers: { 'Content-Type': 'application/json' },
        });
    });    
});


