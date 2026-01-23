import { Link } from "react-router";
import { MapPin, Mail, Phone, UtensilsCrossed } from "lucide-react";

export function FooterOverLay() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t-4 border-slate-700 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          <div className="lg:col-span-1 flex flex-col">
            <Link to="/" className=" mb-4">
              <img
                src="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767976862/logo-light_zgicqe.png"
                alt="Logo"
                className="h-14 w-auto opacity-95"
              />
            </Link>
            <p className="text-slate-300 text-sm font-medium italic leading-relaxed">
              Book your table with us. Great experience and flavor on every visit.
            </p>
          </div>

          <div>
            <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Main Ave. 123, Unit 4</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+51987654321" className="hover:text-amber-400 transition-colors">+51 987 654 321</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:reservations@restaurant.com" className="hover:text-amber-400 transition-colors">reservations@restaurant.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              Hours
            </h3>
            <ul className="text-slate-300 text-sm flex flex-col gap-1">
              <li>Mon - Fri: 12:00 - 23:00</li>
              <li>Sat - Sun: 11:00 - 00:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs font-medium">
            © {currentYear} Reservations System. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs italic">
            BootCamp Java Web Project
          </p>
        </div>
      </div>
    </footer>
  );
}
