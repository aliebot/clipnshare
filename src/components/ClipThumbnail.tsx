import { HeartIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

import { TClipThumbnail } from "../types/clip";
import { trpc } from "../utils/trpc";

// cloudfront:

export default function ClipThumbnail({ clip }: { clip: TClipThumbnail }) {
  return (
    <a href={`/clips/${clip.id}`}>
      <div className="sm:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 md:hover:scale-105 ease-in duration-100 hover:cursor-pointer">
        <video className="rounded-t-lg w-full h-full">
          <source src={`https://d1rdwsr9nm2ku1.cloudfront.net/${clip.url}`} />
        </video>
        <div className="p-3">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {clip.title}
          </h5>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                src={clip.user.image}
                width="36"
                height="36"
                alt="/profile.jpg"
                className="w-6 h-6 rounded-xl"
              />
              <p className="ml-2 text-sm">{clip.user.name}</p>
            </div>
            <p className="flex items-center text-sm">
              {clip.likeCount} <HeartIcon width="14" height="14" />{" "}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
{
  /* <div className="">
      <video>
        <source src={`https://d1rdwsr9nm2ku1.cloudfront.net/${clip.url}`} />
      </video>
    </div> */
}
