import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png"
import Casio from "../../../assets/brands/casio.png"
import star from "../../../assets/brands/start.png"
import monostar from "../../../assets/brands/moonstar.png"
import randstad from "../../../assets/brands/randstad.png"
import amazonVector from "../../../assets/brands/amazon_vector.png"
import starPeople from "../../../assets/brands/start-people 1.png"

const salesTeams = [amazon, Casio, star, monostar, amazonVector, randstad, starPeople];

const SalesTeamSection = () => {
  return (
    <section className="py-16 max-w-11/12 mx-auto  dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          We've helped thousands of <span className="text-blue-700">sales teams</span>
        </h2>

        {/* Marquee for images */}
        <Marquee pauseOnHover speed={50} gradient={false}>
          <div className="flex ml-8 gap-8">
            {salesTeams.map((team, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-40 flex flex-col items-center transition hover:scale-105 duration-300"
              >
                <img
                  src={team}
                  className=" object-contain "
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default SalesTeamSection;
