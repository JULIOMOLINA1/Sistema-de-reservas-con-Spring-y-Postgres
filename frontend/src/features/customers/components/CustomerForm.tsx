

import type { CustomerRequestDTO } from '@/common/customers/customerTypes'
import { createCustomer } from '@/services/customers/customerService';
import React, { useState } from 'react'

export const CustomerForm = () => {
    const [formData, setFormData] = useState<CustomerRequestDTO>({
        firstName: "",
        lastName: "",
        dni: "",
        phoneNumber: "",
        email: "",
        birthDate: "",
        isActive: true,
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
        const { name, value} =e.target;

        if((name === 'dni' || name ==='phoneNumber') && !/^\d*$/.test(value) ) {
            return;
        }

        setFormData((prev)=>({
            ...prev,
            [name]:value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        setStatus({loading: true, error: null, success: false});

        try{
            await createCustomer(formData);
            setStatus({loading: false, error: null, success: true});

            setFormData({
                firstName: "",
                lastName: "",
                dni: "",
                phoneNumber: "",
                email: "",
                birthDate: "",
                isActive: true,
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
            Register client
        </h2>

        {
            status.success && (
                <div className='text-green-700'>
                    Client saved succesfully.
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
                <label className=' text-sm font-semibold text-gray-700'>Name</label>
                <input
                type='text'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={25}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                />
            </div>
            <div className='flex flex-col'>
                <label className=' text-sm font-semibold text-gray-700'>Last name</label>
                <input
                type='text'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={25}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                />
            </div>
            <div className='flex flex-col'>
                <label className='block text-sm font-semibold text-gray-700'>N° DNI</label>
                <input
                type='text'
                name='dni'
                value={formData.dni}
                onChange={handleChange}
                required
                pattern="\d{8}"
                maxLength={8}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                placeholder='8 digits'
                />
            </div>
            <div className='flex flex-col'>
                <label className='block text-sm font-semibold text-gray-700'>Phone number</label>
                <input
                type='tel'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                pattern="\d{9}"
                maxLength={9}
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                placeholder='9 digits'
                />
            </div>
            <div className='flex flex-col'>
                <label className=' text-sm font-semibold text-gray-700'>Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all'
                placeholder="customer@example.com"
                />
            </div>
            <div className='flex flex-col'>
                <label className=' text-sm font-semibold text-gray-700'>Birthdate</label>
                <input
                type='date'
                name='birthDate'
                value={formData.birthDate}
                onChange={handleChange}
                required
                className='max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition -all'
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
                   {status.loading? 'Working...': 'Create client'}     
                </button>
            </div>

        </form>

    </div>
  )
}
export default CustomerForm;
