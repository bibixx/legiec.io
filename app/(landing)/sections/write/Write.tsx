import { ARTICLES } from "./Write.constants";
import { useMemo } from "react";
import { Grid, GridItem } from "@/components/landing/grid/Grid";

export const Write = () => {
  const items = useMemo(
    () =>
      ARTICLES.map(
        (talk): GridItem => ({
          id: talk.url,
          img: talk.img,
          url: talk.url,
          title: <div>{talk.title}</div>,
        })
      ),
    []
  );

  return <Grid items={items} />;
};
