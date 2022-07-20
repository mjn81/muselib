import Image from "next/image";
import React, { PropsWithChildren } from "react";

export const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <main className="bg-purple-700 w-screen h-screen relative">
      <div className="w-screen h-screen absolute z-0 top-0 right-0 opacity-40">
      </div>

      {children}
    </main>
  );
};
