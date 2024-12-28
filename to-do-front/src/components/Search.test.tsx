import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Search } from './Search';
import { SearchAndFilter } from '../types/SearchAndFilter';

describe('Search Component', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        mockOnSearch.mockClear();
    });

    test('renders the form elements', () => {
        render(<Search onSearch={mockOnSearch} />);

        // Check if the form elements are rendered
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
        expect(screen.getByLabelText('Priority:')).toBeInTheDocument();
        expect(screen.getByLabelText('State:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    });

    test('updates text input correctly', () => {
        render(<Search onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText('Search');
        fireEvent.change(input, { target: { value: 'test todo' } });

        expect(input).toHaveValue('test todo');
    });

    test('selects priority and updates state', () => {
        render(<Search onSearch={mockOnSearch} />);

        const select = screen.getByLabelText('Priority:');
        fireEvent.change(select, { target: { value: '2' } });

        expect(select).toHaveValue('2');
    });

    test('selects done state and updates state', () => {
        render(<Search onSearch={mockOnSearch} />);

        const select = screen.getByLabelText('State:');
        fireEvent.change(select, { target: { value: 'done' } });

        expect(select).toHaveValue('done');
    });

    test('calls onSearch with correct parameters on form submission', async () => {
        render(<Search onSearch={mockOnSearch} />);

        // Simulate changing input and selections
        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test todo' } });
        fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText('State:'), { target: { value: 'done' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        // Expect the onSearch function to be called with the correct search and filter values
        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledWith({
                text: 'test todo',
                priority: 2,
                done: true,
            });
        });
    });

    test('calls onSearch with correct parameters when "all" is selected for done state', async () => {
        render(<Search onSearch={mockOnSearch} />);

        // Simulate changing input and selections
        fireEvent.change(screen.getByPlaceholderText('Search'), { target: { value: 'test todo' } });
        fireEvent.change(screen.getByLabelText('Priority:'), { target: { value: '2' } });
        fireEvent.change(screen.getByLabelText('State:'), { target: { value: 'all' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /search/i }));

        // Expect the onSearch function to be called with the correct parameters, with "done" as undefined
        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledWith({
                text: 'test todo',
                priority: 2,
                done: undefined,
            });
        });
    });
});
