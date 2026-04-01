import { WindowType, type WindowModule } from "../../types/window";

const windowModules = import.meta.glob("./*.tsx", { eager: true }) as Record<string, WindowModule>;
const order = Object.values(WindowType);

const windowsRegistry = Object.entries(windowModules)
  .map(([path, mod]) => {
    const id = path.match(/\.\/([A-Za-z]+)Window\.tsx$/)?.[1]?.toLowerCase() as WindowType;
    if (!order.includes(id)) {
      throw new Error(`Cannot infer WindowType from module path: ${path}`);
    }
    return { id, Component: mod.default };
  })
  .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

export default windowsRegistry;
