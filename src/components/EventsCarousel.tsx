
type Props = {
    title?: string
    bgColor?: string
  }

const EventsCarousel = ({ title, bgColor } : Props) => {

    return (
        <div className={`w-full h-72 ${bgColor}`}>
            <h1>{title}</h1>
        </div>
    )
}

export default EventsCarousel