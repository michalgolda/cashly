import { useState, Fragment } from 'react';

import {
  FloatingPortal,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useDismiss,
  useFloating,
  useFocus,
  useRole,
  useInteractions,
} from '@floating-ui/react';

import * as S from './Tooltip.styled';

export default function Tooltip({ children, text, ...props }) {
  const [show, setShow] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    show,
    onOpenChange: setShow,
    placement: 'right',
    whileElementsMounted: autoUpdate,
    middleware: [offset(5), flip(), shift()],
  });
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <div ref={reference} {...getReferenceProps()}>
        {children}
      </div>
      <FloatingPortal>
        {show && (
          <S.Tooltip
            ref={floating}
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            {...getFloatingProps()}
            {...props}
          >
            {text}
          </S.Tooltip>
        )}
      </FloatingPortal>
    </>
  );
}
