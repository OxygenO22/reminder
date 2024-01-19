import {FC} from 'react';

interface IInputField {
  value: string,
  handleText: (str: string) => void,
  handleAction: () => void,
}

export const InputField: FC<IInputField> = ({ value, handleText, handleAction }) => {
  return (
    <label>
      <input
        placeholder='new todo'
        className="addtask"
        value={value}
        onChange={(e) => handleText(e.target.value)}
      />
      <button onClick={handleAction}>Add Todo</button>
    </label>
  );
};
