import { type ReactNode, type ElementType } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  mist?: boolean;
  as?: ElementType;
}

export default function Section({
  children,
  className = "",
  mist = false,
  as: Tag = "section",
}: Props) {
  return (
    <Tag
      className={`py-16 md:py-24 lg:py-32 ${mist ? "bg-mist" : "bg-porcelain"} ${className}`}
    >
      {children}
    </Tag>
  );
}
