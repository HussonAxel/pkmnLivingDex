import { OpenedHeaderSectionProps } from "./OpenedHeaderSection.type";
import { motion } from "framer-motion";

export default function OpenedHeaderSection({
  sections,
}: OpenedHeaderSectionProps) {
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
        {sections.map((section, index) => (
          <motion.div
            key={index}
            variants={item}
            className={`border-[1.66px] shadow-md rounded-sm border-cream bg-red font-Anton group text-center content-center w-[440px] h-[220px] max-w-[440px] max-h-[220px] transition-colors duration-500 hover:border-red ${section.available ? "hover:bg-cream cursor-pointer" : "hover:bg-cream/50  hover:text-red text-cream cursor-not-allowed "}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h2
              className="uppercase transition-opacity duration-500 text-3xl group-hover:hidden text-cream"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {section.mainTitle}
            </motion.h2>
            <motion.p
              className={`hidden text-xl transition-opacity duration-500 px-8 text-cream group-hover:block group-hover:text-red`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {section.available ? section.subTitle : "Coming Soon..."}
            </motion.p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
