import { useEffect } from "react";
import usePositionedOverlay from "../../hooks/usePositionedOverlay";
import PositionedOverlay from "./PositionedOverlay";
import WindowButton from "./WindowButton";
import { PageType } from "../../types/page";

export default function ContextMenu() {
  const { position, setPosition, isClosing, closeOverlay } = usePositionedOverlay();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => (
      e.preventDefault(),
      setPosition({ x: e.clientX, y: e.clientY })
    );

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", closeOverlay);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", closeOverlay);
    };
  }, [setPosition, closeOverlay]);

  return (
    <PositionedOverlay
      position={position}
      isClosing={isClosing}
      className="pointer-events-auto fixed z-50 w-40 rounded-md border border-green-light bg-yellow-surface p-2"
      onClick={(e) => e.stopPropagation()}
    >
      {[PageType.ABOUT].map((e) => (
        <WindowButton
          key={e}
          event={e}
          label={e[0].toUpperCase() + e.slice(1)}
          className="block w-full cursor-pointer px-2 py-1 text-left text-xs text-purple hover:bg-purple/10 transition"
          onClick={closeOverlay}
        />
      ))}
    </PositionedOverlay>
  );
}
