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
        <div className="object-fill h-screen z-20 w-full">
          <div className="flex sm:flex-row flex-col md:p-10 p-5 md:justify-center justify-end h-full">
            <div className="header-text-container">
              <h1 className="md:text-5xl text-4xl mb-3 header-text">Capture the nostalgia, forever.</h1>
              <p className="md:text-xl text-md mb-5 sub-text">
                Mint, sell, and collect concert tickets from your favorite artists. Get rewarded for being a fan.
              </p>
              <div className="flex items-center mt-20 md:mt-0">
                <button className="hover:bg-gradient-100 bg-gradient-250 font-bold py-2 px-4 rounded-full mr-14 mint-btn">
                  <Link href="/events/web3-events/nights-and-weekends-demo-day">
                    <a>Mint Tickets</a>
                  </Link>
                </button>
                <div>
                  <Link href="/contact-us">
                    <a className="learn-link">Learn More</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex tickets">
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
