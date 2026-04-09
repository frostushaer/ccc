import * as React from "react"

import { cn } from "@/lib/utils"

interface MotionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  delayChildren?: number
  staggerChildren?: number
}

interface MotionFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  y?: number
}

export function MotionPage({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function MotionStagger({
  children,
  className,
  delayChildren: _delayChildren = 0.08,
  staggerChildren: _staggerChildren = 0.1,
  ...props
}: MotionContainerProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function MotionItem({
  children,
  className,
  y: _y = 18,
  ...props
}: MotionFadeProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function MotionFade({
  children,
  className,
  delay: _delay = 0,
  y: _y = 24,
  ...props
}: MotionFadeProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
