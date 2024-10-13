import {
    IconHome,
    IconInfoOctagon,
    IconGhost,
    IconPumpkinScary,
    IconSkull,
    IconCards
} from "@tabler/icons-react";

import { ThemeSwitch } from "@/components/theme-switch";


const links = [
    {
        title: "Home",
        icon: (
            <IconHome className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/",
    },
    {
        title: "About",
        icon: (
            <IconInfoOctagon className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/about",
    },
    {
        title: "Ghostify",
        icon: (
            <IconGhost className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/ghostify",
    },
    {
        title: "Nightmare Portal",
        icon: (
            <IconSkull className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/nportal",
    },
    {
        title: "Spookify",
        icon: (
            <IconPumpkinScary className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/spookyAdjust",
    },
    {
        title: "Spookards",
        icon: (
            <IconCards className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/cardGenerator",
    },
    {
        title: "Change Theme",
        icon: (
            <ThemeSwitch className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "#",
    }
];

export default links