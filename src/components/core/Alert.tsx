import { ALERT_TYPES, Props } from "constants/index";


type AlertProps = { 
  type?: ALERT_TYPES
}

export const Alert = ({children , type=ALERT_TYPES.SUCCESS , ...others}: Props & AlertProps) => {
  
  return <div className={`alert py-2 px-4 w-full space-y-1 rounded-lg ${type}`} {...others}>
    {children}
  </div>

}
