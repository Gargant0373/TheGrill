import { WindowButton } from "./WindowButton";
import windowsRegistry from "./windows/registry";

export function Navbar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-999 flex justify-center">
      <nav className="pointer-events-auto overflow-hidden rounded-t-md border-x-2 border-t-2 border-blue bg-beige-dark">
        <ul className="flex divide-x-2 divide-blue">
          {windowsRegistry.map(({ id }) => (
            <li key={id}>
              <WindowButton
                event={id}
                label={id.charAt(0).toUpperCase() + id.slice(1)}
                icon={
                  <img
                    src="https://poolsuite.net/dock/settings.png"
                    alt=""
                    className="mb-2 h-6 w-7.5"
                  />
                }
                className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 border-l border-r border-t border-l-white/70 border-r-black/45 border-t-white/70 bg-beige px-1 py-0.5 text-center text-xs text-blue-dark transition select-none active:translate-y-px active:border-l-black/45 active:border-r-white/70 active:border-t-black/45"
              />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
