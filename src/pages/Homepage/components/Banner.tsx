import Slider from "react-slick";
import kong from "../assets/kong.jpg";
import thanhGuom from "../assets/thanhguomdietquy.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <img className="w-full h-[550px] object-fill" src={kong} alt="" />
      <img className="w-full h-[550px] object-fill" src={thanhGuom} alt="" />
      <img className="w-full h-[550px] object-fill" src={kong} alt="" />
      <img className="w-full h-[550px] object-fill" src={thanhGuom} alt="" />
      <img className="w-full h-[550px] object-fill" src={kong} alt="" />
    </Slider>
  );
};
export default Banner;
