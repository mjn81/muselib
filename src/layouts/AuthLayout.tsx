import React ,{FC} from "react"

interface Props {
  children?:React.ReactNode | React.ReactNode[]
}

export const AuthLayout:FC<Props> = ({
	children,
}) => {
	return <main>{children}</main>;
};
