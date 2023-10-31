import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva("p-4 rounded-lg drop-shadow-sm", {
  variants: {
    variant: {
      default: "bg-white drop-shadow ",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-accent text-white hover:bg-accent",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      white: "bg-white ",
      black: "bg-black text-white",
    },
  },

  defaultVariants: {
    variant: "default",
  },
})

interface CardBaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export default function Card({ children, variant, className }: CardBaseProps) {
  return (
    <div className={cn(cardVariants({ variant }), className)}>{children} </div>
  )
}
