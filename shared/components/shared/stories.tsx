"use client";

import { Api } from "@/shared/services/api-client";
import { FC, useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { IStory } from "@/shared/services/stories";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { useClickAway } from "react-use";
import { useScrollLock } from "@/shared/hooks";
import Container from "./container";
import { Skeleton } from "../ui";

interface Props {
  className?: string;
}

const Stories: FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();
  const ref = useRef(null);

  useScrollLock(open);

  useClickAway(ref, () => {
    setOpen(false);
  });

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <Container className={cn("flex items-center justify-between gap-2 my-10", className)}>
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-[200px] h-[250px]"
          />
        ))}

      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          onClick={() => onClickStory(story)}
          className="p-0 m-0 border-none bg-transparent"
        >
          <img
            className="rounded-md cursor-pointer"
            height={250}
            width={200}
            src={story.previewImageUrl}
            alt="Story preview"
          />
        </button>
      ))}

      {open && (
        <div className="fixed inset-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
          <div
            ref={ref}
            className="relative"
            style={{ width: 520 }}
          >
            <button
              type="button"
              className="absolute -right-10 -top-5 z-30"
              onClick={() => setOpen(false)}
            >
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>

            <ReactStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
              defaultInterval={3000}
              width={520}
              height={800}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Stories;
