import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OrderButtons } from './OrderButtons';  // Adjust the path if necessary
import { SearchAndFilter } from '../types/SearchAndFilter';

describe('OrderButtons Component', () => {
    const mockChangeSearchAndFilter = jest.fn();

    const currentSearchAndFilter: SearchAndFilter = {
        done: true,
        priority: 1,
        text: 'test',
    };

    beforeEach(() => {
        mockChangeSearchAndFilter.mockClear();
    });

    test('renders with initial state', () => {
        render(
            <OrderButtons 
                currentSearchAndFilter={currentSearchAndFilter} 
                changeSearchAndFilter={mockChangeSearchAndFilter} 
            />
        );

        // Check if the "Priority" button has the correct initial text and style
        const priorityButton = screen.getByText('Priority');
        expect(priorityButton).toHaveClass('btn m-2');
        expect(priorityButton).not.toHaveClass('active');
        expect(screen.queryByText(/asc|desc/)).not.toBeInTheDocument();

        // Check if the "Due Date" button has the correct initial text and style
        const dueDateButton = screen.getByText('Due Date');
        expect(dueDateButton).toHaveClass('btn m-2');
        expect(dueDateButton).not.toHaveClass('active');
        expect(screen.queryByText(/asc|desc/)).not.toBeInTheDocument();
    });

    test('cycles the priority sorting state correctly', async () => {
        render(
            <OrderButtons 
                currentSearchAndFilter={currentSearchAndFilter} 
                changeSearchAndFilter={mockChangeSearchAndFilter} 
            />
        );

        const priorityButton = screen.getByText('Priority');

        // Click once, should go from "none" to "asc"
        fireEvent.click(priorityButton);
        expect(priorityButton).toHaveClass('active');
        expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isPriorityAsc: true,
        }));

        // Click again, should go from "asc" to "desc"
        fireEvent.click(priorityButton);
        expect(priorityButton).toHaveClass('active');
        expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isPriorityAsc: false,
        }));

        // Click once more, should go back to "none"
        fireEvent.click(priorityButton);
        expect(priorityButton).not.toHaveClass('active');
        expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isPriorityAsc: undefined,
        }));
    });

    test('cycles the due date sorting state correctly', async () => {
        render(
            <OrderButtons 
                currentSearchAndFilter={currentSearchAndFilter} 
                changeSearchAndFilter={mockChangeSearchAndFilter} 
            />
        );

        const dueDateButton = screen.getByText('Due Date');

        // Click once, should go from "none" to "asc"
        fireEvent.click(dueDateButton);
        expect(dueDateButton).toHaveClass('active');
        expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isDueDateAsc: true,
        }));

        // Click again, should go from "asc" to "desc"
        fireEvent.click(dueDateButton);
        expect(dueDateButton).toHaveClass('active');
        expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isDueDateAsc: false,
        }));

        // Click once more, should go back to "none"
        fireEvent.click(dueDateButton);
        expect(dueDateButton).not.toHaveClass('active');
        expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isDueDateAsc: undefined,
        }));
    });

    test('calls changeSearchAndFilter with correct values when sorting changes', async () => {
        render(
            <OrderButtons 
                currentSearchAndFilter={currentSearchAndFilter} 
                changeSearchAndFilter={mockChangeSearchAndFilter} 
            />
        );

        const priorityButton = screen.getByText('Priority');
        const dueDateButton = screen.getByText('Due Date');

        // Click to toggle priority
        fireEvent.click(priorityButton);
        await waitFor(() => expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isPriorityAsc: true,
        })));

        // Click to toggle due date
        fireEvent.click(dueDateButton);
        await waitFor(() => expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isDueDateAsc: true,
        })));

        // Click again to toggle priority and verify the change
        fireEvent.click(priorityButton);
        await waitFor(() => expect(mockChangeSearchAndFilter).toHaveBeenCalledWith(expect.objectContaining({
            isPriorityAsc: false,
        })));
    });
});
