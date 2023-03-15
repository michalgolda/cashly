import PropTypes from 'prop-types'

import EmptyInformer from './EmptyInformer/EmptyInformer'
import { StyledList, StyledNotFoundExpenses } from './List.styled'
import ListItem from './ListItem/ListItem'
import ListSkeleton from './ListSkeleton'

function List({ data, isEmpty, isLoading }) {
    if (!isLoading && isEmpty) return <EmptyInformer />

    return (
        <StyledList>
            {isLoading && <ListSkeleton />}
            {!isLoading && (
                <>
                    {data.length === 0 ? (
                        <StyledNotFoundExpenses>
                            Brak wydatków spełniających wybrane kryteria
                        </StyledNotFoundExpenses>
                    ) : (
                        <>
                            {data.map((item, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        id={item.id}
                                        amount={item.amount}
                                        category={item.category}
                                        realisedDate={item.realised_date}
                                    />
                                )
                            })}
                        </>
                    )}
                </>
            )}
        </StyledList>
    )
}

List.propTypes = {
    data: PropTypes.array,
    isEmpty: PropTypes.bool,
    isLoading: PropTypes.bool,
}

List.defaultProps = {
    isEmpty: true,
    isLoading: false,
}

export default List
