import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./icons";

export function Navbar() {
  const pathname = usePathname();
  return (
    <div className="w-full flex bg-black/70 py-5 flex-col items-center justify-center gap-2">
      <Logo />
      <div className="flex items-center justify-center gap-2">
        <Link href='/' className={pathname === '/' ? "btn-nav-active" : "btn-nav"}>Home</Link>
        <Link href='/pokedex' className={pathname?.startsWith('/pokedex') ? "btn-nav-active" : "btn-nav"}>Pokedex</Link>
      </div>
    </div>
  )
}