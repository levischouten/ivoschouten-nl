import { Header } from "@/components/header";

const ITEMS = [
  {
    label: "Works",
    href: "/works",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-8 items-center w-screen h-screen">
      <Header items={ITEMS} />
      <div className="w-full max-w-screen-md flex-auto min-h-0 px-8">
        {children}
      </div>
    </main>
  );
}
