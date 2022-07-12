import Link from 'next/link';


type Props = {
    title?: string
    bgColor?: string
    href: string
}

const EventsCarousel = ({ title, bgColor, href }: Props) => {

    return (
        <div className={`${bgColor}`}>
            <Link href={`/${href}`}>
                <a>{title}</a>
            </Link>

        </div>
    )
}

export default EventsCarousel