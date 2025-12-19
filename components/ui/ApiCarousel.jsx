import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export default function ApiCarousel(props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const router = useRouter();

  const slides = props.items || [];

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className=" w-screen flex flex-col  ">
      <h2 className="text-lg pl-40 font-semibold text-stone-400 mb-4    ">
        {props.title}
      </h2>
      <div className="w-full  flex items-center justify-between">
        <button
          className="h-30 bg-stone-200 rounded p-2 shadow-lg hover:bg-[#B8A9FF] cursor-pointer"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="overflow-hidden w-full max-w-2xl " ref={emblaRef}>
            <div className="flex">
              {slides.map((api, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/apis/${api.name}`)}
                  className={`flex-[0_0_40%] mx-2 flex items-center justify-center rounded-lg cursor-pointer
  ${index === selectedIndex ? "scale-100 opacity-100" : "scale-90 opacity-60"}
  bg-gray-100 h-48 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-gray-500 text-sm mb-2">
                      {api.image ? <img src={api.image} alt={api.name} className="w-full h-30 "/> : "NO IMAGE AVAILABLE"}
                    </div>

                    <div className="text-lg font-semibold">{api.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          className="h-30 bg-stone-200 rounded p-2 shadow hover:bg-[#B8A9FF] cursor-pointer"
          onClick={() => emblaApi?.scrollNext()}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? "bg-[#050F2A] scale-125" : "bg-gray-300"
              }`}
          />
        ))}
      </div>

    </div>
  );
}
