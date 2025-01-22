import React, { useState } from "react";
import { footer_content } from "../helpers/Constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegCopyright } from "react-icons/fa";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faDiscord,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = ({ footerCities }) => {
  const [cityOpen, setCityOpen] = useState(false);

  const handleCities = () => {
    setCityOpen(!cityOpen);
  };
  const cities = Array.isArray(footerCities) ? footerCities : [];

  return (
    <>
      <div className="flex bg-[#110705] text-[#ffffff99] flex-col items-center justify-center p-10">
        <div className="grid grid-cols-4 gap-x-[5%] w-[85%] mx-auto">
          <div>
            <div className="flex items-center" key="footer-details">
              <img
                className="w-40 filter grayscale"
                src="https://logowik.com/content/uploads/images/free-food-delivery8485.logowik.com.webp"
                style={{
                  backgroundColor: "[#110705]",
                  filter: "brightness(1) invert(1) hue-rotate(360deg)",
                }}
              />
            </div>
            <h1 className="truncate">© 2024 MealRush</h1>
          </div>
          {footer_content.map((x, index) => (
            <div key={index} className={`${index === 2 ? "col-start-3 " : ""}`}>
              <h1 className="font-BasisGrotesquePro font-bold text-base leading-10 tracking-tighter text-white">
                {x.title}
              </h1>
              {[...x.data].map((k, idx) => (
                <div key={`${index}-${idx}`}>
                  <h2 className="my-2 cursor-pointer">{k}</h2>
                </div>
              ))}
            </div>
          ))}
          <div className="col-start-4 row-start-1">
            <h1 className="font-BasisGrotesquePro font-bold text-base leading-10 tracking-tighter text-white">
              We deliver to :
            </h1>
            {cities.slice(0, 6).map((x) => (
              <div key={x.text}>
                <h1 className="py-1">{x.text}</h1>
              </div>
            ))}
            <div
              className="flex justify-between mt-2 align-center items-center cursor-pointer border-[#ffffff70] border-solid border-[1px] w-fit px-2 rounded-xl"
              onClick={handleCities}
            >
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          cityOpen
            ? "flex flex-col items-center justify-center pt-6 pb-10 text-[#ffffff99] bg-[#110705] w-full h-fit border-t-[#ffffff70] border-solid border-t-[1px]"
            : "hidden"
        }
      >
      
      </div>
      <div className="flex flex-col w-full items-center justify-center bg-[#110705] text-white ">
        <p className="py-2">Let's connect beyond the Plate</p>
        <div className="flex justify-between items-center gap-8 py-4">
          <a
            href="https://www.linkedin.com/in/prince-saxena-8b5426244" // Replace with your LinkedIn profile URL
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className="text-3xl hover:text-[#0a66c2]"
              icon={faLinkedin}
            />
          </a>
          <a
            href="https://github.com/prince1823"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              className="text-3xl hover:text-[#333]"
              icon={faGithub}
            />
          </a>
          <a
            href="https://discord.com/users/1330792747560337431"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl hover:text-[#7289da]"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
        </div>
        <div className="flex justify-center items-center py-2 mb-12 gap-2">
          <FaRegCopyright />
          <p>2024 MealRush</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
