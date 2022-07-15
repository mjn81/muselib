import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterInputForm, RegisterInput } from 'schemas';

export const RegisterForm = (mutate: Function) => {
	const { register, handleSubmit } = useForm<RegisterInputForm>({
		resolver: zodResolver(RegisterInput),
	});

	const onSubmit: SubmitHandler<RegisterInputForm> = (data) => {
		mutate(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="text" {...register('fullName')} />
			<input type="text" {...register('userName')} />
			<input type="email" {...register('email')} />
			<input type="password" {...register('password')} />
			<button type="submit">Submit</button>
		</form>
	);
};
