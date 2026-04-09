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
  delayChildren = 0.08,
  staggerChildren = 0.1,
  ...props
}: MotionContainerProps) {
  void delayChildren
  void staggerChildren
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function MotionItem({
  children,
  className,
  y = 18,
  ...props
}: MotionFadeProps) {
  void y
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}

export function MotionFade({
  children,
  className,
  delay = 0,
  y = 24,
  ...props
}: MotionFadeProps) {
  void delay
  void y
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
