import PropTypes from 'prop-types'

import { StyledContainer } from './OptionsSectionSwitch.styled'
import SwitchButton from './SwitchButton'

function OptionsSectionSwitch({
    showFilterOptionsSection,
    showSortOptionsSection,
    toggleFilterOptionsSection,
    toggleSortOptionsSection,
}) {
    return (
        <StyledContainer
            showOptionsSection={
                showFilterOptionsSection || showSortOptionsSection
            }
        >
            <SwitchButton
                optionsSectionName="Filtrowanie"
                isCurrentOptionsSection={showFilterOptionsSection}
                onClick={() => toggleFilterOptionsSection()}
            />
            <SwitchButton
                optionsSectionName="Sortowanie"
                isCurrentOptionsSection={showSortOptionsSection}
                onClick={() => toggleSortOptionsSection()}
            />
        </StyledContainer>
    )
}

OptionsSectionSwitch.propTypes = {
    showFilterOptionsSection: PropTypes.bool.isRequired,
    showSortOptionsSection: PropTypes.bool.isRequired,
    toggleFilterOptionsSection: PropTypes.func.isRequired,
    toggleSortOptionsSection: PropTypes.func.isRequired,
}

export default OptionsSectionSwitch
