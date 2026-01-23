import { Link } from "react-router";


interface SectionPagesProps {
    title: string;
    image_url: string;
    message: string;
    route1: string;
    route2: string;
    route3: string;
    option1: string;
    option2: string;
    option3: string;
}

export function SectionGeneralPages({
    title,
    image_url,
    message,
    route1,
    route2,
    route3,
    option1,
    option2,
    option3, 
}:SectionPagesProps) {
  return (
    <section className="flex-1 w-full overflow-hidden flex flex-col justify-center items-center">
        <div className=" w-full py-4 text-center px-4 shadow-md z-10 flex flex-col">
            <h2 className="text-slate-900 font-bold italic font-serif">{title}</h2>
            <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex flex-1 relative w-full bg-cover bg-center items-center justify-center" style={{backgroundImage: `url('${image_url}')`}}>
            <div className="absolute inset-0 bg-white/70 z-0"></div>
            <div className="flex flex-col justify-center items-center relative z-10 p-8 text-black font-bold gap-5">
                <Link to={`${route1}`} className="w-45 h-10" >
                    <button className="w-full bg-slate-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105">
                        {option1}
                    </button>
                </Link>
                <Link to={`${route2}`}className="w-45 h-10">
                    <button className="w-full  bg-slate-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105">
                        {option2}
                    </button>
                </Link>
                <Link to={`${route3}`}className="w-45 h-10">
                    <button className="w-full  bg-slate-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-700 transition-all transform hover:scale-105">
                        {option3}
                    </button>
                </Link>
            </div>
        </div>

    </section>
  )
}
