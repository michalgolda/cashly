import PropTypes from 'prop-types'

import Input from '@/components/Input/Input'

import OptionsSection from './OptionsSection/OptionsSection'

function FilterOptionsSection({
    filterParams,
    handleClearParams,
    handleChangeParam,
    categories,
}) {
    return (
        <OptionsSection onClearParams={handleClearParams}>
            <Input
                as="select"
                labelText="Kategoria"
                name="category"
                onChange={handleChangeParam}
                value={filterParams['category']}
                fullWidth
            >
                <option value="">Bez kategorii</option>
                <option value="all">Wszystkie</option>
                {categories &&
                    categories.map((category) => {
                        return (
                            <option
                                key={category.id}
                                id={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </option>
                        )
                    })}
            </Input>
            <Input
                labelText="Data realizacji"
                name="realised_date"
                type="date"
                onChange={handleChangeParam}
                value={filterParams['realised_date']}
                fullWidth
            />
        </OptionsSection>
    )
}

FilterOptionsSection.propTypes = {
    filterParams: PropTypes.object.isRequired,
    handleClearParams: PropTypes.func.isRequired,
    handleChangeParam: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default FilterOptionsSection
