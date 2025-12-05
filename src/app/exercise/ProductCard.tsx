import { Product } from './products';

const DecathlonProductCard = ({ product }: { product: Product }) => {
  // Génère l'URL de recherche réelle sur Decathlon.fr
  const shopUrl = `https://www.decathlon.fr/search?Ntt=${encodeURIComponent(product.searchQuery)}`;

  return (
    <a
      href={shopUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white border border-gray-200 rounded overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Produit */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge Marque */}
        <div className="absolute top-0 left-0 bg-white/90 text-xs font-black px-2 py-1 uppercase text-slate-500">
          {product.brand}
        </div>
      </div>

      {/* Info Produit */}
      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug group-hover:text-[#0082C3] transition-colors">
          {product.title}
        </h4>

        {/* Prix et Étoiles */}
        <div className="mt-auto pt-2 flex items-end justify-between">
          <span className="bg-[#FFEA28] text-slate-900 font-black px-2 py-1 text-lg rounded-sm shadow-sm transform -skew-x-12">
            {product.price}
          </span>
          <div className="flex text-yellow-400 text-xs">★★★★☆</div>
        </div>
      </div>
    </a>
  );
};

export default DecathlonProductCard;
