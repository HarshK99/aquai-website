import Link from "next/link";
import FinishBadge from "./FinishBadge";
import { COLOR_SWATCH, isColorVariant } from "@/lib/colorVariants";
import type { PublicProduct } from "@/data/catalog";

interface Props {
  product: PublicProduct;
  seriesName?: string;
  priority?: boolean;
}

export default function ProductCard({ product, seriesName, priority = false }: Props) {
  const { slug, product_name, series, finish, image } = product;
  const colors = product.variants.filter(isColorVariant);

  const label = seriesName ?? series
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <Link
      href={`/products/${slug}/`}
      className="group relative flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 transition-transform duration-[500ms] ease-smooth hover:-translate-y-[5px]"
      aria-label={finish ? `${product_name} - ${finish}` : product_name}
    >
      {/* ── Image container ─────────────────────── */}
      <div className="relative overflow-hidden bg-product-bg aspect-[5/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={finish ? `${product_name} in ${finish} finish` : product_name}
          width={600}
          height={600}
          className="h-full w-full object-contain p-6 transition-transform duration-[600ms] ease-smooth group-hover:scale-[1.04]"
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      {/* ── Card body ───────────────────────────── */}
      <div className="flex flex-col gap-1.5 pt-3 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
          {label}
        </p>
        <h3 className="font-body font-medium text-navy leading-snug">
          {product_name}
        </h3>
        <FinishBadge finish={finish} />
        {colors.length > 0 && (
          <span
            className="mt-0.5 inline-flex items-center gap-1.5"
            aria-label={`Also available in ${colors.join(", ")}`}
          >
            {colors.map((c) => (
              <span
                key={c}
                className={`h-2 w-2 rounded-full ring-1 ring-chrome/60 ${COLOR_SWATCH[c]}`}
                aria-hidden="true"
              />
            ))}
          </span>
        )}
      </div>

      {/* ── Chrome hairline - signature draw effect ─ */}
      {/* navy line with red tip draws left→right on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[350ms] ease-smooth"
        style={{
          background: "linear-gradient(to right, #196db5 92%, #f21928 100%)",
        }}
      />
    </Link>
  );
}
