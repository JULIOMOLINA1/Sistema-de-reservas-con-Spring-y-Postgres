import { Menu } from "lucide-react";
import { Link } from "react-router";

interface HeaderOverLayProps {
  onOpenMenu: () => void;
}

export function HeaderOverLay({ onOpenMenu }: HeaderOverLayProps) {
  return (
    <aside className="w-full h-25 border-b-2 border-gray-500 flex justify-center gap-20 lg:p-3">
      <img
        src="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767976862/logo-light_zgicqe.png"
        className="w-35 h-15 mt-5 ml-5 lg:w-50 lg:h-20 lg:mt-0"
      />
      <button
        onClick={onOpenMenu}
        className="text-black flex items-center justify-center mr-5 sm:hidden"
      >
        <Menu className="w-15 h-13" />
      </button>
      <div className="max-sm:hidden w-2/3 flex justify-center items-center mr-3">
        <nav className="flex justify-between items-center text-sm w-full lg:text-lg lg:w-3/4">
          <Link
            to={`/`}
            className="flex-1 w-full text-gray-700 flex items-center justify-center border-2gap-10 font-medium px-4 py-1"
          >
            <p>Home</p>
          </Link>
          <Link
            to={`/customers`}
            className="flex-1 w-full text-gray-700 flex items-center justify-center border-2gap-10 font-medium px-4 py-1"
          >
            <p>Customers</p>
          </Link>
          <Link
            to={`/reservations`}
            className="flex-1 w-full text-gray-700 flex items-center justify-center border-2gap-10 font-medium px-4 py-1"
          >
            <p>Reservations</p>
          </Link>
          <Link
            to={`/dishes`}
            className="flex-1 w-full text-gray-700 flex items-center justify-center border-2gap-10 font-medium px-4 py-1"
          >
            <p>Dishes</p>
          </Link>
          <Link
            to={`/admin`}
            className="flex-1 w-full bg-slate-700 flex items-center justify-center border-2gap-10 text-white font-serif px-4 py-2 rounded-full"
          >
            <p>Login/Admin</p>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
