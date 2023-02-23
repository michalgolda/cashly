import Image from 'next/image'

import Informer from '@/components/Informer/Informer'

import AddButton from '../../AddButton'
import ImportButton from '../../ImportButton'
import { StyledButtonContainer } from './EmptyInformer.styled'

export default function EmptyInformer() {
    return (
        <Informer
            bottomElement={
                <StyledButtonContainer>
                    <AddButton />
                    <ImportButton />
                </StyledButtonContainer>
            }
            illustration={
                <Image
                    src="void.svg"
                    alt="empty list"
                    width={128}
                    height={133.94}
                />
            }
            text={'Aktualnie lista wydatków jest pusta'}
        />
    )
}
