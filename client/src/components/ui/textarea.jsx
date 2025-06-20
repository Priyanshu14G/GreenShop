import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
//import { cn } from "../lib/utils"; // Adjust the path if needed

const Textarea = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...rest}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
