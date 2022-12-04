/*
variant: 'outline', 'contained'
color: 'main-01', 'danger'
submit: boolean
*/

function Button({ children, variant, color, className, submit, onClick }) {
  variant = variant ?? 'contained';
  color = color ?? 'main-01';
  className = className ?? '';

  const colorMap = {
    border: {
      'main-01': 'border-main-01',
      danger: 'border-danger',
    },
    bg: {
      'main-01': 'bg-main-01',
      danger: 'bg-danger',
    },
    text: {
      'main-01': 'text-main-01',
      danger: 'text-danger',
    },
  };

  const generateStyle = () => {
    const baseStyles = `py-3 px-5 rounded-xl text-center font-bold text-xl`;

    const specificStyles = {
      outlined: `border ${colorMap.border[color]} ${colorMap.text[color]}`,
      contained: `${colorMap.bg[color]} text-white`,
    };

    const customClassName = className;
    return `${baseStyles} ${specificStyles[variant]} ${customClassName}`;
  };

  const totalStyles = generateStyle();

  return (
    <button
      className={totalStyles}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
