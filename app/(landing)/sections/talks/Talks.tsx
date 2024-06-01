import { Button } from "@/components/ui/button";
import { TALKS } from "./Talks.constants";
import { Tooltip } from "@/components/ui/tooltip";
import { FileTextIcon, PlayIcon, YoutubeIcon } from "lucide-react";
import { useMemo } from "react";
import { Grid, GridItem } from "@/components/landing/grid/Grid";

export const Talks = () => {
  const items = useMemo(
    () =>
      TALKS.map(
        (talk): GridItem => ({
          id: talk.url,
          img: talk.img,
          url: talk.url,
          title: (
            <>
              <div className="sr-only">{talk.title}</div>
              <div>
                <span className="sr-only">Location: </span>
                {talk.location}
              </div>
              <div className="text-sm text-foreground-contrast/70">
                <span className="sr-only">Date: </span>
                {formatDate(talk.date)}
              </div>
            </>
          ),
          actions: (talk.video || talk.file) && (
            <div className="mb-2 px-2 w-full flex justify-end gap-2">
              {talk.video && (
                <Tooltip
                  content={
                    talk.video.includes("youtube")
                      ? "Watch on YouTube"
                      : "Watch recording"
                  }
                >
                  <Button variant="secondary" size="icon" asChild>
                    <a
                      href={talk.video}
                      target="_blank"
                      rel="noopener"
                      className="pointer-events-auto"
                    >
                      {talk.video.includes("youtube") ? (
                        <YoutubeIcon className="h-[1.125rem] w-[1.125rem]" />
                      ) : (
                        <PlayIcon className="h-[1.125rem] w-[1.125rem] fill-foreground" />
                      )}
                    </a>
                  </Button>
                </Tooltip>
              )}
              {talk.file && (
                <Tooltip
                  content={`Download as ${mapFilePathToExtension(talk.file)}`}
                >
                  <Button variant="secondary" size="icon" asChild>
                    <a
                      href={talk.file}
                      target="_blank"
                      rel="noopener"
                      className="pointer-events-auto"
                    >
                      <FileTextIcon className="h-5 w-5" />
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

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

const extensionMap = {
  ".pdf": "PDF",
  ".pptx": "PowerPoint",
  ".ppt": "PowerPoint",
};

function mapFilePathToExtension(path: string) {
  for (const [extension, name] of Object.entries(extensionMap)) {
    if (path.endsWith(extension)) {
      return name;
    }
  }

  return "file";
}
