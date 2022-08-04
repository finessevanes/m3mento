import Layout from "../../src/components/Layout"

function Event() {

    return (
        <Layout title='event | m3mento'>
            <div className='flex flex-col p-16'>
                <h1 className='text-3xl mt-48'>Pop Music Festival</h1>
                <p className='text-lg mt-7'>Parkiran Utama Mall @alam Sutera</p>
                <p className='text-lg mt-5'>September </p>
                <p className='text-lg mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur deserunt itaque expedita. Cumque vero iste quisquam ut sequi, dicta ipsum, ratione distinctio quae quo accusamus molestiae! Alias quo autem illum.</p>
                <p className='text-2xl mt-5'>Event Information</p>
                <div className='flex'>
                    <div className="flex flex-col">
                        {'Duration'}
                        {'20.00 - 21.56'}
                        {'1 hour 56 minutes'}
                    </div>
                </div>
                {/* <EventInfoItems title='Tickets Sold' description='200/500' icon='timeLogo'/> */}
            </div>
        </Layout>
    )
}

export default Event