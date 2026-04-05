import type { WindowManagerRenderProps } from "../../types/window";
import { Window } from "../Window";

function GuidelinesWindow(props: WindowManagerRenderProps) {
  return (
    <Window {...props} aspectRatio="4-3">
      <ul className="m-0 list-disc pl-5">
        <li>Walk-ins are welcome.</li>
        <li>Large groups should reserve in advance.</li>
        <li>Please mention dietary restrictions while ordering.</li>
      </ul>
    </Window>
  );
}

export default GuidelinesWindow;
