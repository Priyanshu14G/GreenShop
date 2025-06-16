import React from "react";
import { cn } from "../../lib/utils";
// import { cn } from "../lib/utils"; // Adjust path as per your folder structure

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
