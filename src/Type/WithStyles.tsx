import React from "react";

interface WithStylesProps {
  description: string;
  headline: string;
  image: string;
  per: string;
  description2: string;
}

const WithStyles: React.FC<WithStylesProps> = ({
  description,
  headline,
  image,
  per,
  description2,
}) => {
  return (
    <div className="relative w-full h-[600px] mb-4">
      <img src={image} alt={headline} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-amber-400">
        <h2 className="text-5xl font-extrabold mb-2 text-shadow">{headline}</h2>
        <div className="mt-6">
          <span className="text-2xl font-bold align-top text-shadow">
            {description}
          </span>
          <span className="text-[150px] font-extrabold text-shadow">{per}</span>
          <em className="text-2xl font-extrabold text-shadow">
            {description2}
          </em>
        </div>
        <button className="mt-20 px-6 py-2 bg-green-300 text-black font-bold uppercase tracking-wide rounded">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default WithStyles;
