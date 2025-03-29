import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpenedHeaderSection from "~/components/OpenedHeaderSections/OpenedHeaderSection";
import { OpenedHeaderSectionsData } from "~/components/OpenedHeaderSections/OpenedHeaderSectionData";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.header
        className={`h-[80px] duration-500 transition-colors ease-in-out group ${isActive ? "bg-black" : "bg-red"}`}
        initial={false}
        animate={{
          backgroundColor: isActive ? "#000000" : "#FF0000",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <nav>
          <ul>
            <li className="font-Anton text-3xl py-4 w-full text-center">
              <motion.a
                className={`cursor-pointer transition-colors duration-500 ease-in-out text-cream hover-underline-animation ${isActive ? "" : "active"} inline-block`}
                onClick={() => setIsActive(!isActive)}
                whileTap={{ scale: 0.95 }}
              >
                {isActive ? "CLOSE" : "MENU"}
              </motion.a>
            </li>
          </ul>
        </nav>
        <motion.hr
          className="border-cream border-[1.66px]"
          animate={{
            scaleX: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.header>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="h-[calc(100vh-80px)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <OpenedHeaderSection sections={OpenedHeaderSectionsData} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
