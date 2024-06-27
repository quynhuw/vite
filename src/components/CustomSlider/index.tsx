import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Setting } from "../../type/type";
import React, { ReactNode } from "react";

interface SliderProps {
  settings: Setting;
  children: ReactNode;
}

const CustomSlider: React.FC<SliderProps> = (props) => {
  const { settings, children } = props;

  return <Slider {...settings}>{children}</Slider>;
};
export default CustomSlider;
