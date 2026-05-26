import * as React from "react"

const Alert = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-text-primary"
  
  const variants = {
    default: "bg-surface text-text-primary",
    destructive: "border-danger/50 bg-danger/10 text-danger [&>svg]:text-danger",
    warning: "border-warning/50 bg-warning/10 text-warning [&>svg]:text-warning",
    success: "border-success/50 bg-success/10 text-success [&>svg]:text-success",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
