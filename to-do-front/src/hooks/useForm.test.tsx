import { renderHook, act } from "@testing-library/react";
import { ToDo } from "../types/ToDo";
import { useForm } from "./useForm";
import { createToDo } from "../api/ToDoService";

// Mock the createToDo API function
jest.mock("../api/ToDoService", () => ({
    createToDo: jest.fn(),
}));

describe("useForm", () => {
    const mockToDo = {
        id: null,
        text: "Sample Task",
        done: false,
        priority: 1,
        doneDate: "",
        dueDate: "2024-12-31T12:00",
        creationDate: "2024-12-27T12:00",
    };

    test("should initialize with the given state", () => {
        const { result } = renderHook(() => useForm(mockToDo));
        expect(result.current.data).toEqual(mockToDo);
    });

    test("should update the state when handleChange is called", () => {
        const { result } = renderHook(() => useForm(mockToDo));

        act(() => {
            result.current.handleChange({
                target: { name: "text", value: "Updated Task" },
            } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.data.text).toBe("Updated Task");
    });

    test("should call createToDo and reset the state on successful submit", async () => {
        const { result } = renderHook(() => useForm(mockToDo));

        // Mock successful API response
        (createToDo as jest.Mock).mockResolvedValue({ ...mockToDo });

        await act(async () => {
            await result.current.handleSubmit(result.current.data, {
                preventDefault: jest.fn(),
            } as unknown as React.FormEvent);
        });

        // Expect createToDo to have been called with the correct data
        expect(createToDo).toHaveBeenCalledWith(mockToDo);

        // Expect state to be reset
        expect(result.current.data.text).toBe("");
        expect(result.current.data.priority).toBe(1);
    });

    test("should handle errors during submit gracefully", async () => {
        const { result } = renderHook(() => useForm(mockToDo));

        // Mock API failure
        (createToDo as jest.Mock).mockRejectedValue(new Error("API Error"));

        await act(async () => {
            await result.current.handleSubmit(result.current.data, {
                preventDefault: jest.fn(),
            } as unknown as React.FormEvent);
        });

        // Expect createToDo to have been called
        expect(createToDo).toHaveBeenCalledWith(mockToDo);

        // Ensure state was reset despite the error
        expect(result.current.data.text).toBe("");
        expect(result.current.data.priority).toBe(1);
    });

    test("should update the entire state when setFormulario is called", () => {
        const { result } = renderHook(() => useForm(mockToDo));

        act(() => {
            result.current.setFormulario({
                ...mockToDo,
                text: "Updated Task",
                priority: 2,
            });
        });

        expect(result.current.data.text).toBe("Updated Task");
        expect(result.current.data.priority).toBe(2);
    });
});
