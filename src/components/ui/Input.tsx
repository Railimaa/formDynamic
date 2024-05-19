import * as React from "react";

import { cn } from "@/lib/utils";
import { XCircle } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, type, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
            className,
            error && '!border-destructive focus:border-destructive'
          )}
          ref={ref}
          {...props}
        />

        {error && (
          <div className="text-destructive flex items-center gap-1">
            <XCircle size={20} />
            <span>{error}</span>
          </div>
        )}
      </>

       
    )
  }
)
Input.displayName = "Input"

export { Input };

