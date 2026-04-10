import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/** Root shell; `html` / `body` live in `[locale]/layout.tsx` (next-intl). */
export default function RootLayout({ children }: Props) {
  return children;
}
