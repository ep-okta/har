"use client";

import HarContainer from "@/components/har/har-container";
import { ModeToggle } from "@/components/mode-toggle";
import { FontSizeToggle } from "@/components/font-size-toggle";
import { SplitViewToggle } from "@/components/split-view-toggle";
import { GitHubButton } from "@/components/github-button";

export default function Home() {
  /*
   * We keep the main component in /components/har to make it compatible with
   * the Toolbox project layout.
   */
  return (
    <div className="min-h-screen px-8 py-4">
      <div className="flex flex-col h-[calc(100vh-4rem)] gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold font-sensation">HAR Tool</h1>
            <p className="text-sm text-muted-foreground mt-1">
              View and analyze HAR files
            </p>
          </div>
          <div className="justify-self-end flex gap-2">
            <SplitViewToggle />
            <FontSizeToggle />
            <GitHubButton />
            <ModeToggle />
          </div>
        </div>
        <HarContainer />
      </div>
    </div>
  );
}
