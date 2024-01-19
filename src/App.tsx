import './App.css';
import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { useAppDispatch, useAppSelector } from './hooks'; 
import { fetchTodos, addNewTodo } from './store/todoSlice';
import { InputField } from './components/InputField';

function App() {
  const [text, setText] = useState('');
  const { loading, error} = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const handleAction = () => {
    text !== "" && dispatch(addNewTodo(text));
    setText("");
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch])

  return (
    <div className="App">
      <InputField 
        value={text} 
        handleText={setText} 
        handleAction={handleAction}
      />
      {loading  && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error} </h2>}
      <TodoList />
    </div>
  );
}

export default App;
