// Loading.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Loading } from './Loading';

test('renders Loading component correctly', () => {
    const { getByRole, getByText } = render(<Loading />);

    // Check if the spinner is rendered
    const spinner = getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner-border');
    expect(spinner).toHaveStyle({ width: '3rem', height: '3rem' });

    // Check if the visually hidden text is rendered
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('visually-hidden');
});