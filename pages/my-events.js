import { useEffect, useState } from "react";
import Image from "next/image";
import { useAccount, useProvider, useContract, useSigner } from "wagmi";
import contractInterface from "../src/utils/abi.json";
import { ConnectButton, connectorsForWallets } from "@rainbow-me/rainbowkit";
import Layout from "../src/components/Layout";
import { CONTRACT_ADDRESS } from "../web3-constants";

const MyEventss = () => {
  const [isUserCheckedIn, setIsUserCheckedIn] = useState(false);
  const [addressSignedIn, setAddressSignedIn] = useState("");
  const [tickets, setTickets] = useState([]);

  const [isLoadingInfo, setIsLoadingInfo] = useState(true);

  const ButtonStyle = `
    bg-gradient-200 hover:bg-gradient-250 text-white py-2 px-4 rounded shadow mt-2 disabled:bg-gradient-100
    `;

  const imageStyle = {
    borderRadius: "12px",
    margin: "0",
  };

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

  const handleCheckIn = async (tokenId) => {
    if (!addressSignedIn) return;
    try {
      console.log("ticket ID to be checked in: ", tokenId);
      console.log("... checking in");
      let checkInTxn = await contractSigner.checkIn(tokenId);
      await checkInTxn.wait();
      setIsUserCheckedIn(true);
      console.log("complete!");
      console.log(`TRANSACTION: https://rinkeby.etherscan.io/tx/${checkInTxn.hash}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const checkIfUserHoldsTicket = async () => {
      try {
        // console.log(" 🧑‍💻 🧑‍💻 🧑‍💻 🧑‍💻 🧑‍💻 Reading the tickets for : ", addressSignedIn);
        let userTickets = await contractSigner.getUserTickets();
        // console.log("owned tickets: 👥👥👥👥👥 ", userTickets.length);
        let allTokensInfo;
        if (userTickets.length > 0) {
          allTokensInfo = await Promise.all(
            userTickets.map(async (tokenId) => {
              const fetchedTokenURI = await contractSigner.tokenURI(tokenId);
              const base64string = fetchedTokenURI.substring(
                fetchedTokenURI.indexOf(",") + 1
              );

              // decode base64 string, remove header
              let decodedObject = JSON.parse(atob(base64string));
              console.log("decodedObject: ", decodedObject);
              console.log(" IMAGE 🅿️ 🅿️ 🅿️ ", decodedObject.image);
              if (
                decodedObject.image ===
                "ipfs://QmbeECCAZnZdkdF2yVu23DQHsu4uc3WSnsMS1gnwP4j8L3"
              ) {
                decodedObject.image =
                  "https://ipfs.infura.io/ipfs/QmbeECCAZnZdkdF2yVu23DQHsu4uc3WSnsMS1gnwP4j8L3";
              }
              decodedObject.tokenId = parseInt(tokenId);

              return decodedObject;
            })
          );
        }

        if (allTokensInfo) {
          console.log(" ALL TOKENS INFO: ");
          console.log(allTokensInfo);
          setTickets(allTokensInfo);
        }
        setIsLoadingInfo(false);
      } catch (e) {
        console.log(e);
      }
    };
    if (contractSigner) {
      checkIfUserHoldsTicket();
    }
  }, [contractSigner]);

  useEffect(() => {
    if (!address) return;
    const checkAddress = async () => {
      setAddressSignedIn(address);
    };

    checkAddress();
  }, [address]);

  //   useEffect(() => {
  //     if (!address) return;
  //     console.log(address);

  //     const openSeaQuery = `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${CONTRACT_ADDRESS}`;

  //     console.log(" QUERY 🦭", openSeaQuery);
  //     fetch(
  //       `https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${CONTRACT_ADDRESS}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(" 🥰🥰🥰🥰 TOTAL IS: ", data.assets.length);

  //         console.log(" 🥰🥰🥰🥰 DATA: ", data);

  //         if (data.assets?.length) {
  //           setTickets(data.assets);
  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   }, [address]);

  if (isLoadingInfo) {
    return (
      <Layout title="my events | m3mento">
        <div className="flex justify-center mt-16">
          <div>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (tickets.length === 0) {
    return (
      <Layout title="my events | m3mento">
        <div className="flex justify-center mt-16">
          <div>You dont have tickets 🥲</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="my events | m3mento">
      <div className="flex justify-center mt-16">
        <div>
          <div className="text-4xl text-center mb-8">My Events</div>
          <div className="rounded-lg flex flex-wrap p-4 md:p-8 text-center mb-32 justify-center md:justify-between md:min-w-[800px]">
            {tickets.length > 0 &&
              address &&
              tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center mx-2 md:mx-4 xl:mx-12 mb-6 md:mb-20"
                >
                  <h1 className="text-white font-semibold text-xl mb-2">
                    {ticket.name}
                  </h1>
                  <h1 className="font-thin mb-2 text-gray-400 text-xl">
                    Ticket # 00{ticket.tokenId}
                  </h1>
                  <h2 className="text-white font-semibold text-sm mb-2 px-2 max-w-[200px]">
                    {ticket.description}
                  </h2>
                  <Image
                    src={ticket.image}
                    width={300}
                    height={500}
                    alt={ticket.description}
                    style={imageStyle}
                  />
                  {ticket.attributes[0].value === "false" ? (
                    <button
                      className={ButtonStyle}
                      onClick={() => handleCheckIn(ticket.tokenId)}
                    >
                      Check In
                    </button>
                  ) : (
                    <div className="opacity-80">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 my-2
                      px-8 py-2 rounded-lg cursor-default select-none tracking-wide text-sm"
                      >
                        USED
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyEventss;
