import { OpenedHeaderSectionProps } from "./OpenedHeaderSection.type";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

type Props = {
  setIsActive: (value: boolean) => void;
};

export default function OpenedHeaderSection({ setIsActive }: Props) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-full">
      <motion.section
        className="bg-[#030712] h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center p-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Link to="/pokedex" className="" onClick={() => setIsActive(false)}>
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Pokedex
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Browse all Pokémon
            </motion.p>
          </motion.div>
        </Link>

        <Link to="/pokedex" className="" onClick={() => setIsActive(false)}>
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Mini Games
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Fun Pokémon mini-games
            </motion.p>
          </motion.div>
        </Link>

        <Link to="/pokedex" className="" onClick={() => setIsActive(false)}>
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Random Of The Day
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Daily random Pokémon
            </motion.p>
          </motion.div>
        </Link>

        <Link to="/pokedex" className="" onClick={() => setIsActive(false)}>
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Pokemon Data
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Detailed Pokémon information
            </motion.p>
          </motion.div>
        </Link>

        <Link
          to="/pokedex"
          className="pointer-events-none"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream/50 hover:text-red text-cream cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Collection
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Coming Soon...
            </motion.p>
          </motion.div>
        </Link>

        <Link
          to="/pokedex"
          className="pointer-events-none"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream/50 hover:text-red text-cream cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              About
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Coming Soon...
            </motion.p>
          </motion.div>
        </Link>

        <Link
          to="/pokedex"
          className="pointer-events-none"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream/50 hover:text-red text-cream cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Team Builder
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Coming Soon...
            </motion.p>
          </motion.div>
        </Link>

        <Link
          to="/pokedex"
          className="pointer-events-none"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream/50 hover:text-red text-cream cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Comparator
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Coming Soon...
            </motion.p>
          </motion.div>
        </Link>

        <Link
          to="/pokedex"
          className="pointer-events-none"
          onClick={() => setIsActive(false)}
        >
          <motion.div
            variants={item}
            className="border shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red hover:bg-cream/50 hover:text-red text-cream cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="font-anton uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              Shiny Hunting Tools
            </motion.h2>
            <motion.p
              className="font-worksans hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Coming Soon...
            </motion.p>
          </motion.div>
        </Link>
      </motion.section>
    </div>
  );
}
