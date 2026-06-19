"use client";

import * as React from "react";
import { cn } from "@/app/utils/cn";

type DropdownMenuContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(null);

export function useDropdownMenu() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be wrapped in <DropdownMenu />");
  }
  return context;
}

interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DropdownMenu({ children, open: controlledOpen, onOpenChange }: DropdownMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange]
  );

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdownMenu();

    const handleRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref, triggerRef]
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setOpen(!open);
      props.onClick?.(e);
    };

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>;
      return React.cloneElement(child, {
        ref: handleRef,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setOpen(!open);
          child.props.onClick?.(e);
        },
        "aria-expanded": open,
        "aria-haspopup": "menu",
        className: cn(child.props.className, className),
        ...props,
      });
    }

    return (
      <button
        ref={handleRef}
        type="button"
        onClick={handleClick}
        aria-expanded={open}
        aria-haspopup="menu"
        className={className}
        {...props}
      >
        {children}
      </button>
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "center";
}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, children, align = "left", ...props }, ref) => {
    const { open, setOpen, triggerRef } = useDropdownMenu();
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    const handleRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    React.useEffect(() => {
      if (!open) return;

      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          contentRef.current &&
          !contentRef.current.contains(target) &&
          triggerRef.current &&
          !triggerRef.current.contains(target)
        ) {
          setOpen(false);
        }
      };

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
          triggerRef.current?.focus();
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [open, setOpen, triggerRef]);

    if (!open) return null;

    return (
      <div
        ref={handleRef}
        role="menu"
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className={cn(
          "absolute z-50 min-w-32 overflow-hidden rounded-md border border-neutral-800 bg-neutral-950 p-1 text-neutral-200 shadow-md",
          "animate-fade-in touch-pan-y overscroll-contain",
          align === "right" && "right-0 origin-top-right",
          align === "left" && "left-0 origin-top-left",
          align === "center" && "left-1/2 -translate-x-1/2 origin-top",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, children, disabled, ...props }, ref) => {
    const { setOpen } = useDropdownMenu();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      props.onClick?.(e);
      setOpen(false);
    };

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-disabled={disabled}
        onClick={handleClick}
        className={cn(
          "relative flex cursor-default select-none items-center rounded-sm p-2 text-sm outline-none transition-colors",
          "focus:bg-neutral-800 focus:text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50",
          disabled && "pointer-events-none opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-neutral-400", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-neutral-800", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
