import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function(_, {rejectWithValue}) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
  
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Can\'t delete task. Server error.')
      }
      dispatch(removeTodo({id}));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function(id, {rejectWithValue, dispatch, getState}) {
    const todo = getState().todos.todos.find(todo => todo.id === id);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        })
      })
      
      if (!response.ok) {
        throw new Error('Can\'t toggle status. Server error.')
      }

      dispatch(toggleTodoComplete({id}));

    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function(text, {rejectWithValue, dispatch}) {
    const todo = {
      title: text,
      userId: 1,
      completed: false,
    };

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
      })
      
      if (!response.ok) {
        throw new Error('Can\'t add task. Server error.')
      }
      const data = await response.json();
      dispatch(addTodo(data));

    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
}

const todoSlice = createSlice({
  name: 'todos',

  initialState: {
    todos: [],
    status: null,
    error: null,
  },

  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodoComplete(state, action) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => setError);
    builder.addCase(deleteTodo.rejected, (state, action) => setError);
    builder.addCase(toggleStatus.rejected, (state, action) => setError);
  }
});

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions;

export default todoSlice.reducer;