import Image from 'next/image'

import Informer from '@/components/Informer/Informer'

import AddButton from '../AddButton'

export default function EmptyInformer() {
    return (
        <Informer
            bottomElement={<AddButton />}
            illustration={<img src="/void.svg" width={128} />}
            text={'Aktualnie lista kategorii wydatków jest pusta'}
        />
    )
}
