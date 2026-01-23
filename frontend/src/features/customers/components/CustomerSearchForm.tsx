import type {
  AppErrorResponse,
  CustomerResponseDTO,
} from "@/common/customers/customerTypes";
import { useState } from "react";

export function CustomerSearchForm() {
  const [dniInput, setDniInput] = useState("");
  const [customer, setCustomer] = useState<CustomerResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dniInput.trim()) return;

    setLoading(true);
    setError(null);
    setCustomer(null);

    try {
      const response = await fetch(
        `http://localhost:8087/api/customers/dni/${dniInput}`
      );

      if (!response.ok) {
        const errorData: AppErrorResponse = await response.json();
        throw new Error(errorData.message || "Unknown error");
      }

      const data: CustomerResponseDTO = await response.json();
      setCustomer(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setDniInput('');
    }
  };
  return (
    <div className="flex flex-col items-center w-full max-sm:h-full h-screen py-5 px-2 gap-2 sm:p-10 md:p-6 md:w-1/2 justify-center">
      <div className="max-sm:w-full text-black rounded-2xl max-md:shadow-lg">
        <div className=" p-4 flex flex-col items-center gap-4">
          <label className="text-center text-slate-700 font-bold font-serif md:text-2xl md:px-10">
            Search client:
          </label>

          <form onSubmit={handleSearch} className="w-full flex flex-col gap-3 italic">
            <label className='block text-sm font-semibold text-gray-700'>DNI</label>
            <input
              type="text"
              placeholder="8 digits"
              className="max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all"
              value={dniInput}
              required
              pattern="\d{8}"
              maxLength={8}
              onChange={(e) => setDniInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg border-2 border-gray-900 p-2 bg-slate-700 text-white font-bold transition-all hover:bg-gray-400 hover:shadow-lg hover:text-black"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="w-full border-2 text-red-700 text-center font-bold">
          {error}
        </div>
      )}
      {customer && (
        <div className="max-sm:w-full border-2 border-gray-500 rounded-2xl bg-slate-600 p-8 text-white font-serif  flex flex-col items-center gap-2">
          <h2 className="text-xl font-bold text-center border-b-2 border-black ">
            Customer found:
          </h2>
          <div className="text-lg font-mono flex flex-col items-start justify-center max-md:text-xs ">
            <div className="flex justify-start">
              <span className="font-bold w-32">Name:</span>
              <span>{customer.firstName}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-32">Lastname:</span>
              <span>{customer.lastName}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-32">DNI:</span>
              <span>{customer.dni}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-32">Phone:</span>
              <span>{customer.phoneNumber}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-32">Email:</span>
              <span>{customer.email}</span>
            </div>
            <div className="flex">
              <span className="font-bold w-32">Birthdate:</span>
              <span>{customer.birthDate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
