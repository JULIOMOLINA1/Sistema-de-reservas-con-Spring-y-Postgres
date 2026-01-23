import type { ReservationRequestDTO } from "@/common/reservations/reservationsTypes"
import { createReservation } from "@/services/reservations/reservationService";
import React, { useState } from "react"

export const ReservationForm = () => {
    const [formData, setFormData] = useState<ReservationRequestDTO>({
        customerDni: "",
        reservationDateTime: "",
        numberOfGuests: 1,
        specialRequests: "",
    });

    const [status, setStatus] = useState<{
        loading: boolean;
        error: string |null;
        success: boolean;
    }>({
        loading: false,
        error: null,
        success: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        if((name === 'customerDni' || name ==='numberOfGuests') && !/^\d*$/.test(value) ) {
            return;
        }


        if(name === 'numberOfGuests'){
            if(value !== "" && parseInt(value)>6){
                return;
            }
        }

        setFormData((prev)=> ({
            ...prev,
            [name]:name === 'numberOfGuests' ? (value === "" ? "" : parseInt(value)) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setStatus({loading: true, error: null, success: false});

        const resetData = {
            ...formData,
            reservationDateTime: formData.reservationDateTime.length === 16
            ? `${formData.reservationDateTime}:00`:formData.reservationDateTime
        };

        try {
            await createReservation(resetData);
            setStatus({loading: false, error: null, success: true});

            setFormData({
                customerDni: "",
                reservationDateTime: "",
                numberOfGuests: 1,
                specialRequests: "",
            });
        } catch(err:any){
            setStatus({
                loading: false,
                error: err.message,
                success: false
            });
        }
    };

  return (
    <div className='flex flex-col max-sm:w-full sm:w-4/5 max-md:shadow-lg sm:rounded-2xl sm:border-2 sm:border-gray-600 sm:p-5 md:border-0 md:w-1/2 md:justify-center md:items-center'>
        <h2 className='text-center text-slate-700 font-bold font-serif md:text-2xl md:p-10'>
            Make reservation
        </h2>

        {
            status.success && (
                <div className='text-green-700'>
                    Reservation saved succesfully.
                </div>
            )
        }   
        {
            status.error && (
                <div className='text-red-700'>
                    {status.error}
                </div>
            )
        } 

        <form onSubmit={handleSubmit} className='flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:grid-rows-4 md:grid-cols-1 md:grid-rows-7 md:w-3/4 md:italic lg:w-2/3'>

            <div className='flex flex-col'>
                <label className='block text-sm font-semibold text-gray-700'>N° DNI</label>
                <input
                type='text'
                name='customerDni'
                value={formData.customerDni}
                onChange={handleChange}
                required
                pattern="\d{8}"
                maxLength={8}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                placeholder='8 digits'
                />
            </div>
            <div className='flex flex-col'>
                <label className=' text-sm font-semibold text-gray-700' htmlFor="date&time">Date & Time</label>
                <input
                id="date&time"
                type='datetime-local'
                name='reservationDateTime'
                value={formData.reservationDateTime}
                onChange={handleChange}
                required
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition -all'
                />
            </div>
            
            <div className='flex flex-col'>
                <label className='block text-sm font-semibold text-gray-700'>N° Guests</label>
                <input
                type='number'
                name='numberOfGuests'
                value={formData.numberOfGuests}
                onChange={handleChange}
                required
                min={1}
                max={6}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                placeholder='min 1'
                />
            </div>
            <div className='flex flex-col'>
                <label className=' text-sm font-semibold text-gray-700'>Requests</label>
                <input
                type="text"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                placeholder="any request?"
                />
            </div>

            <div className='flex flex-col sm:col-span-2 md:col-span-1'>
                <button
                type="submit"
                disabled={status.loading}
                className={`max-sm:w-full py-3 px-4 rounded-lg text-white font-bold text-lg shadow-md transition-all ${
                    status.loading? 'bg-gray-400 cursor-not-allowed': 'bg-slate-700 hover:bg-gray-400 hover:shadow-lg hover:text-black'
                }`}
                >
                   {status.loading? 'Working...': 'Make'}     
                </button>
            </div>
            <div>
                <p>
                    For reservations of 7 or more people, please contact us.
                </p>
                <p>
                    Consider our business hours to make your reservation.
                </p>
            </div>    

        </form>
    </div>
  )
}
