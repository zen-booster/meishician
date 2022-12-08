function EditorInput({ id, name }) {
  return (
    <label htmlFor={id}>
      <input type="text" className="w-full border-black" id={id} name={name} />
    </label>
  );
}

export default EditorInput;
