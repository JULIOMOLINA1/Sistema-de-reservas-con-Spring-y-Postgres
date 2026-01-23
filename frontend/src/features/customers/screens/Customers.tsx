import { SectionGeneralPages } from "@/layouts/components/SectionGeneralPages";

export function Customers() {
  return (
    <SectionGeneralPages
    title="Your Experience Begins Here"
    image_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768066894/fondo-comida4_ejkmao.png"
    message="To provide you with exceptional service and secure your reservation, we invite you to register with us. Let us get to know you to make your visit unforgettable."
    route1="/customers/create"
    route2="/customers/search"
    route3="/customers/update"
    option1="Create"
    option2="Search"
    option3="Update email"
    />
  )
}
