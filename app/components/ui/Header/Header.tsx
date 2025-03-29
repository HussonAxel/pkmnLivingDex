import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OpenedHeaderSection from "~/components/OpenedHeaderSections/OpenedHeaderSection";
import { OpenedHeaderSectionsData } from "~/components/OpenedHeaderSections/OpenedHeaderSectionData";

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.header
        className={`duration-500 transition-colors ease-in-out group`}
        initial={false}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <nav>
          <ul className="border">
            <li className="font-anton text-3xl py-4 w-full text-center">
              <motion.a
                className={`cursor-pointer transition-colors duration-500 ease-in-out hover-underline-animation ${isActive ? "" : "active"} inline-block`}
                onClick={() => setIsActive(!isActive)}
                whileTap={{ scale: 0.95 }}
              >
                {isActive ? "CLOSE" : "MENU"}
              </motion.a>
            </li>
          </ul>
        </nav>
      </motion.header>
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="h-[calc(100vh-68px)]"
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
