import { useState } from "react";
import type { Position } from "../types/window";

export default function usePositionedOverlay(initialPosition: Position | null = null) {
  const [position, setPosition] = useState<Position | null>(initialPosition);
  const [isClosing, setIsClosing] = useState(false);

  const closeOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setPosition(null);
    }, 160);
  };

  return {
    position,
    setPosition,
    isClosing,
    closeOverlay,
  };
}
