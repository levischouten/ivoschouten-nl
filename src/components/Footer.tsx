export function Footer() {
  return (
    <footer className="w-full text-xs max-w-screen-lg px-8">
      {/* <hr className="w-full border-t border-gray-400" /> */}
      <div className="w-full flex justify-between pt-2 pb-8 mx-auto text-muted-foreground">
        <p>Lorum Ipsum</p>
        <p className="text-center">© {new Date().getFullYear()} Your Company</p>
      </div>
    </footer>
  );
}
