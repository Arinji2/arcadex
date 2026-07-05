"use client";
import { Avatar, Style } from "@dicebear/core";
import thumbs from "@dicebear/styles/thumbs.json" with { type: "json" };
import Image from "next/image";
import { useMemo } from "react";

const style = new Style(thumbs);

export default function UserAvatar({ seed }: { seed: string }) {
  const avatar = useMemo(() => {
    return new Avatar(style, {
      seed,
      size: 128,
    }).toDataUri();
  }, [seed]);

  return <Image src={avatar} fill alt="Avatar" />;
}
