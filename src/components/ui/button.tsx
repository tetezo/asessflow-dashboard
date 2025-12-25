import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-all duration-150 ease-in-out cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        btnBlue: "py-2.5 px-4.5 bg-primary-600 text-white text-sm font-medium border-none rounded-md shadow-sm hover:bg-primary-700 hover:shadow-md",
        btnWhite: "py-2.25 px-3 text-sm font-medium border border-gray-300 rounded-md bg-white text-gray-700 cursor-pointer hover:border-gray-400",
        btnClose: "mr-2 border-none bg-transparent text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0",

        paginationBtn: "w-8 h-8 border border-gray-300 bg-white rounded-md text-gray-700 text-sm font-medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        paginationActive: "w-8 h-8 border border-primary-600 bg-primary-600 rounded-md text-white text-sm font-medium [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",

      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        closeBtn: "w-9 h-9 focus-visible:ring-0 focus-visible:ring-offset-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
