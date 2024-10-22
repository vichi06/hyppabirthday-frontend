import React, { Dispatch, SetStateAction } from "react";

import styles from "./styles.module.css";

const SpecialInput = ({
  value,
  setValue,
  label,
  type,
  autofocus,
  autoComplete,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label: string;
  type: string;
  autofocus?: boolean;
  autoComplete?: string;
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        id={type}
        placeholder=" "
        type={type}
        value={value}
        required
        onChange={(e) => setValue(e.target.value)}
        name={type}
        autoComplete={autoComplete}
        autoFocus={autofocus}
      />
      <div>
        <label htmlFor={type}>{label}</label>
      </div>
    </div>
  );
};

export default SpecialInput;
