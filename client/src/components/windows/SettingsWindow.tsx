import type { WindowManagerRenderProps } from "../../types/window";
import { Window } from "../Window";

function SettingsWindow(props: WindowManagerRenderProps) {
  return (
    <Window {...props}>
      <p className="m-0">User preferences and accessibility controls will appear here.</p>
    </Window>
  );
}

export default SettingsWindow;
