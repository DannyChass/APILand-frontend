import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function ApiCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const slides = ["API 1", "API 2", "API 3", "API 4", "API 5"];

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
    <div className=" w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold text-stone-400 mb-4    ">
        Les API les mieux notées
      </h2>

      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`flex-[0_0_40%] mx-2 flex items-center justify-center rounded-lg transition-transform duration-500 ease-in-out
                ${
                  index === selectedIndex
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-60"
                }
                bg-gray-100 h-48 shadow-md`}
            >
              <div className="text-center">
                <div className="text-gray-500 text-sm mb-2">
                  NO IMAGE AVAILABLE
                </div>
                <div className="text-lg font-semibold">{slide}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute h-30 left-0 top-1/2 -translate-y-1/2 bg-stone-200  rounded p-2 mt-20 shadow-lg hover:bg-[#B8A9FF] cursor-pointer"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        className="absolute right-0 h-30 top-1/2 -translate-y-1/2 bg-stone-200 rounded-md p-2 mt-20 shadow hover:bg-[#B8A9FF] cursor-pointer"
        onClick={() => emblaApi?.scrollNext()}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      <div className="flex justify-center mt-4 gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex ? "bg-[#050F2A] scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
