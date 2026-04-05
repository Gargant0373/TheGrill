import type { WindowManagerRenderProps } from "../../types/window";
import { Window } from "../Window";

function PicturesWindow(props: WindowManagerRenderProps) {
  return (
    <Window {...props} aspectRatio="4-3">
      <p className="m-0">Photo gallery will be available soon.</p>
    </Window>
  );
}

export default PicturesWindow;
