import { useState, type ReactElement } from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";

interface TooltipExample {
  id: string;
  label: string;
  code: string;
  render: () => ReactElement;
}

const examples: TooltipExample[] = [
  {
    id: "top",
    label: "Top",
    code: `import { Tooltip } from "@/components/Tooltip/Tooltip";

const Example = () => {
  return (
    <Tooltip content="Top tooltip" position="top">
      <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
        Hover Top
      </button>
    </Tooltip>
  );
};

export default Example;`,
    render: () => (
      <Tooltip content="Top tooltip" position="top">
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
          Hover Top
        </button>
      </Tooltip>
    ),
  },
  {
    id: "bottom",
    label: "Bottom",
    code: `import { Tooltip } from "@/components/Tooltip/Tooltip";

const Example = () => {
  return (
    <Tooltip content="Bottom tooltip" position="bottom">
      <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black">
        Hover Bottom
      </button>
    </Tooltip>
  );
};

export default Example;`,
    render: () => (
      <Tooltip content="Bottom tooltip" position="bottom">
        <button className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black">
          Hover Bottom
        </button>
      </Tooltip>
    ),
  },
  {
    id: "left",
    label: "Left",
    code: `import { Tooltip } from "@/components/Tooltip/Tooltip";

const Example = () => {
  return (
    <Tooltip content="Left tooltip" position="left">
      <button className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50">
        Hover Left
      </button>
    </Tooltip>
  );
};

export default Example;`,
    render: () => (
      <Tooltip content="Left tooltip" position="left">
        <button className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50">
          Hover Left
        </button>
      </Tooltip>
    ),
  },
  {
    id: "right",
    label: "Right",
    code: `import { Tooltip } from "@/components/Tooltip/Tooltip";

const Example = () => {
  return (
    <Tooltip content="Right tooltip" position="right">
      <button className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50">
        Hover Right
      </button>
    </Tooltip>
  );
};

export default Example;`,
    render: () => (
      <Tooltip content="Right tooltip" position="right">
        <button className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50">
          Hover Right
        </button>
      </Tooltip>
    ),
  },
  {
    id: "light",
    label: "Light variant",
    code: `import { Tooltip } from "@/components/Tooltip/Tooltip";

const Example = () => {
  return (
    <Tooltip content="Light tooltip" position="top" variant="light">
      <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
        Light Variant
      </button>
    </Tooltip>
  );
};

export default Example;`,
    render: () => (
      <Tooltip content="Light tooltip" position="top" variant="light">
        <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
          Light Variant
        </button>
      </Tooltip>
    ),
  },
];

const TooltipPage = () => {
  const [openCodeId, setOpenCodeId] = useState<string | null>(null);

  const toggleCode = (id: string) => {
    setOpenCodeId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="parent">
      <h1 className="text-3xl font-bold">Tooltip</h1>
      <p className="mt-2 text-gray-600">
        The Tooltip component displays a short hint when hovering or
        focusing on an element.
      </p>

      <h2 className="mt-8 mb-3 text-xl font-semibold">Usage</h2>

      <div className="flex flex-col gap-6">
        {examples.map((example) => {
          const isOpen = openCodeId === example.id;
          return (
            <div
              key={example.id}
              className="box rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
                <span className="text-sm text-gray-500">
                  {example.label}
                </span>
                <button
                  onClick={() => toggleCode(example.id)}
                  className="text-sm text-gray-700 border border-gray-300 rounded px-2.5 py-1 hover:bg-gray-100"
                >
                  {"<> "}
                  {isOpen ? "Hide Code" : "View Code"}
                </button>
              </div>

              <div className="flex items-center justify-center bg-gray-100 py-14 px-6">
                {example.render()}
              </div>

              {isOpen && (
                <div className="bg-gray-900 text-gray-100">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 text-xs text-gray-400">
                    <span>TSX</span>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(example.code)
                      }
                      className="hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="p-4 text-xs overflow-x-auto leading-relaxed">
                    <code>{example.code}</code>
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <h2 className="mt-10 mb-3 text-xl font-semibold">API Reference</h2>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2.5 font-medium">Prop</th>
              <th className="px-4 py-2.5 font-medium">Type</th>
              <th className="px-4 py-2.5 font-medium">Default</th>
              <th className="px-4 py-2.5 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs">content</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600">ReactNode</td>
              <td className="px-4 py-2.5 text-gray-500">-</td>
              <td className="px-4 py-2.5 text-gray-600">Content shown inside the tooltip</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs">position</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600">
                "top" | "bottom" | "left" | "right"
              </td>
              <td className="px-4 py-2.5 text-gray-500">"top"</td>
              <td className="px-4 py-2.5 text-gray-600">Which side the tooltip appears on</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs">variant</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600">"light" | "dark"</td>
              <td className="px-4 py-2.5 text-gray-500">"dark"</td>
              <td className="px-4 py-2.5 text-gray-600">Visual style of the tooltip bubble</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs">delay</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600">number</td>
              <td className="px-4 py-2.5 text-gray-500">100</td>
              <td className="px-4 py-2.5 text-gray-600">Delay in ms before showing</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs">disabled</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600">boolean</td>
              <td className="px-4 py-2.5 text-gray-500">false</td>
              <td className="px-4 py-2.5 text-gray-600">Disables the tooltip</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-indigo-600 font-mono text-xs">children</td>
              <td className="px-4 py-2.5 font-mono text-xs text-gray-600">ReactNode</td>
              <td className="px-4 py-2.5 text-gray-500">-</td>
              <td className="px-4 py-2.5 text-gray-600">Element the tooltip is attached to</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TooltipPage;
