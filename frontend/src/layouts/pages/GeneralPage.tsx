import { Outlet, useLocation } from "react-router";
import { HeaderOverLay } from "../components/HeaderOverLay";
import { FooterOverLay } from "../components/FooterOverLay";
import { useState } from "react";
import MenuOverLay from "../components/MenuOverLay";

/** Rutas de administrador donde no se muestra el footer. */
const isAdminRoute = (pathname: string) => pathname.startsWith("/admin");

export default function GeneralPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const showFooter = !isAdminRoute(pathname);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-black font-sans relative">
      <HeaderOverLay onOpenMenu={() => setIsMenuOpen(true)} />
      <main className="flex flex-1 relative flex-col">
        <Outlet />
      </main>
      {showFooter && <FooterOverLay />}
      <MenuOverLay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}
