"use client"

import React, { useState } from "react"
import { cn } from "./utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  )
})
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef(({ className, src, alt = "", ...props }, ref) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) return null

  return (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      src={src || "/placeholder.svg"}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  )
})
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  )
})
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

