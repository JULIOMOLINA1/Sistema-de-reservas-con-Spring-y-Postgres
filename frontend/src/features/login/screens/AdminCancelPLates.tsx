import { useState, useEffect } from "react";
import type { PlateResponseDTO } from "@/common/plates/plateTypes";
import { getAllPlatesForAdmin, updatePlateAvailability } from "@/services/plates/plateService";
import { ArrowLeft, Ban, CheckCircle, Utensils } from "lucide-react";
import { useNavigate } from "react-router";

export function AdminCancelPLates() {
  const [plates, setPlates] = useState<PlateResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPlates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPlatesForAdmin();
      setPlates(data);
    } catch (err) {
      setError("Failed to load plates. Please check your connection.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlates();
  }, []);

  const handleToggleAvailability = async (plateId: number, currentStatus: boolean) => {
    try {
      await updatePlateAvailability(plateId, !currentStatus);
      // Actualizar el estado local para reflejar el cambio inmediatamente
      setPlates(prevPlates => prevPlates.map(p => 
        p.plateId === plateId ? { ...p, isAvailable: !currentStatus } : p
      ));
    } catch (err) {
      alert("Error updating plate availability. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex-1 w-full p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b-4 border-slate-700 pb-4">
        <button
          onClick={() => navigate("/admin")}
          className="p-2 border-2 border-slate-700 hover:bg-slate-700 hover:text-white transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-slate-700 italic">Plate Availability (Cancel Plate)</h2>
      </div>

      <div className="bg-amber-50 border-4 border-slate-700 p-6 mb-10 shadow-[6px_6px_0px_0px_rgba(51,65,85,1)]">
        <div className="flex items-center gap-2 text-slate-700 mb-2 font-bold uppercase tracking-wider text-sm">
          <Utensils className="w-5 h-5" /> Menu Management
        </div>
        <p className="text-slate-600 font-medium italic">
          Use this panel to temporarily disable plates from the menu. Disabled plates will be hidden from customers.
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 mb-6 font-bold">
          {error}
        </div>
      )}

      {loading && plates.length === 0 ? (
        <div className="text-center p-20 text-2xl font-bold text-slate-500 italic animate-pulse">
          Loading plates...
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
              <div className="h-40 border-b border-slate-100 relative">
                <img
                  src={plate.imageUrl}
                  alt={plate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1 gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{plate.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Price: S/{plate.price.toFixed(2)}</p>
                </div>
                
                <button
                  onClick={() => handleToggleAvailability(plate.plateId, plate.isAvailable)}
                  className={`mt-auto flex items-center justify-center gap-2 font-bold py-2 px-4 rounded-lg transition-colors ${
                    plate.isAvailable 
                      ? 'bg-red-500 text-white hover:bg-red-600 shadow-sm' 
                      : 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
                  }`}
                >
                  {plate.isAvailable ? (
                    <><Ban className="w-5 h-5" /> DISABLE</>
                  ) : (
                    <><CheckCircle className="w-5 h-5" /> ENABLE</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
