import { CustomerSearchForm } from "../components/CustomerSearchForm";


export function CustomersSearch() {
  return (
    <div className="flex flex-col overflow-hidden flex-1 md:p-0 w-full md:min-h-screen md:flex-row">
      <CustomerSearchForm/>
      <div className="max-sm:hidden sm:hidden md:bg-amber-300 md:h-screen overflow-hidden md:block md:w-1/2 relative">
            <img src="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768167035/4_k99yxt.jpg" className="object-cover w-full h-full absolute inset-0"/>
            <div className="absolute inset-0 bg-white/40 z-0"></div>
      </div>
    </div>
  )
}
