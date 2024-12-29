import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Error } from './Error';

test('renders Error component with provided error message', () => {
    const errorMessage = 'This is a test error message';
    const { getByRole, getByText } = render(<Error error={errorMessage} />);

    // Check if the alert is rendered
    const alert = getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('alert alert-danger');

    // Check if the error message is rendered
    const errorText = getByText(errorMessage);
    expect(errorText).toBeInTheDocument();

    // Check if the static text is rendered
    const staticText = getByText('An error occurred:');
    expect(staticText).toBeInTheDocument();

    const tryAgainText = getByText('Try search again');
    expect(tryAgainText).toBeInTheDocument();
});