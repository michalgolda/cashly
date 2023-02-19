import {
    FloatingPortal,
    autoUpdate,
    flip,
    offset,
    shift,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { StyledTooltip } from './SidebarTooltip.styled'

function SidebarTooltip({ children, text, ...props }) {
    const [show, setShow] = useState(false)
    const { x, y, reference, floating, strategy, context } = useFloating({
        show,
        onOpenChange: setShow,
        placement: 'right',
        whileElementsMounted: autoUpdate,
        middleware: [offset(5), flip(), shift()],
    })
    const hover = useHover(context, { move: false })
    const focus = useFocus(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'tooltip' })
    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ])

    return (
        <>
            <div ref={reference} {...getReferenceProps()}>
                {children}
            </div>
            <FloatingPortal>
                {show && (
                    <StyledTooltip
                        ref={floating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0,
                        }}
                        {...getFloatingProps()}
                        {...props}
                    >
                        {text}
                    </StyledTooltip>
                )}
            </FloatingPortal>
        </>
    )
}

SidebarTooltip.propTypes = {
    text: PropTypes.string.isRequired,
}

export default SidebarTooltip
