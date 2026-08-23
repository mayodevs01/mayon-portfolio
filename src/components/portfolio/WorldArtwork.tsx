import { motion, useReducedMotion } from "framer-motion";

export function WorldArtwork({ kind, index }: { kind: "visual" | "web" | "experimental"; index: string }) {
  const reduce = useReducedMotion();

  if (kind === "web") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-[#22172a] p-5 text-[#f5ead3] md:p-8">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#f5ead320_1px,transparent_1px),linear-gradient(90deg,#f5ead320_1px,transparent_1px)] [background-size:32px_32px]" />
        <motion.div animate={reduce ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative h-[73%] border border-[#f5ead3]/70 bg-[#d8d3bc] p-4 text-[#201515] shadow-[12px_13px_0_#df5f40]">
          <div className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-[#df5f40]" /><i className="h-2 w-2 rounded-full bg-[#1b6258]" /><i className="h-2 w-2 rounded-full bg-[#201515]" /></div>
          <div className="mt-8 font-serif text-4xl leading-[0.85] md:text-6xl">A place<br /><em>to wander.</em></div>
          <div className="absolute bottom-4 left-4 right-4 h-8 border-t border-[#201515]/50" />
        </motion.div>
        <div className="absolute bottom-6 right-7 mono-label">Window {index}</div>
      </div>
    );
  }

  if (kind === "experimental") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1d6358]">
        <motion.div animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} className="absolute left-[15%] top-[8%] h-[76%] w-[76%] rounded-full border border-[#f2e4c7]/70" />
        <motion.div animate={reduce ? undefined : { rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute left-[27%] top-[17%] h-[57%] w-[57%] rounded-full border-2 border-dashed border-[#e95e3d]" />
        <motion.div animate={reduce ? undefined : { x: [0, 45, 0], y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[38%] top-[35%] h-24 w-24 rounded-full bg-[#f0bb65] shadow-[10px_12px_0_#151a18]" />
        <div className="absolute bottom-5 left-5 mono-label text-[#f2e4c7]">Unfinished on purpose / {index}</div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#e8d9b8]">
      <motion.div animate={reduce ? undefined : { rotate: [0, 9, 0, -9, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[17%] top-[14%] h-[70%] w-[67%] rounded-[46%_54%_46%_54%] bg-[#e65f3e] shadow-[15px_16px_0_#201512]" />
      <div className="absolute left-[30%] top-[31%] h-11 w-11 rounded-full bg-[#201512]" />
      <div className="absolute right-[24%] top-[31%] h-11 w-11 rounded-full bg-[#201512]" />
      <motion.div animate={reduce ? undefined : { scaleX: [0.8, 1.15, 0.8] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[36%] top-[56%] h-2 w-[28%] origin-center bg-[#201512]" />
      <div className="absolute bottom-5 left-5 mono-label text-[#201512]">Look again / {index}</div>
    </div>
  );
}
