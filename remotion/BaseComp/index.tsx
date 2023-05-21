import { HTMLAttributes } from "react";
import {
  AbsoluteFill,
  Audio,
  Series,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import * as z from "zod";
import First from "./sequences/SlideInContentFromBottomWithGrid";
import * as interFont from "@remotion/google-fonts/Inter";
import SlidingDoors from "./components/SlidingDoors";
import TextFadeInFromBottom from "./components/TextFadeInFromBottom";
import GridPattern from "./components/GridPattern";
import AllThingsWeAddedSequence from "./sequences/AllOtherStuff";
import FadeOutExit from "./components/FadeOutExit";
import Star6Sided from "./assets/star6Sided";
import Star4Sided from "./assets/Star4Sided";
import clsx from "clsx";
import ConditionalWrap from "./components/ConditionalWrap";
import SlideExitToTop from "./components/SlideExitToTop";

export const baseCompSchema = z.object({
  repositorySlug: z.string(),
  releaseTag: z.string(),
  topChanges: z.array(z.object({ title: z.string(), description: z.string() })),
  allChanges: z.array(z.string()),
});

interFont.loadFont("normal", {
  weights: ["400", "500", "600", "700", "800", "900"],
});

const colorSetClasses = [
  ["text-white", "bg-sky-500"],
  ["text-white", "bg-teal-600"],
  ["text-white", "bg-indigo-500"],
  ["text-white", "bg-blue-500"],
  ["text-white", "bg-purple-600"],
  ["text-white", "bg-fuchsia-600"],
] satisfies [string, string][];

const BaseComp = ({
  repositorySlug,
  releaseTag,
  topChanges,
  allChanges,
}: z.infer<typeof baseCompSchema> & HTMLAttributes<HTMLDivElement>) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill className="bg-black">
      <Audio
        src="https://audiocdn.epidemicsound.com/ES_ITUNES/Zy0ALC_Ganja/ES_Ganja.mp3"
        startFrom={20 * fps}
        volume={
          // Slowly fade out
          frame > durationInFrames - fps * 5
            ? 1 -
              interpolate(
                frame,
                [durationInFrames - fps * 5, durationInFrames],
                [0, 1]
              ) **
                1.5
            : 1
        }
      />
      <Series>
        <Series.Sequence
          durationInFrames={fps * 1.5}
          className="text-white"
          name="Vercel/NextJS"
        >
          <SlidingDoors>
            <First className="bg-black">
              <h1 className="text-9xl font-black">{repositorySlug}</h1>
            </First>
          </SlidingDoors>
        </Series.Sequence>

        <Series.Sequence
          durationInFrames={fps * 1.5}
          offset={-20}
          className="text-white"
          name={"13.4.2"}
        >
          <SlidingDoors>
            <First className="bg-blue-500">
              <h1 className="text-9xl font-black">{releaseTag}</h1>
            </First>
          </SlidingDoors>
        </Series.Sequence>

        <Series.Sequence
          durationInFrames={fps * 3}
          offset={-20}
          className="text-black"
          name={"Vercel/NextJS | 13.4.2"}
        >
          <SlidingDoors>
            <First className="bg-white text-center">
              <div className="flex items-center justify-center gap-10 flex-col">
                <h1 className="text-9xl font-black">{repositorySlug}</h1>
                <h1 className="text-5xl font-bold">{releaseTag}</h1>
              </div>
            </First>
          </SlidingDoors>
        </Series.Sequence>

        <Series.Sequence
          durationInFrames={fps * 3}
          offset={-20}
          className="text-white"
          name={"Here are the top changes!"}
        >
          <SlidingDoors>
            <First className="bg-black text-center">
              <Star6Sided />
              <Star4Sided />
              <h1 className="text-9xl font-black">
                {"Here are the top changes!"}
              </h1>
            </First>
          </SlidingDoors>
        </Series.Sequence>

        {topChanges.map((change, i) => (
          <Series.Sequence
            durationInFrames={fps * 4}
            offset={-20}
            key={i}
            className={clsx(
              colorSetClasses[i % colorSetClasses.length][0],
              "z-20"
            )}
            name={`Top Changes - ${i + 1}`}
          >
            <ConditionalWrap
              condition={
                // Last one only
                i === topChanges.length - 1
              }
              wrap={(children) => <SlideExitToTop>{children}</SlideExitToTop>}
            >
              <SlidingDoors>
                <GridPattern
                  className={clsx(
                    colorSetClasses[i % colorSetClasses.length][1],
                    "text-center"
                  )}
                >
                  <Series>
                    <Series.Sequence durationInFrames={fps * 4}>
                      <TextFadeInFromBottom>
                        <div className="flex items-center justify-center rounded-full bg-white text-black aspect-square h-[250px] w-[250px]">
                          <h1 className="text-9xl font-black leading-[100%]">
                            {i + 1}
                          </h1>
                        </div>
                      </TextFadeInFromBottom>
                    </Series.Sequence>
                    <Series.Sequence
                      durationInFrames={fps * 3}
                      offset={-fps * 3}
                    >
                      <TextFadeInFromBottom
                        noExit
                        className="gap-10 flex flex-col items-center -mb-20"
                      >
                        <h1 className="text-8xl font-black">{change.title}</h1>
                        <p className="text-4xl font-medium opacity-60 leading-normal w-3/4">
                          {change.description}
                        </p>
                      </TextFadeInFromBottom>
                    </Series.Sequence>
                  </Series>
                </GridPattern>
              </SlidingDoors>
            </ConditionalWrap>
          </Series.Sequence>
        ))}

        <Series.Sequence
          durationInFrames={fps * 5}
          offset={-30}
          className="z-0"
          name={"Scrolling all things changed list"}
        >
          <AllThingsWeAddedSequence list={allChanges} />
        </Series.Sequence>

        <Series.Sequence
          durationInFrames={fps * 3}
          offset={-30}
          className="z-0"
          name="Checkout the latest release"
        >
          <Series.Sequence
            durationInFrames={fps * 1.5}
            offset={-20}
            className="text-white"
          >
            <SlidingDoors>
              <First className="bg-blue-500 text-white flex flex-col items-center justify-center text-center">
                <h1 className="text-9xl font-black">
                  Checkout the latest release
                </h1>
                <p className="text-5xl mt-10 text-white/70">On GitHub</p>
              </First>
            </SlidingDoors>
          </Series.Sequence>
        </Series.Sequence>

        <Series.Sequence
          durationInFrames={fps * 3}
          offset={-20}
          className="text-black"
          name={"Vercel/NextJS | 13.4.2"}
        >
          <FadeOutExit>
            <SlidingDoors>
              <First className="bg-white text-center">
                <div className="flex items-center justify-center gap-10 flex-col">
                  <h1 className="text-9xl font-black">{repositorySlug}</h1>
                  <h1 className="text-5xl font-bold">{releaseTag}</h1>
                </div>
              </First>
            </SlidingDoors>
          </FadeOutExit>
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export default BaseComp;
