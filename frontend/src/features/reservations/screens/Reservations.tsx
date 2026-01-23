import { SectionGeneralPages } from "@/layouts/components/SectionGeneralPages";




export function Reservations() {
  return (
    <SectionGeneralPages
    title="Manage Your Visit"
    image_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768066890/fondo-reservations2_atsou9.png"
    message="Plan your next culinary experience with us. Please choose an option below to secure a new spot or manage an existing booking."
    route1="/reservations/create"
    route2="/reservations/search"
    route3="/reservations/cancel"
    option1="Create"
    option2="Search"
    option3="Cancel"
    />
  )
}


