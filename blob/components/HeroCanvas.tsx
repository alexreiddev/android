"use client";

import { useCallback, useRef } from "react";
import { BlobScene, type BlobSceneProps } from "./BlobScene";

/** Mounts the interactive scene and fades out the static SSR blobs once it paints. */
export function HeroCanvas(props: Omit<BlobSceneProps, "onReady">) {
  const marker = useRef<HTMLSpanElement>(null);
  const onReady = useCallback(() => {
    const host = marker.current?.closest<HTMLElement>("[data-scene]");
    if (host) host.dataset.canvas = "ready";
  }, []);
  return (
    <>
      <span ref={marker} hidden />
      <BlobScene {...props} onReady={onReady} />
    </>
  );
}
