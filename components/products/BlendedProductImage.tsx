import type { CSSProperties } from "react";
import styles from "./BlendedProductImage.module.css";

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Measure each image with scripts/sample-image-background.mjs. */
  background: { top: string; middle: string; bottom: string };
  className?: string;
  loading?: "eager" | "lazy";
  /** Extension must fit within the surrounding padding. */
  spread?: string;
  /** Fit both portrait and landscape photos within a fixed-height card. */
  contain?: boolean;
  /** Keep these fades within the source image's empty margins. */
  edgeFade?: { horizontal: string; vertical: string };
}

export default function BlendedProductImage({
  src, alt, width, height, background, className = "",
  loading = "lazy", spread = "20px", contain = false,
  edgeFade = { horizontal: "1.5%", vertical: "6%" },
}: Props) {
  const variables = {
    "--image-bg-top": background.top,
    "--image-bg-middle": background.middle,
    "--image-bg-bottom": background.bottom,
    "--image-fade-x": edgeFade.horizontal,
    "--image-fade-y": edgeFade.vertical,
    "--image-bg-spread": spread,
    "--image-ratio": width / height,
  } as CSSProperties;

  return (
    <div className={`${styles.frame} ${contain ? styles.contain : ""} ${className}`} style={variables}>
      <div className={styles.photo}>
        <span className={styles.background} aria-hidden="true" />
        {/* Preserve the source pixels and mask only its empty outer margins. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height}
          className={styles.image} loading={loading} />
      </div>
    </div>
  );
}
