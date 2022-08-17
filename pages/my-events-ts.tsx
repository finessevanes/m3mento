import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { useAccount, useProvider, useContract, useSigner } from "wagmi";

import contractInterface from "../src/utils/abi.json";
import { CONTRACT_ADDRESS } from "../web3-constants";

type MyEventsProps = {
  data: object;
};

interface Tickets {
  title: string;
  description: string;
}

const MyEvents = ({ data }: MyEventsProps) => {
  const [isUserCheckedIn, setIsUserCheckedIn] = useState<boolean>(false);
  const [addressSignedIn, setAddressSignedIn] = useState<string>("");

  const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 py-2 px-4 rounded shadow mt-2 disabled:bg-gradient-100
    `;

  const provider = useProvider();
  const { address } = useAccount();
  const { data: signer, isError, isLoading } = useSigner();

  const contractSigner = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: signer,
  });

  const contractProvider = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: provider,
  });

  const handleCheckIn = async () => {
    if (!address) return;
    try {
      console.log("address to be checked in: ", address);
      console.log("... checking in");
      let checkInTxn = await contractSigner.checkIn(address);
      await checkInTxn.wait();
      setIsUserCheckedIn(true);
      console.log("complete!");
      console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`);
    } catch (e) {
      console.log(e);
    }
  };

  const checkIfUserHoldsTicket = async (addy: string) => {
    try {
      let confirmOwnership = await contractProvider.getConfirmOwnership(addy);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (address) {
      checkIfUserHoldsTicket(address);
    }
  });

  useEffect(() => {
    if (!address) return;
    const checkAddress = async () => {
      setAddressSignedIn(address);
    };

    checkAddress();
  }, [address]);

  useEffect(() => {
    fetch(
      `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${CONTRACT_ADDRESS}`
    )
      .then((response) => response.json())
      .then((data) => {
        const {
          image_original_url: imageOriginalUrl,
          name,
          token_id: tokenId,
        } = data?.assets[0];
      });
  });

  return (
    <div className="flex justify-center mt-60">
      <div className="bg-red-100 rounded-lg flex flex-col p-12 text-center">
        <h1 className="">My Events</h1>
        <h1>Nights and Weekends</h1>
        <button
          disabled={isUserCheckedIn}
          className={ButtonStyle}
          onClick={handleCheckIn}
        >
          Check In
        </button>
      </div>
    </div>
  );
};

//   export const getServerSideProps: GetServerSideProps = async (context) => {
//     // Fetch data from external API
//     fetch(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${CONTRACT_ADDRESS}`)
//     .then((response) => response.json())
//     .then((data) => console.log(data.assets[0]));

//     // Pass data to the page via props
//     return { props: { data } }
//   }

export default MyEvents;
