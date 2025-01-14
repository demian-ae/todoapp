import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoForm } from './ToDoForm';
import { ToDo } from '../types/ToDo';
import { useForm } from '../hooks/useForm';

jest.mock('../hooks/useForm');
const mockUseForm = useForm as jest.Mock;

describe('ToDoForm Component', () => {
    const mockToggleForm = jest.fn();
    const mockReloadTodos = jest.fn();

    beforeEach(() => {
        mockUseForm.mockReturnValue({
            text: '',
            dueDate: '',
            data: ToDo(),
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFormulario: jest.fn(),
        });
        jest.clearAllMocks();
    });

    test('renders correctly for a new to-do', () => {
        render(<ToDoForm toggleForm={mockToggleForm} reloadTodos={mockReloadTodos} existingTodo={null} />);
        expect(screen.getByText('New to-do')).toBeInTheDocument();
    });

    test('renders correctly for editing an existing to-do', () => {
        const existingTodo = { ...ToDo(), text: 'Test Task' };

        // Mock useForm to return the state reflecting the existingTodo
        mockUseForm.mockReturnValue({
            text: existingTodo.text,
            dueDate: existingTodo.dueDate,
            data: existingTodo,
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFormulario: jest.fn(),
        });

        render(<ToDoForm toggleForm={mockToggleForm} reloadTodos={mockReloadTodos} existingTodo={existingTodo} />);
        expect(screen.getByText('Edit to-do')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
    });

    test('enables the submit button when text is not empty', () => {
        mockUseForm.mockReturnValue({
            text: 'Sample Task',
            dueDate: '',
            data: ToDo(),
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFormulario: jest.fn(),
        });
        render(<ToDoForm toggleForm={mockToggleForm} reloadTodos={mockReloadTodos} existingTodo={null} />);
        expect(screen.getByText('Save')).not.toBeDisabled();
    });

    test('calls toggleForm and reloadTodos on successful submission', () => {
        const handleSubmit = jest.fn();
        mockUseForm.mockReturnValue({
            text: 'Sample Task',
            dueDate: '',
            data: ToDo(),
            handleChange: jest.fn(),
            handleSubmit,
            setFormulario: jest.fn(),
        });
        render(<ToDoForm toggleForm={mockToggleForm} reloadTodos={mockReloadTodos} existingTodo={null} />);
        // Locate the form
        const form = screen.getByRole('form', { name: 'To-Do Form' });

        // Submit the form
        fireEvent.submit(form);
        
        expect(handleSubmit).toHaveBeenCalled();
        expect(mockToggleForm).toHaveBeenCalled();
        expect(mockReloadTodos).toHaveBeenCalled();
    });

    test('calls toggleForm when Cancel button is clicked', () => {
        render(<ToDoForm toggleForm={mockToggleForm} reloadTodos={mockReloadTodos} existingTodo={null} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockToggleForm).toHaveBeenCalled();
    });
});
