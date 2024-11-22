import { Footer } from "@/components/Footer";
import { Header } from "@/components/header";

const ITEMS = [
  {
    label: "works",
    href: "/works",
  },
  {
    label: "about",
    href: "/about",
  },
  {
    label: "contact",
    href: "/contact",
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-8 items-center h-screen">
      <Header items={ITEMS} />
      <div className="w-full max-w-screen-md flex-auto px-8">{children}</div>
      <Footer />
    </main>
  );
}
