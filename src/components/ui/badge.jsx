import * as React from "react"

const Badge = React.forwardRef(({ className = "", variant = "default", ...props }, ref) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
  
  const variants = {
    default: "border-transparent bg-primary text-white hover:bg-primary-dark",
    secondary: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "border-transparent bg-danger text-white hover:bg-red-700",
    success: "border-transparent bg-success text-white hover:bg-green-700",
    warning: "border-transparent bg-warning text-white hover:bg-orange-600",
    outline: "text-text-primary",
  }

  return (
    <div ref={ref} className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />
  )
})
Badge.displayName = "Badge"

export { Badge }
