import React, { PropsWithChildren } from "react";

export const AuthLayout = (props: PropsWithChildren) => {
  const { children } = props;
  return (
    <main
      className="bg-purple-700 w-screen h-screen relative"
    >
      {children}
    </main>
  );
};
