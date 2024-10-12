import React from "react";
import { AiFillWarning } from "react-icons/ai";

const Message = ({ text }: { text: string }) => {
  return (
    <div className="items-center inline-flex gap-2 px-2 border border-warningBorder bg-warningBackground rounded-md p-1 ">
      <AiFillWarning size={15} className="text-warningBorder" />
      <small className="text-warningBorder">{text}</small>
    </div>
  );
};

export default Message;
