import Layout from "../src/components/Layout"

function ContactUs() {

    return (
        <Layout title='contact us | m3mento'>
            <div className='flex top-container p-10 mt-24'>
                <div className='left-container md:w-2/4'>
                    <h1 className='md:text-5xl text-3xl mb-3 md:text'>Miss collecting concert tickets? We did too.</h1>
                    <p className='mb-6'>We love music. It&apos;s that simple. We built m3mento because we want to give fans the best platform to do what they love most. NFT tickets allow fans to keep a digital souviner to recapure the experience.</p>
                </div>
            </div>
            <div className='flex md:pb-20 justify-between flex-col lg:flex-row pl-10 pr-10 pb-10'>
                <div className='lg:w-3/12 md:mb-0 mb-8'>
                    <h1 className='text-2xl mb-2'>Scams</h1>
                    <p className='md:text-sm'>Tired of getting scammed when buying a ticket from a stranger? With NFT tickets, you can verify the ticket collection on the blockchain.</p>
                </div>
                <div className='lg:w-3/12 md:mb-0 mb-8'>
                    <h1 className='text-2xl mb-2'>Fees</h1>
                    <p className='md:text-sm'>40% transaction fees? Not here. Our smart contracts are deployed on Polygon - that means really cheap fees and it's eco-friendly.</p>
                </div>
                <div className='lg:w-3/12 md:mb-0 mb-8 '>
                    <h1 className='text-2xl mb-2'>Collectibles</h1>
                    <p className='md:text-sm'>Digital tickets are a convenient way to attend events, but it comes at a cost. We lose the ability to collect tickets to past events. NFTs are a way around this problem.</p>
                </div>
            </div>
            <div className='flex justify-center'>
                <button className="hover:bg-gradient-100 bg-gradient-250 font-bold py-2 px-4 rounded-full mr-14 mint-btn mb-12">
                    <a href='mailto:vanes@m3mento.xyz'>Contact Us</a>
                </button>
            </div>

        </Layout>
    )
}

export default ContactUs