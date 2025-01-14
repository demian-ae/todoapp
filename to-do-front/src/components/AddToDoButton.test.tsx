import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddToDoButton } from './AddToDoButton'; 

describe('AddToDoButton Component', () => {
    const mockToggleForm = jest.fn();

    test('renders the button with correct text and icon', () => {
        render(<AddToDoButton toggleForm={mockToggleForm} />);

        // Check if the button is rendered
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        // Check if the button contains the correct text
        expect(screen.getByText('Add to-do')).toBeInTheDocument();

        // Check if the button contains the correct icon
        const icon = screen.getByTestId('icon-add-circle');
        expect(icon).toBeInTheDocument();
    });

    test('calls toggleForm when clicked', () => {
        render(<AddToDoButton toggleForm={mockToggleForm} />);

        // Find the button and simulate a click
        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Assert that the toggleForm function was called
        expect(mockToggleForm).toHaveBeenCalledTimes(1);
    });
});
