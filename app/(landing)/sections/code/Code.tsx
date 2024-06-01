import { Button } from "@/components/ui/button";
import { PROJECTS } from "./Code.constants";
import { Tooltip } from "@/components/ui/tooltip";
import { GithubIcon, YoutubeIcon } from "lucide-react";
import { useMemo } from "react";
import { Grid, GridItem } from "@/components/landing/grid/Grid";

export const Code = () => {
  const items = useMemo(
    () =>
      PROJECTS.map(
        (talk): GridItem => ({
          id: talk.url,
          img: talk.img,
          url: talk.url,
          title: (
            <>
              <div>{talk.title}</div>
              {talk.subtitle && (
                <div className="text-sm text-foreground-contrast/70">
                  {talk.subtitle}
                </div>
              )}
            </>
          ),
          actions: (talk.github || talk.video) && (
            <div className="mb-2 px-2 w-full flex justify-end gap-2">
              {talk.github && (
                <Tooltip content="See on GitHub">
                  <Button variant="secondary" size="icon" asChild>
                    <a
                      href={talk.github}
                      target="_blank"
                      rel="noopener"
                      className="pointer-events-auto"
                    >
                      <GithubIcon className="h-[1.125rem] w-[1.125rem]" />
                    </a>
                  </Button>
                </Tooltip>
              )}
              {talk.video && (
                <Tooltip content="The Art of the Bodge">
                  <Button variant="secondary" size="icon" asChild>
                    <a
                      href={talk.video}
                      target="_blank"
                      rel="noopener"
                      className="pointer-events-auto"
                    >
                      <YoutubeIcon className="h-[1.125rem] w-[1.125rem]" />
                    </a>
                  </Button>
                </Tooltip>
              )}
            </div>
          ),
        })
      ),
    []
  );

  return <Grid items={items} />;
};
