"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Loads a lean DOM animation feature set. Use `motion` from `framer-motion` in
 * client components, or switch to `m` + `strict` here later for smaller bundles.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
