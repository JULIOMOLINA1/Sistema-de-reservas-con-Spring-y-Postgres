import { updateCustomerEmail } from "@/services/customers/customerService";
import { useState } from "react";

export function CustomerUpdateForm() {
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");

  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
    successMessage: string | null;
  }>({
    loading: false,
    error: null,
    success: false,
    successMessage: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({
      loading: true,
      error: null,
      success: false,
      successMessage: null,
    });

    try {
      const updatedCustomer = await updateCustomerEmail(dni, email);

      setStatus({
        loading: false,
        error: null,
        success: true,
        successMessage: `The email has been successfully updated for ${updatedCustomer.firstName} ${updatedCustomer.lastName}.`,
      });

      setDni("");
      setEmail("");
    } catch (err: any) {
      setStatus({
        loading: false,
        error: err.message,
        success: false,
        successMessage: null,
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-sm:h-full h-screen py-5 px-2 gap-2 sm:p-10 md:p-6 md:w-1/2 justify-center">
      <div className="max-sm:w-full text-black rounded-2xl max-md:shadow-lg p-10 gap-4 md:w-full lg:w-3/4">
        <h2 className="text-center text-slate-700 font-bold font-serif md:text-2xl md:px-10 md:py-4">
          Update client:
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 italic">
          <div className="flex flex-col">
            <label htmlFor="dni" className="block text-sm font-semibold text-gray-700 mb-1">
              DNI:
            </label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => {
                if (/^\d*$/.test(e.target.value)) setDni(e.target.value);
              }}
              maxLength={8}
              className="max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-md:rounded-lg outline-none transition-all"
              placeholder="Enter N°"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              New email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-sm:w-full px-4 py-2 border border-gray-300 md:border-0 md:border-b-2 max-sm:rounded-lg outline-none transition-all"
              placeholder="newemail@example.com"
              required
            />
          </div>
          <button
              type="submit"
              disabled={status.loading}
              className="rounded-lg border-2 border-gray-900 p-2 bg-slate-700 text-white font-bold transition-all hover:bg-gray-400 hover:shadow-lg hover:text-black"
            >
              {status.loading ? "Updating..." : "Update"}
            </button>
        </form>
      </div>
      <div className="text-center md:w-7/10 lg:w-1/2">
        {status.success && (
          <p className="text-green-700 font-medium">{status.successMessage}</p>
        )}

        {status.error && (
          <p className="text-red-700 font-medium">{status.error}</p>
        )}
      </div>
    </div>
  );
}
