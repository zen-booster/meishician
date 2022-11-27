function Button({ type, children, variant }) {
  return (
    <button
      className={`${
        variant === 'outlined' && 'border border-main-01 bg-white text-main-01'
      } ${
        variant === 'contained' && ' bg-main-01 text-white'
      }  h-14 w-36 rounded-xl py-3 text-center`}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

export default Button;
