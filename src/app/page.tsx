import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { title, subtitle } from "@/components/primitives";
import { FloatingDock } from "@/components/floating-dock";
import links from "@/conf/links";
export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <FloatingDock
        desktopClassName="absolute bottom-5"
        mobileClassName="absolute bottom-5 left-5" // only for demo, remove for production
        items={links}
      />
      <div className="inline-block text-center justify-center">
        <span className={title()}>Get Ready for the  </span>
        <span className={clsx(title({ color: "halloween" }), "font-black")}>Spooky </span>
        <span className={title()}>Season </span>
        <br />
        <div className={subtitle({ class: "mt-4" })}>
        with AI Powered Photo Edition Tools
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          className={clsx("me-2 inline-flex items-center rounded-lg px-5 py-2 text-center font-bold bg-gradient-to-tr from-[#008170] via-[#005B41] to-[#232D3F] dark:from-[#EEDF7A] dark:via-[#D8A25E] dark:to-[#A04747] text-background text-xl")}
          href="#"
        >
          Documentation
        </Link>
      </div>
    </section>
  );
}
