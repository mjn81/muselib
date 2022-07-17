import React from "react";

// there was a problem with using prisma genrated enum for enum
export const ROLES = ["CLIENT", "ADMIN"] as const;

export type Props = {
  children?: React.ReactNode | React.ReactNode[];
	[inp: string]: any;
};

export type PropsWithClass =Props & {
  className?: string;
}

export type LinkProps = Props & {
  href: string;
}

export * from "./messages";
