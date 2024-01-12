import React from 'react'

export const InputField = ({text, handleInput, handleSubmit}) => {
  return (
    <label >
      <input className='addtask' value={text} onChange={(e) => handleInput(e.target.value)} />
      <button onClick={handleSubmit}>Add Todo</button>
    </label>
  )
}
