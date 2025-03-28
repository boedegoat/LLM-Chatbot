import * as React from "react"
import { cn } from "./utils"


const TabsContext = React.createContext({
    value: "",
    onValueChange: () => {},
  });

export function Tabs({ defaultValue, value, onValueChange, children, ...props }) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "")

  const handleValueChange = React.useCallback(
    (newValue) => {
      setTabValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  // Update internal state when controlled value changes
  React.useEffect(() => {
    if (value !== undefined && value !== tabValue) {
      setTabValue(value)
    }
  }, [value, tabValue])

  return (
    <TabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({ className, value, ...props }) {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected ? "bg-background text-foreground shadow-sm" : "hover:bg-background/50 hover:text-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    />
  )
}

export function TabsContent({ className, value, ...props }) {
  const { value: selectedValue } = React.useContext(TabsContext)
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      data-state={isSelected ? "active" : "inactive"}
      {...props}
    />
  )
}

