import Image from 'next/image'

import Informer from '@/components/Informer/Informer'

import AddButton from '../AddButton'

export default function EmptyInformer() {
    return (
        <Informer
            bottomElement={<AddButton />}
            illustration={<Image src="/void.svg" alt="empty list" fill />}
            text={'Aktualnie lista kategorii wydatków jest pusta'}
        />
    )
}
