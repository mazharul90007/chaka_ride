"use client";

import Image from "next/image";

export default function FooterCarSection() {
  return (
    <section className="relative z-20 w-full bg-(--hero-bg)" aria-hidden>
      <div className="footer-car-track relative w-full overflow-hidden">
        {/* RTL below LTR in z-index so crossing paths do not hide m-car / m-car2 */}
        <div className="footer-car-rtl">
          <Image
            src="/assets/images/m-car3.png"
            alt=""
            width={200}
            height={80}
            className="pointer-events-none h-6 w-auto select-none sm:h-8"
            draggable={false}
          />
        </div>
        <div className="footer-car-ltr footer-car-ltr--fast">
          <Image
            src="/assets/images/m-car2.png"
            alt=""
            width={220}
            height={90}
            className="pointer-events-none h-6 w-auto select-none sm:h-8"
            draggable={false}
          />
        </div>
        <div className="footer-car-rtl footer-car-ltr--mcar">
          <Image
            src="/assets/images/m-car.png"
            alt=""
            width={200}
            height={80}
            className="pointer-events-none h-6 w-auto select-none sm:h-8"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
