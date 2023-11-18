"use client";
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
  const [view, setView] = useState("profiles");
  const [dashboardType, setDashboardType] = useState("dashboard");
  let {
    data: profiles,
    error: profileError,
    loading: loadingProfiles,
  } = useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers,
  }) as any;

  let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.TopCommented,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Audio],
      },
    },
  }) as any;

  let { data: publications, loading: loadingPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    },
  }) as any;

  profiles = profiles?.filter((p) => p.metadata?.picture?.optimized?.uri);

  publications = publications?.filter((p) => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true;
      return false;
    }
    return true;
  });

  return (
    <main
      className="
      px-6 py-14
      sm:px-10
    "
    >
      <div className="gap-10 items-center flex w-full">
        <div className=" left-10 top-20 opacity-75">
          <Image
            src="/images/hero-img.png"
            alt="Hero-Img"
            width={650}
            height={650}
          />
        </div>
        <div className="">
          <h1 className="text-5xl font-bold mt-3">
            Ripp your competitors off!!
          </h1>
          <p className="mt-4 max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            A platform to challenge your friends, family and enemies for some
            fitness goals.
          </p>
        </div>
      </div>
    </main>
  );
}
