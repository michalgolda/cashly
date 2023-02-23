import Header from '@/components/Header/Header'

import Actions from './Actions'

export default function PageHeader() {
    return (
        <Header
            title="Analityka"
            description={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Fusce dui nulla, facilisis eu imperdiet non, rhoncus quis nibh. 
                Praesent rutrum viverra iaculis. 
                Phasellus commodo orci vitae venenatis consequat.
            `}
        >
            <Actions />
        </Header>
    )
}
