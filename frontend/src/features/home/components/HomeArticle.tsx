interface SectionProps {
  title: string;
  imagen_url: string;
  image_url2: string;
  motto: string;
  text: string;
}

export function HomeArticle({
  title,
  imagen_url,
  image_url2,
  motto,
  text,
}: SectionProps) {
  return (
  <article className="flex flex-col items-center justify-center w-full text-black h-125 gap-4 md:grid md:grid-cols-2 md:grid-rows-2 md:h-screen md:gap-0">
    <div className="text-black text-xs font-sans h-80 w-60 flex flex-col items-center border-2 border-gray-500 justify-center md:w-full md:h-full md:border-0 md:gap-4 italic">
        <h3 className="text-2xl font-serif font-bold text-gray-800 text-center">
            {title}
        </h3>
        <img src={`${imagen_url}`} className="w-full h-full max-md:object-cover object-cover md:w-2/3 md:h-7/10 md:max-w-100"/>
    </div>
    <div className="w-full h-50 text-gray-600 font-bold text-xs flex flex-col items-center p-2 md:text-sm md:h-full md:px-15 md:gap-10 lg:text-base justify-center lg:justify-start lg:px-30">
         <p className="text-slate-900 font-bold italic">
            {motto}
        </p>
        <p>
            {text}
        </p>
    </div>
    <div className="max-md:hidden w-full h-full col-start-2 row-start-1 row-span-2 bg-cover bg-center relative" style={{backgroundImage: `url('${image_url2}')`}}>
        <div className="absolute inset-0 bg-white/40 z-0"></div>
    </div>
  </article>
  );
}
