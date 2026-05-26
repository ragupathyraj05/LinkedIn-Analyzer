import * as React from "react"

const Button = React.forwardRef(({ className = "", variant = "default", size = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    default: "bg-primary text-white hover:bg-primary-dark shadow",
    destructive: "bg-danger text-white hover:bg-red-700 shadow-sm",
    outline: "border border-border bg-surface hover:bg-gray-50 text-text-primary",
    secondary: "bg-bg text-secondary-foreground hover:bg-gray-200",
    ghost: "hover:bg-gray-100 text-text-primary",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-xl px-8 text-base",
    icon: "h-10 w-10",
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <button ref={ref} className={classes} {...props} />
  )
})
Button.displayName = "Button"

export { Button }
