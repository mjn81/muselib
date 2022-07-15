
export const Input = (type: string,name: string, register: Function) => {
  return <input type={type} {...register(name)} />
}