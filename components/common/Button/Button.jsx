function Button({ type, children }) {
  return (
    <button
      className="bg-gray-300 py-2 px-10"
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

export default Button;
