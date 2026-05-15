import React, { useState } from "react";
import { offset, shift, flip, autoUpdate } from "@floating-ui/dom";
import { AnimatePresence, motion } from "motion/react";

import {
	useDismiss,
	useRole,
	useInteractions,
	useFloating,
	FloatingFocusManager,
	useHover,
	safePolygon,
} from "@floating-ui/react";

interface Props {
	children: React.ReactElement;
	renderPopover: React.ReactNode;
	className?: string;
}

export default function Popover({ children, renderPopover, className }: Props) {
	const [isOpen, setIsOpen] = useState(true);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [offset(15), flip(), shift()],
		whileElementsMounted: autoUpdate,
	});

	// const click = useClick(context);
	const hover = useHover(context, {
		handleClose: safePolygon(),
	});

	const dismiss = useDismiss(context);
	const role = useRole(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([hover, dismiss, role]);
	return (
		<div className="">
			{/* React.cloneElement, giống như copy lại component con rồi có thể điều chỉnh props mà ko cần render lại từ đầu */}
			{React.cloneElement(
				children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>,
				{
					ref: refs.setReference,
					...getReferenceProps(),
				}
			)}
			{isOpen && (
				<FloatingFocusManager context={context} modal={true} initialFocus={-1}>
					<AnimatePresence>
						<div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
							<motion.div
								className={className}
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.2 }}
							>
								{renderPopover}
							</motion.div>
						</div>
					</AnimatePresence>
				</FloatingFocusManager>
			)}
		</div>
	);
}
