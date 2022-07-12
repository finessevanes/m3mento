import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Navbar = () => {

  return (
    <nav className=''>
      <Link href="/">
        <a>Home</a>
      </Link>
      <ConnectButton />
    </nav>
  )
}

export default Navbar