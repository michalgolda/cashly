import Image from 'next/image'

export default function Logo(props) {
    return (
        <Image
            src="/logo.svg"
            alt="logo"
            width={216}
            height={55}
            priority
            {...props}
        />
    )
}
