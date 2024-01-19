import { FC } from 'react';
import { useAppDispatch } from '../hooks'; 
import { deleteTodo, toggleStatus } from '../store/todoSlice';

interface ITodoItem {
  id: string,
  title: string,
  completed: boolean,
}


export const TodoItem: FC<ITodoItem> = ({ id, title, completed }) => {
  const dispatch = useAppDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(deleteTodo(id))}>
        &times;
      </span>
    </li>
  );
};
