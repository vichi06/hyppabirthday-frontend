import Image from "next/image";
import React, { ReactNode } from "react";

import background from "../../../public/assets/background.png";

const AuthentificationWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-grow">
      <div className="flex-[1.2] relative">
        <div className="p-14">{children}</div>

        <div className="text-bblue absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <small>hyppabirthday</small>
        </div>
      </div>

      <div className="flex-1">
        <Image alt="background" src={background} className="h-full object-cover"/>
      </div>
    </div>
  );
};

export default AuthentificationWrapper;
