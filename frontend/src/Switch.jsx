import * as React from "react"
import { cn } from "./utils"


const Switch = React.forwardRef(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked || false)

    // Handle controlled state
    React.useEffect(() => {
      if (checked !== undefined && checked !== isChecked) {
        setIsChecked(checked)
      }
    }, [checked, isChecked])

    const handleChange = (event) => {
      const newChecked = event.target.checked
      setIsChecked(newChecked)
      onCheckedChange?.(newChecked)
    }

    return (
      <label className={cn("inline-flex items-center cursor-pointer", className)}>
        <input type="checkbox" className="sr-only" ref={ref} checked={isChecked} onChange={handleChange} {...props} />
        <div
          className={cn(
            "relative w-11 h-6 bg-muted rounded-full transition-colors",
            isChecked ? "bg-primary" : "bg-muted",
          )}
        >
          <div
            className={cn(
              "absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform",
              isChecked ? "transform translate-x-5" : "",
            )}
          />
        </div>
      </label>
    )
  },
)

Switch.displayName = "Switch"

export { Switch }

