import {
    faChartSimple,
    faGripVertical,
    faReceipt,
} from '@fortawesome/free-solid-svg-icons'

import LinkButton from './LinkButton/LinkButton'
import { StyledMenu, StyledMenuItem } from './Menu.styled'

export default function Menu() {
    return (
        <StyledMenu>
            <StyledMenuItem>
                <LinkButton icon={faReceipt} href="/expenses">
                    Wydatki
                </LinkButton>
                <LinkButton icon={faReceipt} href="/expenses" iconOnly />
            </StyledMenuItem>
            <StyledMenuItem>
                <LinkButton icon={faGripVertical} href="/categories">
                    Kategorie
                </LinkButton>
                <LinkButton icon={faGripVertical} href="/categories" iconOnly />
            </StyledMenuItem>
            <StyledMenuItem>
                <LinkButton icon={faChartSimple} href="/analytics">
                    Analityka
                </LinkButton>
                <LinkButton icon={faChartSimple} href="/analytics" iconOnly />
            </StyledMenuItem>
        </StyledMenu>
    )
}
