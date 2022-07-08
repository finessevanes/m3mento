// interface defines what the prop type will be in react 
import { ConnectButton } from '@rainbow-me/rainbowkit';

  
  // the component
  const Navbar: React.FunctionComponent<Navbar> = () => {
    
    return (
        <div className='flex justify-end mt-2 mr-3'>
                <ConnectButton />
        </div>
    )
  }

  export default Navbar