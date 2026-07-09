import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
