
import {HomeArticle} from "../components/HomeArticle";

export function Home() {
  return (
    <section className="flex flex-col ">
      <header className="flex items-center justify-center flex-col text-slate-900 text-2xl font-bold italic md:p-5">
        <h2 className="flex items-center justify-center md:text-3xl">
          Welcome to El rey
        </h2>
        <h2 className="text-gray-600 text-lg">Cevicheria Gourmet</h2>
        <h2 className="text-lg">Restaurant Buffet</h2>
      </header>
      <div className="flex flex-col">
        <HomeArticle
          title="The Excellence of Daily Fishing"
          imagen_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767976933/1_tor5mi.jpg"
          image_url2="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768190562/Gemini_Generated_Image_52s2j552s2j552s2_mbkaqw.png"
          motto="“From the sea to your plate, without detours.”"
          text="At El Rey, we don’t just serve food — we curate experiences. Our commitment begins before dawn, carefully selecting the freshest catch from the Peruvian coastline. We fuse Japanese cutting techniques with the boldness of northern lime and ají limo chili, achieving a perfect balance between acidity and freshness. Each dish is an ode to the sea, prepared to order to guarantee that firm texture only true fine dining can offer."
        />
        <HomeArticle
          title="Excellence in Every Bite"
          imagen_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767976933/2_snfl3x.jpg"
          image_url2="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768167035/7_zdjvez.jpg"
          motto="“A parade of flavors where the sea takes center stage.”"
          text="We elevate the standard of the seafood buffet. It’s not just about quantity, but about an exquisite curation of flavors. Each dish is presented as a work of art—from the vibrant freshness of our cold bars to the deep intensity of our smoked selections and stews. A proposal where the freedom to choose meets the technical perfection of Peruvian fine dining."
        />
        <HomeArticle
          title="A Sovereign Atmosphere"
          imagen_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1767976934/3_npaxln.jpg"
          image_url2="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768190562/Gemini_Generated_Image_k9kq59k9kq59k9kq_yzjy80.png"
          motto="“Where gastronomy meets art.”"
          text="Flavor is best enjoyed in an environment that captivates the senses. We have designed a space where modern architecture embraces marine elements. Soft lighting, wood and velvet textures, and acoustics crafted for intimate conversation. Whether it’s a romantic dinner or a family celebration, our dining room is the perfect stage for you to be the protagonist of the evening."
        />
        <HomeArticle
          title="Signature Toast"
          imagen_url="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768229655/Gemini_Generated_Image_40y9vi40y9vi40y9_lp278p.png"
          image_url2="https://res.cloudinary.com/dteypkycm/image/upload/f_auto,q_auto/v1768167035/8_ql3u0q.avif"
          motto="“The perfect pairing for an unforgettable night.”"
          text="The culinary experience is elevated when the right glass reaches the table. Our bar is an alchemy laboratory where Peruvian Pisco meets cutting-edge mixology techniques. From a Sour crowned with the perfect foam to signature creations designed to awaken the palate."
        />
      </div>
    </section>
  );
}
