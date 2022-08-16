import type { NextPage } from "next";
import { useEffect, useState } from "react";
import contractInterface from "../src/utils/abi.json";
import Link from "next/link";
import { useAccount, useProvider, useContract } from "wagmi";
import tilted1 from "../src/img/tilted-1.svg";
import tilted2 from "../src/img/tilted-2.svg";
import tilted3 from "../src/img/tilted-3.svg";
import Layout from "../src/components/Layout";
import Image from "next/image";
import { CONTRACT_ADDRESS } from "../web3-constants";

const Home = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { address } = useAccount();

  const provider = useProvider();

  const contractProvider = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractInterface.abi,
    signerOrProvider: provider,
  });

  const checkIfAdmin = async () => {
    if (!contractProvider) return;
    try {
      const ownerOfContract = await contractProvider.owner();
      if (address === ownerOfContract) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkIfAdmin();
  });
  return (
    <Layout title="m3mento">
      <div className="bg-hero-cover bg-cover">
        <div className="object-fill h-screen z-20 w-full -mt-20">
          <div className="flex p-10 justify-center h-full">
            <div className="mt-80 header-text-container">
              <h1 className="text-5xl mb-3 header-text">Capture The Nostalgia Forever</h1>
              <p className="text-xl mb-5 sub-text">
                The best place to be a fan. Where fans can mint, sell, and collect their concert tickets
              </p>
              <div className="flex items-center">
                <button className="hover:bg-gradient-100 bg-gradient-250 font-bold py-2 px-4 rounded-full mr-14 mint-btn">
                  <Link href="/events/web3-events/nights-and-weekends-demo-day">
                    <a>Mint Tickets</a>
                  </Link>
                </button>
                <div>
                  <Link href="/about">
                    <a className="learn-link">Learn More</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex mt-80">
              <Image src={tilted1} alt="ticket" className="" />
              <Image src={tilted2} alt="ticket" className="" />
              <Image src={tilted3} alt="ticket" className="" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
