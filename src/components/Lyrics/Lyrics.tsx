import { ChangeEvent, FC, useState } from "react";

interface ILyricsProps {
  text: string;
}

const Lyrics: FC<ILyricsProps> = ({ text }) => {
  // State variable to manage the checkbox state
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      {isChecked && <p>{text}</p>}
      <label>
        {/* Use the state variable to set the default checked state */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        See lyrics?
      </label>
    </div>
  );
};

export default Lyrics;
