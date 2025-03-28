import * as React from "react"
import { cn } from "./utils"

const Checkbox = React.forwardRef(
  ({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(defaultChecked || false)
    const checkboxId = React.useId()

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked)
      }
    }, [checked])

    const handleChange = (event) => {
      const newCheckedState = event.target.checked

      if (checked === undefined) {
        setIsChecked(newCheckedState)
      }

      if (onCheckedChange) {
        onCheckedChange(newCheckedState)
      }
    }

    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          ref={ref}
          id={props.id || checkboxId}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <label
          htmlFor={props.id || checkboxId}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
            isChecked && "bg-primary text-primary-foreground",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          onClick={(e) => {
            if (!disabled) {
              const newCheckedState = !isChecked
              if (checked === undefined) {
                setIsChecked(newCheckedState)
              }
              if (onCheckedChange) {
                onCheckedChange(newCheckedState)
              }
            }
            e.preventDefault()
          }}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </label>
      </div>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }

