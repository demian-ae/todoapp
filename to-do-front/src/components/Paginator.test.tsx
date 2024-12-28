import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Paginator } from './Paginator';  // Adjust the path if necessary
import { Page } from '../types/Page';

describe('Paginator Component', () => {
    const mockChangePage = jest.fn();

    const currPage: Page = {
        curr: 1,
        total: 5,
        allAvgTime: '10 min',
        lowAvgTime: '5 min',
        mediumAvgTime: '7 min',
        highAvgTime: '15 min',
        data: [],
    };

    beforeEach(() => {
        mockChangePage.mockClear();
        cleanup();  // Manually clean up after each test
    });

    test('renders the correct number of page buttons', () => {
        render(
            <Paginator currPage={currPage} changePage={mockChangePage} />
        );

        // Check if 5 page buttons are rendered for pages 1 to 5
        for (let i = 1; i <= 5; i++) {
            expect(screen.getByText(i.toString())).toBeInTheDocument();
        }
    });

    test('clicking on a page number changes the current page', async () => {
        render(
            <Paginator currPage={currPage} changePage={mockChangePage} />
        );

        // Click on page 3
        fireEvent.click(screen.getByText('3'));

        // Expect the changePage function to be called with the correct page number
        await waitFor(() => expect(mockChangePage).toHaveBeenCalledWith(3));
    });

    test('clicking on the "Previous" button disables it on the first page', async () => {
        render(
            <Paginator currPage={currPage} changePage={mockChangePage} />
        );

        // Ensure "Previous" button is enabled on the first page (curr: 1)
        const prevButton = screen.getByTestId('previous-button');
        expect(prevButton).toHaveClass('disabled');

        // Now, simulate clicking the "Previous" button
        fireEvent.click(prevButton);

        // Ensure changePage is not called since we are already on the first page
        expect(mockChangePage).not.toHaveBeenCalled();
    });

    test('clicking on the "Next" button navigates to the next page', async () => {
        render(
            <Paginator currPage={currPage} changePage={mockChangePage} />
        );

        // Click on the "Next" button
        fireEvent.click(screen.getByText('Next'));

        // Expect the changePage function to be called with the next page (page 2)
        await waitFor(() => expect(mockChangePage).toHaveBeenCalledWith(2));
    });

    test('clicking on the "Next" button disables it on the last page', async () => {
        // Set the current page to the last page (5)
        const lastPage: Page = { ...currPage, curr: 5 };

        render(
            <Paginator currPage={lastPage} changePage={mockChangePage} />
        );

        // Ensure the "Next" button is disabled on the last page
        const nextButton = screen.getByTestId('next-button');
        expect(nextButton).toHaveClass('disabled');

        // Click on the "Next" button
        fireEvent.click(nextButton);

        // Expect changePage not to be called since we're on the last page
        expect(mockChangePage).not.toHaveBeenCalled();
    });

    test('clicking on the "Previous" button works correctly when not on the first page', async () => {
        // Set the current page to page 3
        const midPage: Page = { ...currPage, curr: 3 };

        render(
            <Paginator currPage={midPage} changePage={mockChangePage} />
        );

        // Click on the "Previous" button
        fireEvent.click(screen.getByText('Previous'));

        // Expect the changePage function to be called with the previous page (page 2)
        await waitFor(() => expect(mockChangePage).toHaveBeenCalledWith(2));
    });

    test('disables "Previous" on the first page and "Next" on the last page', () => {
        render(
            <Paginator currPage={currPage} changePage={mockChangePage} />
        );

        // Check if the "Previous" button is disabled on the first page (curr: 1)
        const prevButton = screen.getByTestId('previous-button');
        expect(prevButton).toHaveClass('disabled');

        // Set the current page to the last page (5)
        const lastPage: Page = { ...currPage, curr: 5 };

        cleanup();  // Manually clean up after each test

        render(
            <Paginator currPage={lastPage} changePage={mockChangePage} />
        );

        // Check if the "Next" button is disabled on the last page (curr: 5)
        const nextButton = screen.getByTestId('next-button');
        expect(nextButton).toHaveClass('disabled');
    });
});
