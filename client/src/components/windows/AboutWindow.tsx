import type { WindowManagerRenderProps } from "../../types/window";
import { Window } from "../Window";

function AboutWindow(props: WindowManagerRenderProps) {
  return (
    <Window {...props}>
      <p className="m-0">
        The Grill is a neighborhood spot focused on open-flame cooking and seasonal ingredients.
      </p>
    </Window>
  );
}

export default AboutWindow;
