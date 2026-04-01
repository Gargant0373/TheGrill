import type { WindowManagerRenderProps } from "../../types/window";
import { Window } from "../Window";

function PicturesWindow(props: WindowManagerRenderProps) {
  return (
    <Window {...props}>
      <p className="m-0">Photo gallery will be available soon.</p>
    </Window>
  );
}

export default PicturesWindow;
