import { CalendarCheck, CircleUserRound, House, LogIn, Salad, X } from "lucide-react";
import { Link } from "react-router";


interface MenuOverLayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MenuOverLay({isOpen, onClose}:MenuOverLayProps) {

  return (
    <div className={`sm:hidden flex flex-col min-h-screen fixed inset-0 z-50 bg-white text-black transition-all duration-500 ease-in-out ${
        isOpen?
         "opacity-100 visible"
        :"opacity-0 invisible pointer-events-none"
    }`}
    >
        <div className="w-full h-30 border-r border-zinc-200 flex justify-center gap-20">
            <img src="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767976862/logo-light_zgicqe.png" 
            className="w-35 h-15 mt-5 ml-5"
            />
            <button 
                onClick={onClose}
                className="text-black flex items-center justify-center mr-5 "
            >
                <X className="w-15 h-15"/>
            </button>
            
        </div>
        <div className="w-full h-full flex flex-col items-center bg-amber-200 text-white text-2xl ">
            <Link to={`/`} onClick={onClose} className="flex-1 w-full bg-gray-500 flex items-center justify-center border-2 border-white gap-10">
            <House size={30} />
            <p>Home</p>
            </Link>
            <Link to={`/customers`} onClick={onClose} className="flex-1 w-full bg-gray-500 flex items-center justify-center border-2 border-white gap-10">
            <CircleUserRound size={30}/>
            <p>Customers</p>
            </Link>
            <Link to={`/reservations`} onClick={onClose} className="flex-1 w-full bg-gray-500 flex items-center justify-center border-2 border-white gap-10">
            <CalendarCheck size={30} />
            <p>Reservations</p>
            </Link>
            <Link to={`/dishes`} onClick={onClose} className= "flex-1 w-full bg-gray-500 flex items-center justify-center border-2 border-white gap-10">
            <Salad size={30} />
            <p>Dishes</p>
            </Link>
            <Link to={`/admin`} onClick={onClose} className="flex-1 w-full bg-gray-500 flex items-center justify-center border-2 border-white gap-10">
            <LogIn size={30}/>
            <p>Login/Admin</p>
            </Link>
        </div>
    </div>
    
  )
}
