import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

import Button from '@/components/Button/Button'

function SwitchButton({
    optionsSectionName,
    isCurrentOptionsSection,
    ...props
}) {
    return (
        <Button
            variant={isCurrentOptionsSection ? 'primary' : 'primaryOutlined'}
            {...props}
        >
            {optionsSectionName}
        </Button>
    )
}

SwitchButton.propTypes = {
    optionsSectionName: PropTypes.string.isRequired,
    isCurrentOptionsSection: PropTypes.bool.isRequired,
}

export default SwitchButton
