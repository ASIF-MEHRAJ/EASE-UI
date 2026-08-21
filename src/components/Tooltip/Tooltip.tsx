import { useState, useRef, useId, type ReactNode } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipVariant = "light" | "dark";

interface TooltipProps {
  /** Content shown inside the tooltip bubble */
  content: ReactNode;
  /** Element the tooltip is attached to */
  children: ReactNode;
  /** Which side of the trigger the tooltip appears on */
  position?: TooltipPosition;
  /** Visual style of the tooltip bubble */
  variant?: TooltipVariant;
  /** Delay in ms before the tooltip shows */
  delay?: number;
  /** Disable the tooltip entirely */
  disabled?: boolean;
  className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -mt-[4px] border-t-[6px] border-x-[6px] border-x-transparent",
  bottom:
    "bottom-full left-1/2 -translate-x-1/2 -mb-[4px] border-b-[6px] border-x-[6px] border-x-transparent",
  left: "left-full top-1/2 -translate-y-1/2 -ml-[4px] border-l-[6px] border-y-[6px] border-y-transparent",
  right:
    "right-full top-1/2 -translate-y-1/2 -mr-[4px] border-r-[6px] border-y-[6px] border-y-transparent",
};

const variantClasses: Record<TooltipVariant, { bubble: string; arrow: string }> = {
  dark: {
    bubble: "bg-gray-900 text-white",
    arrow: "border-gray-900",
  },
  light: {
    bubble: "bg-white text-gray-900 border border-gray-200 shadow-md",
    arrow: "border-white",
  },
};

export const Tooltip = ({
  content,
  children,
  position = "top",
  variant = "dark",
  delay = 100,
  disabled = false,
  className = "",
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const show = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? tooltipId : undefined}>{children}</span>

      {!disabled && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-all duration-150 ${
            positionClasses[position]
          } ${variantClasses[variant].bubble} ${
            visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          {content}
          <span
            className={`absolute h-0 w-0 ${arrowClasses[position]} ${variantClasses[variant].arrow}`}
          />
        </span>
      )}
    </span>
  );
};

export default Tooltip;
