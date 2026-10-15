"use client";

import {
  Container,
  Home,
  type LucideIcon,
  MapPin,
  PackageSearch,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItem {
  href: string;
  icon: LucideIcon;
  title: string;
}

const URL = "/admin/dashboard";

const navigationItems: NavigationItem[] = [
  {
    href: `${URL}`,
    icon: Home,
    title: "داشبورد",
  },
  {
    href: `${URL}/manage-products`,
    icon: PackageSearch,
    title: "محصولات",
  },
  {
    href: `${URL}/manage-locations`,
    icon: MapPin,
    title: "لوکیشن‌ها",
  },
  {
    href: `${URL}/suppliers`,
    icon: Container,
    title: "تامین‌کننده‌ها",
  },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-17 flex w-full items-center justify-center">
      <nav className="fixed bottom-3 z-50 flex max-w-sm items-center justify-center rounded-3xl border bg-card-foreground/5 p-1.5 backdrop-blur-md">
        {navigationItems.map((navItem) => {
          const Icon = navItem.icon;
          const isActive = pathname === navItem.href;

          return (
            <Button
              className="relative bg-transparent p-5 hover:bg-transparent active:scale-[0.96]"
              key={navItem.href}
            >
              <Link href={navItem.href} prefetch>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl border border-primary/20 bg-primary/10"
                    layoutId="active-nav"
                    transition={{
                      damping: 35,
                      stiffness: 500,
                      type: "spring",
                    }}
                  />
                )}

                <div
                  className={cn(
                    "relative z-10 flex flex-col items-center justify-center transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon size={14} />
                  <div className="text-xs">{navItem.title}</div>
                </div>
              </Link>
            </Button>
          );
        })}
      </nav>
    </footer>
  );
}
