import Link from "next/link";
import React from "react";
import { AppLayout } from "./AppLayout";
import { PropsWithChildren } from "react";

type Props = {
  title: string;
  btn: {
    title: string;
    path: string;
  }
} & PropsWithChildren;

export const ListLayout = ({ title, children, btn }: Props) => {
  return (
    <AppLayout title={title}>
      <div className="flex flex-col">
        <Link href={btn.path}>
          <div className="cursor-pointer text-sm self-end rounded-xl px-4 py-2 w-fit bg-purple-500 hover:bg-purple-600 transition-colors text-white capitalize mb-3">
            {btn.title}
          </div>
        </Link>
        {children}
      </div>
    </AppLayout>
  );
};

