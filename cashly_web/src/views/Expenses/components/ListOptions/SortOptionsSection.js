import PropTypes from 'prop-types'

import Input from '@/components/Input/Input'

import OptionsSection from './OptionsSection/OptionsSection'

function SortOptionsSection({
    sortParams,
    handleClearParams,
    handleChangeParam,
}) {
    return (
        <OptionsSection onClearParams={handleClearParams}>
            <Input
                as="select"
                labelText="Wartość"
                name="amount"
                onChange={handleChangeParam}
                value={sortParams['amount']}
                fullWidth
            >
                <option value="">Brak</option>
                <option value="ascending">Rosnąco</option>
                <option value="descending">Malejąco</option>
            </Input>
            <Input
                as="select"
                labelText="Data realizacji"
                name="realised_date"
                onChange={handleChangeParam}
                value={sortParams['realised_date']}
                fullWidth
            >
                <option value="">Brak</option>
                <option value="ascending">Rosnąco</option>
                <option value="descending">Malejąco</option>
            </Input>
        </OptionsSection>
    )
}

SortOptionsSection.propTypes = {
    sortParams: PropTypes.object.isRequired,
    handleClearParams: PropTypes.func.isRequired,
    handleChangeParam: PropTypes.func.isRequired,
}

export default SortOptionsSection
