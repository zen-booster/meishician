import { useState } from 'react';

function ToggleButton() {
  const [isOn, setIsOn] = useState(true);

  const toggleStatus = () => {
    setIsOn(!isOn);
  };

  return (
    <button
      className="bg-gray-300 py-2 px-10"
      onClick={toggleStatus}
      type="button"
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleButton;
