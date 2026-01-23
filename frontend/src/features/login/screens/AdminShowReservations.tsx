

import { useState } from "react";
import type { ReservationResponseDTO } from "@/common/reservations/reservationsTypes";
import { getReservationsByDate } from "@/services/reservations/reservationService";
import { ArrowLeft, Search, Calendar, Users, Clock } from "lucide-react";
import { useNavigate } from "react-router";

export function AdminShowReservations() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reservations, setReservations] = useState<ReservationResponseDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getReservationsByDate(date);
      setReservations(data);
      if (data.length === 0) {
        setError("No reservations found for this date.");
      }
    } catch (err) {
      setError("Failed to load reservations");
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b-4 border-slate-700 pb-4">
        <button
          onClick={() => navigate("/admin")}
          className="p-2 border-2 border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-slate-700 italic">Reservations By Date</h2>
      </div>

      <div className="bg-amber-50 border-4 border-slate-700 p-6 mb-10 shadow-[6px_6px_0px_0px_rgba(51,65,85,1)]">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col gap-2 flex-1">
            <label className="font-bold text-slate-700 italic flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 border-slate-700 p-3 outline-none focus:bg-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-700 text-white font-bold py-3 px-8 border-2 border-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 h-13"
          >
            <Search className="w-5 h-5" />
            {loading ? "SEARCHING..." : "SEARCH"}
          </button>
        </form>
      </div>

      {error && (
        <div className="text-center p-10 bg-white border-2 border-slate-300 italic text-slate-500 font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {reservations.map((res) => (
          <div
            key={res.reservationId}
            className="bg-white border-2 border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4 hover:border-amber-400 transition-colors shadow-sm rounded-xl"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center flex-1">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Users className="w-5 h-5 text-amber-500" />
                <span className="text-lg">{`${res.firstName} ${res.lastName}`}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">{new Date(res.reservationDateTime).toLocaleString()}</span>
              </div>
              <div className="bg-slate-50 px-3 py-1 border border-slate-200 rounded-full text-sm font-bold text-slate-500">
                DNI: {res.customerDni}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</div>
                <div className="text-green-600 font-bold italic">{res.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

