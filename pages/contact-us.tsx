import Layout from "../src/components/Layout"

function ContactUs() {

    return (
        <Layout title='contact us | m3mento'>
            <div className='flex top-container md:p-20 p-10 mt-8'>
                <div className='left-container md:w-2/4'>
                    <h1 className='md:text-5xl text-3xl mb-3 md:text'>Miss collecting concert tickets? We did too.</h1>
                    <p>We love music. It&apos;s that simple. We built m3mento because we wanted to give fans the best platform to do what they love most. NFT tickets allow fans to keep a digital souviner to recapure the experience, forever.</p>
                </div>
            </div>
            <div className='flex md:pl-20 md:pr-20 md:pb-20 justify-around flex-col md:flex-row pl-10 pr-10 pb-10'>
                <div className='md:w-4/12 mr-2 md:mb-0 mb-8'>
                    <h1 className='text-2xl mb-2'>Scams</h1>
                    <p>Tired of getting scammed when buying a ticket from a stranger? With NFT tickets, you easily verify the ticket collection on the blockchain.</p>
                </div>
                <div className='md:w-4/12 md:mb-0 mb-8'>
                    <h1 className='text-2xl mb-2'>Fees</h1>
                    <p>40% transaction fees? Not here. Our smart contracts are deployed on Polygon. That means really cheaper transaction fees and eco-friendly.</p>
                </div>
                <div className='md:w-4/12 md:mb-0 mb-8'>
                    <h1 className='text-2xl mb-2'>Collectables</h1>
                    <p>Digitial tickets are a big convenice. This conveneice came at a cost. Once you checked into an event, that ticket would just be lost in your inbox.</p>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className="hover:bg-gradient-100 bg-gradient-250 font-bold py-2 px-4 rounded-full mr-14 mint-btn mb-3">
                    <a href='mailto:vanes@m3mento.xyz'>Contact Us</a>
                </button>
            </div>

        </Layout>
    )
}

export default ContactUs