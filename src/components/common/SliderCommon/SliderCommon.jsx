'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import clsx from 'clsx';

import { IconButton } from '@/components/common';

import { ChevronRightSecond, ChevronLeftSecond } from '@/components/icons';

import './SliderCommon.scss';

export default function SliderCommon({
  cardComponent: Card,
  dataList,
  width = '326px',
  spaceBetween = 20,
  isNeedPeek,
  peek,
  additionalClass,
}) {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current) return;
    const swiper = swiperRef.current;

    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
    swiper.navigation.init();
    swiper.navigation.update();
  }, []);

  useEffect(() => {
    if (!isNeedPeek) return;
  }, [isNeedPeek]);

  return (
    <div className={clsx('slider-common', additionalClass && additionalClass)}>
      <Swiper
        modules={[Navigation, A11y, Keyboard]}
        onSwiper={swiper => (swiperRef.current = swiper)}
        loop={true}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        speed={450}
        slidesOffsetBefore={peek ? -peek : 0}
        slidesOffsetAfter={peek ? peek : 0}
        keyboard={{ enabled: true }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={false}
        a11y={{ prevSlideMessage: 'Prev', nextSlideMessage: 'Next' }}
      >
        {dataList.map((item, index) => (
          <SwiperSlide key={index} style={{ width: `${width}` }}>
            <Card data={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-common__nav-wrapper">
        <div className="slider-common__nav">
          <IconButton ref={prevRef} icon={ChevronLeftSecond} aria-label="Prev slide" />
          <IconButton ref={nextRef} icon={ChevronRightSecond} aria-label="Next slide" />
        </div>
      </div>
    </div>
  );
}
