import { Outlet } from "react-router";
import { HeaderOverLay } from "../components/HeaderOverLay";
import { useState } from "react";
import MenuOverLay from "../components/MenuOverLay";




export default function GeneralPage() {
    const [isMenuOpen, setIsMenuOpen]=useState(false);
  return (
    <div className="flex flex-col min-h-screen w-full bg-white text-black font-sans relative">
        <HeaderOverLay onOpenMenu={()=> setIsMenuOpen(true)}/>
        <main className="flex flex-1 relative flex-col">
            <Outlet/>
        </main>
        <MenuOverLay isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}/>
    </div>
  )
}
