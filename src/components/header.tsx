"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MailIcon,
  MenuIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Logo } from "./logo";

type HeaderProps = {
  items: (
    | {
        label: string;
        href: string;
      }
    | {
        label: string;
        href: string;
        items: {
          label: string;
          description: string;
          href: string;
        }[];
      }
  )[];
};

export function Header(props: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky inset-0 z-50 p-4 mx-auto flex w-full max-w-screen-lg items-center justify-between bg-background lg:relative">
      <Link href="/" className="font-bold text-xl">
        Ivo Schouten
      </Link>
      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {props.items.map((item) => {
            if ("items" in item) {
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      "hover:bg-background focus:bg-background focus:outline-primary",
                      {
                        "font-semibold text-primary": pathname === item.href,
                      }
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] grid-cols-1 gap-3 p-6">
                      {item.items.map((nestedItem) => (
                        <ListItem
                          key={nestedItem.label}
                          title={nestedItem.label}
                          href={nestedItem.href}
                        >
                          {nestedItem.description}
                        </ListItem>
                      ))}
                    </ul>
                    <div className="w-[400px] rounded-b-lg border-t font-medium hover:bg-accent active:bg-accent">
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 p-8 text-sm hover:outline-none"
                      >
                        Bekijk alle {item.label} →
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.label}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === item.href}
                    className={cn(navigationMenuTriggerStyle())}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet open={open} onOpenChange={setOpen}>
        <Button asChild variant="ghost" size="icon" className="lg:hidden">
          <SheetTrigger aria-label="Toggle navigation menu">
            <MenuIcon className="h-5 w-5" />
          </SheetTrigger>
        </Button>
        <SheetContent
          className="flex w-full max-w-full flex-col space-y-4 overflow-auto sm:w-[500px]"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <SheetHeader className="p-3">
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col justify-between gap-8 font-medium">
            <ul className="space-y-2">
              {props.items.map((item) => {
                if ("items" in item) {
                  return (
                    <li key={item.label}>
                      <Collapsible
                        className="group"
                        defaultOpen={item.href === pathname}
                      >
                        <CollapsibleTrigger
                          className={cn(
                            "flex w-full select-none items-center justify-between rounded-md p-3 text-start leading-none no-underline outline-none transition-colors hover:text-primary focus:outline-primary",
                            {
                              "font-semibold": item.href === pathname,
                            }
                          )}
                        >
                          {item.label}
                          <ChevronUpIcon className="h-4 w-4 group-data-[state=closed]:hidden" />
                          <ChevronDownIcon className="h-4 w-4 group-data-[state=open]:hidden" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-3">
                          <ul className="space-y-2 font-normal">
                            {item.items.map((nestedItem) => (
                              <Link
                                key={nestedItem.label}
                                href={nestedItem.href}
                                legacyBehavior
                                passHref
                              >
                                <a
                                  className="block select-none space-y-1 rounded-md px-6 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  onClick={() => setOpen(false)}
                                >
                                  {nestedItem.label}
                                </a>
                              </Link>
                            ))}
                            <Link
                              key={item.label}
                              href={item.href}
                              legacyBehavior
                              passHref
                            >
                              <a
                                className="flex select-none items-center gap-2 space-y-1 rounded-md px-6 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                onClick={() => setOpen(false)}
                              >
                                Alle {item.label} →
                              </a>
                            </Link>
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </li>
                  );
                }

                return (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <a
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-primary focus:outline-primary",
                          {
                            "font-semibold": item.href === pathname,
                          }
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
