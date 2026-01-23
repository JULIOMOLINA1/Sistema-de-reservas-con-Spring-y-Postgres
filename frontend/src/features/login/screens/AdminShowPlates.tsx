


import { useEffect, useState } from "react";
import type { PlateResponseDTO } from "@/common/plates/plateTypes";
import { getAllPlatesForAdmin } from "@/services/plates/plateService";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router";

export function AdminShowPlates() {
  const [plates, setPlates] = useState<PlateResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPlates = async () => {
    setLoading(true);
    try {
      const data = await getAllPlatesForAdmin();
      setPlates(data);
    } catch (err) {
      setError("Failed to load plates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlates();
  }, []);

  return (
    <div className="flex-1 w-full p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b-4 border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin")}
            className="p-2 border-2 border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-3xl font-bold text-slate-700 italic">Manage Plates</h2>
        </div>
        <button
          onClick={fetchPlates}
          className="flex items-center gap-2 bg-slate-700 text-white font-bold py-2 px-4 border-2 border-slate-700 hover:bg-white hover:text-slate-700 transition-colors"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          REFRESH
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 mb-6 font-bold">
          {error}
        </div>
      )}

      {loading && plates.length === 0 ? (
        <div className="text-center p-20 text-2xl font-bold text-slate-500 italic">
          Loading menu items...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plates.map((plate) => (
            <div
              key={plate.plateId}
              className={`flex flex-col border-2 border-slate-200 overflow-hidden bg-white shadow-md rounded-xl transition-all ${
                !plate.isAvailable ? 'opacity-75 grayscale-[0.5]' : ''
              }`}
            >
              <div className="h-48 border-b border-slate-100 relative">
                <img
                  src={plate.imageUrl}
                  alt={plate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plate.name}</h3>
                  <p className="text-sm text-slate-600 italic line-clamp-2">{plate.description}</p>
                </div>
                <div className="flex justify-between items-center border-t-2 border-slate-100 pt-4">
                  <span className="text-lg font-bold">S/{plate.price.toFixed(2)}</span>
                  <span className={`font-bold text-xs px-3 py-1 rounded-full border-2 ${
                    plate.isAvailable 
                      ? 'border-green-600 text-green-600 bg-green-50' 
                      : 'border-red-600 text-red-600 bg-red-50'
                  }`}>
                    {plate.isAvailable ? 'AVAILABLE' : 'UNAVAILABLE'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

