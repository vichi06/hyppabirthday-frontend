import React, { useState } from "react";

interface ChildComponentProps {
  emails: string[];
  setEmails: React.Dispatch<React.SetStateAction<string[]>>;
}

const EmailInput: React.FC<ChildComponentProps> = ({ emails, setEmails }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === " ") {
      event.preventDefault(); // Prevent form submission or default behavior
      addEmail(inputValue.trim());
    }
  };

  const addEmail = (email: string) => {
    if (email && validateEmail(email)) {
      setEmails([...emails, email]);
      setInputValue("");
    }
  };

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="">
      <div className="border border-gray-300 rounded-md p-0.5 flex flex-wrap ">
        {emails.map((email, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full m-1"
          >
            {email}
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeEmail(index)}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Entrer les emails"
          className="flex-grow p-1 outline-none border-none text-sm"
        />
      </div>
    </div>
  );
};

export default EmailInput;
