export function Footer() {
  return (
    <footer className="w-full text-[10px] lg:text-xs max-w-screen-lg px-8">
      {/* <hr className="w-full border-t border-gray-400" /> */}
      <div className="w-full pt-2 pb-8 mx-auto text-muted-foreground">
        <p className="text-center">© {new Date().getFullYear()} Ivo Schouten</p>
      </div>
    </footer>
  );
}
