import { SectionGeneralPages } from "@/layouts/components/SectionGeneralPages";




export function Dishes() {
  return (
    <SectionGeneralPages
    title="Our Menu"
    image_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768066893/fondo-comida_j9zgar.png"
    message="Explore our culinary masterpieces. From savory plates to handcrafted drinks."
    route1="/dishes/plates"
    route2="/dishes/sweets"
    route3="/dishes/drinks"
    option1="Plates"
    option2="Sweets"
    option3="Drinks"
    />
  )
}
