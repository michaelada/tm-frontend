
import { useEffect } from 'react';

import Box from '@mui/material/Box';

import { CONFIG } from 'src/config-global';

import { Image } from 'src/components/image';
import { useLightBox } from 'src/components/lightbox';
import {
  Carousel,
  useCarousel,
  CarouselThumb,
  CarouselThumbs,
  CarouselArrowNumberButtons,
} from 'src/components/carousel';

import type { IProductImage } from '../../utils/types';

// ----------------------------------------------------------------------
// ${CONFIG.assetsDir}/assets/product/noproductimage.png
const BLANK_IMAGE = `${CONFIG.assetsDir}/assets/icons/empty/ic-folder-empty.svg`;

type Props = {
  images?: IProductImage[];
};

export function ProductDetailsCarousel({ images }: Props) {
  const carousel = useCarousel({
    thumbs: {
      slidesToShow: 'auto',
    },
  });

  const slides = images && images.length > 0 ? images?.map((img) => ({ src: img.image ?? ''})) : [ { src: BLANK_IMAGE}];

  const lightbox = useLightBox(slides);

  useEffect(() => {
    if (lightbox.open) {
      carousel.mainApi?.scrollTo(lightbox.selected, true);
    }
  }, [carousel.mainApi, lightbox.open, lightbox.selected]);

  return (
      <div>
        <Box sx={{ mb: 2.5, position: 'relative' }}>
          <CarouselArrowNumberButtons
            {...carousel.arrows}
            options={carousel.options}
            totalSlides={carousel.dots.dotCount}
            selectedIndex={carousel.dots.selectedIndex + 1}
            sx={{ right: 16, bottom: 16, position: 'absolute' }}
          />

          <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
            {slides.map((slide) => (
              <Image
                key={slide.src}
                alt={slide.src}
                src={slide.src}
                ratio="1/1"
                onClick={() => lightbox.onOpen(slide.src)}
                sx={{ cursor: 'zoom-in', minWidth: 320 }}
              />
            ))}
          </Carousel>
        </Box>

        <CarouselThumbs
          ref={carousel.thumbs.thumbsRef}
          options={carousel.options?.thumbs}
          slotProps={{ disableMask: true }}
          sx={{ width: 360 }}
        >
          {slides.map((item, index) => (
            <CarouselThumb
              key={item.src}
              index={index}
              src={item.src}
              selected={index === carousel.thumbs.selectedIndex}
              onClick={() => carousel.thumbs.onClickThumb(index)}
            />
          ))}
        </CarouselThumbs>
      </div>  
  );
}
