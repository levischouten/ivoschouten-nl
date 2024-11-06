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
    <main className="flex flex-col gap-8 p-4 items-center w-screen">
      <Header items={ITEMS} />
      <div className="w-full max-w-screen-md py-8 px-4">{children}</div>
    </main>
  );
}
