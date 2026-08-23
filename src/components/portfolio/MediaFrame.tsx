import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Cinematic media container. Renders a <video> when `video` is provided,
 * otherwise the image. When neither exists, it shows an intentional,
 * premium placeholder rather than an empty grey box.
 * Swap real footage in via the data file (mp4/webm URL).
 */
export function MediaFrame({
  image,
  video,
  alt,
  className,
  hoverZoom = true,
  eager = false,
}: {
  image?: string;
  video?: string;
  alt: string;
  className?: string;
  hoverZoom?: boolean;
  eager?: boolean;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "group/media relative overflow-hidden bg-secondary",
        className,
      )}
      onMouseEnter={() => {
        setHovered(true);
        vidRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        vidRef.current?.pause();
      }}
    >
      {video ? (
        <video
          ref={vidRef}
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="metadata"
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1.4s] ease-out",
            hoverZoom && hovered && "scale-[1.06]",
          )}
        />
      ) : image ? (
        <motion.img
          src={image}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          className={cn(
            "h-full w-full object-cover transition-transform duration-[1.4s] ease-out",
            hoverZoom && hovered && "scale-[1.06]",
          )}
        />
      ) : (
        <Placeholder />
      )}

      {/* cinematic vignette + grade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
    </div>
  );
}

function Placeholder() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="absolute inset-0 cinematic-glow opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_55%)]" />
      <motion.div
        aria-hidden
        className="flex h-16 w-16 items-center justify-center rounded-full border border-border backdrop-blur-sm"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="ml-0.5 block h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-foreground/70" />
      </motion.div>
      <span className="absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
        Footage coming soon
      </span>
    </div>
  );
}
