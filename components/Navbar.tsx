// interface defines what the prop type will be in react 
interface Navbar {
    currentAccount: string;
  };
  
  // the component
  const Navbar: React.FunctionComponent<Navbar> = ({ currentAccount }) => {
    
    return (
        <div className='flex justify-end'>
            {currentAccount && (
                <div className='text-gradient-300 font-bold bg-white border-gradient-200 border-2 rounded-lg py-2 px-3 m-3 '>{`${currentAccount.toString().slice(0, 4)}...${currentAccount.toString().slice(38)}`}</div>
            )}
        </div>
    )
  }

  export default Navbar