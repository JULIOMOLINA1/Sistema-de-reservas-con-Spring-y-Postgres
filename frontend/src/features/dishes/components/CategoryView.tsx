import type { PlateResponseDTO } from "@/common/plates/plateTypes";
import { getPlatesByCategoryId } from "@/services/plates/plateService";
import { useEffect, useState } from "react";
import { PlateCard } from "./PlateCard";

interface CategoryViewProps {
  categoryId: number;
  title: string;
}

export const CategoryView = ({ categoryId, title }: CategoryViewProps) => {
  const [plates, setPlates] = useState<PlateResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlates = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPlatesByCategoryId(categoryId);
        setPlates(data);
      } catch (err) {
        setError("Sorry, we couldn't load the menu at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlates();
  }, [categoryId]);

  if (loading)
    return (
      <div className="text-center font-bold text-gray-900 p-20">
        Loading delights
      </div>
    );
  if (error)
    return (
      <div className="text-center font-bold text-red-600 p-20">{error}</div>
    );
  return (
    <div className=" flex flex-col w-full max-w-8xl p-6 md:p-10 mx-auto items-center justify-center">
      <div className="text-center mb-10 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-700 border-b-4 border-slate-300 pb-2">
          {title}
        </h2>
      </div>
      {plates.length === 0 ? (
        <p className="text-center text-gray-500 italic text-lg">
          There aren't any plates for this categoriy at this time.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-4 xl:gap-12 2xl:gap-20">
          {plates.map((plate) => (
            <PlateCard key={plate.plateId} plate={plate} />
          ))}
        </div>
      )}
      
    </div>
  );
};
