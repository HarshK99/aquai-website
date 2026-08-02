"use client";
import { toAnchor } from "@/lib/utils";

interface Props {
  subgroups: string[];
}

export default function SubgroupNav({ subgroups }: Props) {
  function scrollTo(label: string) {
    document.getElementById(toAnchor(label))?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="sticky top-20 z-20 bg-porcelain/95 backdrop-blur-sm border-b border-chrome py-3">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="flex flex-wrap gap-2" role="navigation" aria-label="Jump to section">
          {subgroups.map((sg) => (
            <button
              key={sg}
              onClick={() => scrollTo(sg)}
              className="rounded-sm border border-chrome bg-porcelain px-4 py-1.5 text-xs font-medium text-steel transition-colors duration-200 hover:border-navy/40 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1"
            >
              {sg}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

