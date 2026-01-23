import type { ReservationResponseDTO } from "@/common/reservations/reservationsTypes";
import {
  cancelReservation,
  findPendingReservationsByDni,
} from "@/services/reservations/reservationService";
import { useState } from "react";

export function ReservationCancelForm() {
  const [dni, setDni] = useState("");

  const [reservations, setReservations] = useState<ReservationResponseDTO[]>(
    []
  );

  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    searched: boolean;
    successMessage: string | null;
  }>({
    loading: false,
    error: null,
    searched: false,
    successMessage: null,
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dni.trim()) return;

    setStatus({
      loading: true,
      error: null,
      searched: false,
      successMessage: null,
    });
    setReservations([]);
    setDni("");

    try {
      const data = await findPendingReservationsByDni(dni);
      setReservations(data);
      setStatus({
        loading: false,
        error: null,
        searched: true,
        successMessage: null,
      });
    } catch (err: any) {
      setStatus({
        loading: false,
        error: err.message,
        searched: true,
        successMessage: null,
      });
    }
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancel = async (reservationId: number) => {
    if (!window.confirm("Are you sure you want to cancel this reservations?"))
      return;

    setCancelingId(reservationId);
    setStatus((prev) => ({ ...prev, error: null, successMessage: null }));

    try {
      const message = await cancelReservation(reservationId);
      setReservations((prevList) =>
        prevList.filter((r) => r.reservationId !== reservationId)
      );

      setStatus((prev) => ({
        ...prev,
        successMessage: message,
      }));
    } catch (err: any) {
      setStatus((prev) => ({ ...prev, error: err.message }));
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-sm:h-full h-screen py-5 px-2 gap-2 sm:p-10 md:p-6 md:w-1/2 justify-center">
      <div className="max-sm:w-full text-black rounded-2xl max-md:shadow-lg">
        <h2 className="text-center text-slate-700 font-bold font-serif md:text-2xl md:px-10 md:py-4">
          Search reservations:
        </h2>

        <form onSubmit={handleSearch} className="flex flex-col gap-4 italic">
          <label
            htmlFor="dni"
            className="lock text-sm font-semibold text-gray-700"
          >
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
          <button
            type="submit"
            disabled={status.loading || !dni}
            className={`max-sm:w-full py-3 px-4 rounded-lg text-white font-bold text-lg shadow-md transition-all ${
              status.loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-700 hover:bg-gray-400 hover:shadow-lg hover:text-black"
            }`}
          >
            {status.loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-md">
        {status.error && (
          <div className="w-full border-2 text-red-700 text-center font-bold">
            {status.error}
          </div>
        )}

        {status.successMessage && (
          <div className="text-green-700 ">{status.successMessage}</div>
        )}

        {status.searched && !status.error && (
          <h3 className="text-black font-bold">Reservations:</h3>
        )}

        {status.searched && reservations.length === 0 && !status.error && (
          <p className="text-gray-500 italic text-center">
            No pending reservations found for this DNI.
          </p>
        )}

        <div className="flex flex-col gap-2">
          {reservations.map((res) => (
            <div
              key={res.reservationId}
              className="max-sm:w-full border-2 border-gray-500 rounded-2xl bg-slate-600 p-8 text-white font-serif  flex flex-col items-center gap-1"
            >
              <div className="flex text-sm w-4/5 gap-15">
                <span className="font-bold min-w-20 max-w-60">Name: </span>
                {res.firstName}
              </div>
              <div className="flex text-sm w-4/5 gap-15">
                <span className="font-bold min-w-20 max-w-60">Last name: </span>
                {res.lastName}
              </div>
              <div className="flex text-sm w-4/5 gap-15">
                <span className="font-bold min-w-20 max-w-60">Date: </span>
                {formatDate(res.reservationDateTime)}
              </div>
              <div className="flex text-sm w-4/5 gap-15">
                <span className="font-bold min-w-20 max-w-60">N° guests: </span>
                {res.numberOfGuests}
              </div>
              <div className="flex justify-center items-center rounded w-1/2">
                <button
                  onClick={() => handleCancel(res.reservationId)}
                  disabled={cancelingId === res.reservationId}
                  className="rounded-lg border-2 w-full border-gray-200 p-2 bg-slate-700 text-white font-bold transition-all hover:bg-gray-400 hover:shadow-lg hover:text-black"
                >
                  {cancelingId === res.reservationId
                    ? "Canceling..."
                    : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
