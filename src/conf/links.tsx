import {
    IconHome,
    IconInfoOctagon,
    IconGhost,
    IconPumpkinScary,
    IconSkull,
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
        title: "Undead Me",
        icon: (
            <IconGhost className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/undead",
    },
    {
        title: "Horror Lands",
        icon: (
            <IconSkull className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/horrorland",
    },
    {
        title: "Spookify",
        icon: (
            <IconPumpkinScary className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "/spookyAdjust",
    },
    {
        title: "Change Theme",
        icon: (
            <ThemeSwitch className="h-full w-full text-[#1C1C1C] dark:text-[#FFFAFA]" />
        ),
        href: "#",
    },
];

export default links