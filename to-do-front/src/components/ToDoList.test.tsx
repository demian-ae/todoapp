import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from './ToDoList';
import { ToDo } from '../types/ToDo';

describe('ToDoList component', () => {

    const mockHandleMarkDone = jest.fn();
    const mockHandleMarkUnDone = jest.fn();
    const mockHandleDelete = jest.fn();
    const mockHandleEdit = jest.fn();

    const mockTodos: ToDo[] = [
        {
            id: 1,
            text: 'Test Todo 1',
            done: false,
            priority: 2,
            doneDate: '',
            dueDate: '2024-12-25T12:00:00',
            creationDate: '2024-12-24T12:00:00'
        },
        {
            id: 2,
            text: 'Test Todo 2',
            done: true,
            priority: 3,
            doneDate: '2024-12-25T14:00:00',
            dueDate: '2024-12-26T12:00:00',
            creationDate: '2024-12-24T12:00:00'
        }
    ];

    test('renders the ToDoList component with todos', () => {
        render(
            <ToDoList
                todos={mockTodos}
                handleMarkDone={mockHandleMarkDone}
                handleMarkUnDone={mockHandleMarkUnDone}
                handleDelete={mockHandleDelete}
                handleEdit={mockHandleEdit}
            />
        );

        // Check if the to-dos are displayed
        expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();

        // Check if priority and due date are correctly rendered
        expect(screen.getByText(/Medium/i)).toBeInTheDocument();
        expect(screen.getByText(/High/i)).toBeInTheDocument();
        expect(screen.getByText(/2024-12-25 12:00/i)).toBeInTheDocument();
        expect(screen.getByText(/2024-12-26 12:00/i)).toBeInTheDocument();
    });


    test('clicking checkbox calls the appropriate handler to mark done/undone', () => {
        render(
          <ToDoList
            todos={mockTodos}
            handleMarkDone={mockHandleMarkDone}
            handleMarkUnDone={mockHandleMarkUnDone}
            handleDelete={mockHandleDelete}
            handleEdit={mockHandleEdit}
          />
        );
      
        // Get the checkbox for the first todo and click it to mark as done
        const firstCheckbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(firstCheckbox);
      
        expect(mockHandleMarkDone).toHaveBeenCalledWith(1); // Check that it calls handleMarkDone
      
        // Get the checkbox for the second todo and click it to mark as undone
        const secondCheckbox = screen.getAllByRole('checkbox')[1];
        fireEvent.click(secondCheckbox);
      
        expect(mockHandleMarkUnDone).toHaveBeenCalledWith(2); // Check that it calls handleMarkUnDone
      });

      test('clicking delete button calls handleDelete with correct id', () => {
        render(
          <ToDoList
            todos={mockTodos}
            handleMarkDone={mockHandleMarkDone}
            handleMarkUnDone={mockHandleMarkUnDone}
            handleDelete={mockHandleDelete}
            handleEdit={mockHandleEdit}
          />
        );
      
        // Get the delete button for the first todo using data-testid and click it
        const deleteButton = screen.getByTestId('delete-button-1');
        fireEvent.click(deleteButton);
      
        // Check that it calls handleDelete with the correct id (1)
        expect(mockHandleDelete).toHaveBeenCalledWith(1);
      });      

      test('clicking edit button calls handleEdit with correct todo', () => {
        render(
          <ToDoList
            todos={mockTodos}
            handleMarkDone={mockHandleMarkDone}
            handleMarkUnDone={mockHandleMarkUnDone}
            handleDelete={mockHandleDelete}
            handleEdit={mockHandleEdit}
          />
        );
      
        // Get the edit button for the first todo using data-testid and click it
        const editButton = screen.getByTestId('edit-button-1');
        fireEvent.click(editButton);
      
        // Check that it calls handleEdit with the correct todo (the first one in mockTodos)
        expect(mockHandleEdit).toHaveBeenCalledWith(mockTodos[0]);
      });      

      test('applies text decoration for done todos', () => {
        render(
          <ToDoList
            todos={mockTodos}
            handleMarkDone={mockHandleMarkDone}
            handleMarkUnDone={mockHandleMarkUnDone}
            handleDelete={mockHandleDelete}
            handleEdit={mockHandleEdit}
          />
        );
      
        // Check if the second todo (done) has the correct text decoration class
        const doneTodoText = screen.getByText(/Test Todo 2/i);
        expect(doneTodoText).toHaveClass('text-decoration-line-through');
      });      
});