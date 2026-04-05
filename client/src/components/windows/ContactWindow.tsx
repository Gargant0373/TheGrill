import type { WindowManagerRenderProps } from "../../types/window";
import { Window } from "../Window";

function ContactWindow(props: WindowManagerRenderProps) {
  return (
    <Window {...props} aspectRatio="1-1">
      <p className="m-0">Phone: +1 (555) 014-8821</p>
      <p className="mb-0 mt-2">Email: hello@thegrill.example</p>
    </Window>
  );
}

export default ContactWindow;
