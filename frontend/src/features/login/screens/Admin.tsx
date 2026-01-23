import { useNavigate } from "react-router";
import { logout } from "@/services/auth/authService";
import { Utensils, CalendarDays, Ban, LogOut } from "lucide-react";

export function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    {
      title: "View All Plates",
      description: "Overview of all dishes in the system.",
      icon: <Utensils className="w-12 h-12 text-slate-700" />,
      path: "/admin/plates",
      color: "bg-amber-100",
    },
    {
      title: "Reservations by Date",
      description: "View and manage reservations for a specific day.",
      icon: <CalendarDays className="w-12 h-12 text-slate-700" />,
      path: "/admin/reservations",
      color: "bg-blue-100",
    },
    {
      title: "Plate Availability",
      description: "Quickly enable or disable plates from the menu (Cancel Plate).",
      icon: <Ban className="w-12 h-12 text-slate-700" />,
      path: "/admin/cancel",
      color: "bg-red-100",
    },
  ];

  return (
    <section className="flex-1 w-full p-6 md:p-10 flex flex-col items-center">
      <div className="w-full max-w-6xl flex justify-between items-center mb-10 border-b-4 border-slate-700 pb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-700 italic">
          Admin Dashboard
        </h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-slate-700 text-white font-bold py-2 px-4 border-2 border-slate-700 hover:bg-white hover:text-slate-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          LOGOUT
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {menuItems.map((item) => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer group border-2 border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-4 transition-all duration-300 ${item.color}`}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-4 bg-white border border-slate-100 rounded-full group-hover:scale-110 transition-transform shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
              <p className="text-slate-600 font-medium italic">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

