"use client";
import { useAccount } from "wagmi";
import { useState } from "react";
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
} from "@lens-protocol/react-web";

import {
  Loader2,
  ListMusic,
  Newspaper,
  PersonStanding,
  Shapes,
  MessageSquare,
  Repeat2,
  Heart,
  Grab,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { useWeb3Modal } from "@web3modal/wagmi/react";

enum PublicationMetadataMainFocusType {
  Article = "ARTICLE",
  Audio = "AUDIO",
  CheckingIn = "CHECKING_IN",
  Embed = "EMBED",
  Event = "EVENT",
  Image = "IMAGE",
  Link = "LINK",
  Livestream = "LIVESTREAM",
  Mint = "MINT",
  ShortVideo = "SHORT_VIDEO",
  Space = "SPACE",
  Story = "STORY",
  TextOnly = "TEXT_ONLY",
  ThreeD = "THREE_D",
  Transaction = "TRANSACTION",
  Video = "VIDEO",
}

export default function Home() {
  // State / Props
  const { isConnected } = useAccount();

  // const [view, setView] = useState("profiles");
  // const [dashboardType, setDashboardType] = useState("dashboard");
  // let {
  //   data: profiles,
  //   error: profileError,
  //   loading: loadingProfiles,
  // } = useExploreProfiles({
  //   limit: LimitType.TwentyFive,
  //   orderBy: ExploreProfilesOrderByType.MostFollowers,
  // }) as any;

  // let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
  //   limit: LimitType.TwentyFive,
  //   orderBy: ExplorePublicationsOrderByType.TopCommented,
  //   where: {
  //     publicationTypes: [ExplorePublicationType.Post],
  //     metadata: {
  //       mainContentFocus: [PublicationMetadataMainFocusType.Audio],
  //     },
  //   },
  // }) as any;

  // let { data: publications, loading: loadingPubs } = useExplorePublications({
  //   limit: LimitType.TwentyFive,
  //   orderBy: ExplorePublicationsOrderByType.LensCurated,
  //   where: {
  //     publicationTypes: [ExplorePublicationType.Post],
  //   },
  // }) as any;

  // profiles = profiles?.filter((p) => p.metadata?.picture?.optimized?.uri);

  // publications = publications?.filter((p) => {
  //   if (p.metadata && p.metadata.asset) {
  //     if (p.metadata.asset.image) return true;
  //     return false;
  //   }
  //   return true;
  // });

  const { open } = useWeb3Modal();

  return (
    <main className=" bg-zinc-950 h-screen w-full flex">
      <div
        className="w-1/2 h-screen bg-cover bg-bottom"
        style={{ backgroundImage: "url(/images/bg-apefit.png)" }}
      >
        <div className="p-8">
          <Image
            alt="Apefit Logo"
            width={616}
            height={240}
            className="mx-auto block mt-72"
            src="/images/apefit-logo.svg"
          />
        </div>
      </div>
      <div className="w-1/2">
        <div className="p-8 w-full h-screen">
          {isConnected ? (
            <div>
              <h1 className="text-4xl mb-2 text-white font-bold uppercase">Create Your Apefit Challenge</h1>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-screen">
            <div className="text-center">
              <h1 className="text-4xl mb-2 text-white font-bold uppercase">Start Here</h1>
              <p className="text-xl mb-8 text-zinc-300">Getting swole starts by connecting...</p>
              <Button onClick={() => open()}>
                Connect Wallet
              </Button>
            </div>
            </div>
          )}
        </div>
      </div>
    </main>
    // <main
    //   className="
    //   px-6 py-14
    //   sm:px-10
    // "
    // >
    //   <div className="gap-10 items-center flex w-full">
    //     <div className=" left-10 top-20 opacity-75">
    //       <Image
    //         src="/images/hero-img.png"
    //         alt="Hero-Img"
    //         width={650}
    //         height={650}
    //       />
    //     </div>
    //     <div className="">
    //       <h1 className="text-5xl font-bold mt-3">
    //         Ripp your competitors off!!
    //       </h1>
    //       <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
    //         A platform to challenge your friends, family and enemies for some
    //         fitness goals.
    //       </p>
    //     </div>
    //   </div>
    // </main>
  );
}
