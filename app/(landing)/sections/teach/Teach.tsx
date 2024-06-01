import { TALKS } from "./Teach.constants";
import { useMemo } from "react";
import { Grid, GridItem } from "@/components/landing/grid/Grid";

export const Teach = () => {
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
            </>
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
