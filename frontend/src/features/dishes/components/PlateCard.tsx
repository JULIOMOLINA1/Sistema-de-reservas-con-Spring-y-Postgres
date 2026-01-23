import type { PlateResponseDTO } from "@/common/plates/plateTypes";

interface PlateCardProps {
  plate: PlateResponseDTO;
}

export const PlateCard = ({ plate }: PlateCardProps) => {
  return (
<div className="group flex flex-col md:flex-row bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
  <div className="w-full md:w-1/3 h-64 md:h-auto relative overflow-hidden shrink-0">
    <img
      src={plate.imageUrl}
      alt={plate.name}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
    />
    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
  </div>

  <div className="flex flex-col flex-1 p-6 md:p-8 justify-between">
    
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-start">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800 group-hover:text-yellow-700 transition-colors duration-300 leading-tight">
          {plate.name}
        </h3>
      </div>
      
      <p className="text-sm md:text-base text-gray-500 line-clamp-3 font-sans leading-relaxed">
        {plate.description}
      </p>
    </div>

    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
      <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">
        Orden
      </span>
      <span className="text-xl md:text-2xl font-serif font-bold text-slate-900">
        S/ {plate.price.toFixed(2)}
      </span>
    </div>
  </div>
</div>
  );
};
