import { Props, PropsWithClass } from 'constants/index';

export const Card = (props: PropsWithClass) => {
	const { children, className, ...others } = props;

	return (
		<div className={`min-w-[350px] overflow-hidden flex flex-col ${className}`} {...others}>
			{children}
		</div>
	);
};
