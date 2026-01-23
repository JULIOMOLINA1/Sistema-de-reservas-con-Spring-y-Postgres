import { ReservationForm } from "../components/ReservationForm";

export function ReservationsCreate() {
  return (
    <div className="flex flex-1 items-center justify-center p-3 md:p-0 w-full md:min-h-screen">
      <div className="max-sm:hidden sm:hidden md:h-screen md:overflow-hidden md:block md:w-1/2 relative">
        <img
          src="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1769194586/age_gtuyeugtuyeugtuy_mxf6xi.png"
          className="object-cover w-full h-full absolute inset-0"
        />
        <div className="absolute inset-0 bg-white/40 z-0"></div>
      </div>
      <ReservationForm />
    </div>
  );
}
