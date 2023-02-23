import PropTypes from 'prop-types'

import BaseList from '@/components/List'

import EmptyInformer from './EmptyInformer'
import ListItem from './ListItem/ListItem'
import ListSkeleton from './ListSkeleton'

function List({ data, isEmpty, isLoading }) {
    if (!isLoading && isEmpty) return <EmptyInformer />

    return (
        <BaseList>
            {isLoading && <ListSkeleton />}
            {!isLoading && (
                <>
                    {data.map((item, index) => {
                        return <ListItem key={index} {...item} />
                    })}
                </>
            )}
        </BaseList>
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
