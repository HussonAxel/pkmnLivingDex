import { useRef, useEffect } from "react";

export function PokemonCardMenu({
  isOpen,
  onClose,
  menuItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: { icon: React.ElementType; text: string }[];
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-10 mr-4 bg-gray-800 rounded-md shadow-lg z-50 w-56"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        <ul className="text-sm text-gray-200">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="hover:bg-gray-700 px-4 py-2 cursor-pointer flex items-center gap-2 rounded-md"
              onClick={(e) => e.stopPropagation()}
            >
              <item.icon size={18} /> {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
