
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Metrics } from './Metrics';  // Adjust the path if necessary

describe('Metrics Component', () => {
    const mockMetrics = {
        all: '2 days',
        low: '3 days',
        medium: '2 days',
        high: '1 day',
    };

    test('renders the component with all metrics', () => {
        render(<Metrics {...mockMetrics} />);

        // Check if the "Average time to finish all tasks" text is displayed correctly
        expect(screen.getByText('Average time to finish all tasks:')).toBeInTheDocument();
        expect(screen.getByText('2 days')).toBeInTheDocument();

        // Check if the "Average time to finish tasks by priority" text is displayed correctly
        expect(screen.getByText('Average time to finish tasks by priority:')).toBeInTheDocument();

        // Check if the priority times are displayed correctly
        expect(screen.getByText('Low: 3 days')).toBeInTheDocument();
        expect(screen.getByText('Medium: 2 days')).toBeInTheDocument();
        expect(screen.getByText('High: 1 day')).toBeInTheDocument();
    });

    test('applies the correct styles for priority', () => {
        render(<Metrics {...mockMetrics} />);

        // Check if the "Low" priority has the correct class (text-success-emphasis)
        const lowPriority = screen.getByText('Low: 3 days');
        expect(lowPriority).toHaveClass('text-success-emphasis');

        // Check if the "Medium" priority has the correct class (text-warning-emphasis)
        const mediumPriority = screen.getByText('Medium: 2 days');
        expect(mediumPriority).toHaveClass('text-warning-emphasis');

        // Check if the "High" priority has the correct class (text-danger-emphasis)
        const highPriority = screen.getByText('High: 1 day');
        expect(highPriority).toHaveClass('text-danger-emphasis');
    });
});
