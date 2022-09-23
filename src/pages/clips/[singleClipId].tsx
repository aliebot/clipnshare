import { HeartIcon } from "@heroicons/react/outline";
import {HeartIcon as SolidHeartIcon} from "@heroicons/react/solid"
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Comment from "../../components/Comment";
import Navbar from "../../components/Navbar";
import { trpc } from "../../utils/trpc";

const CreateClip: NextPage = () => {
  const router = useRouter();
  const clipID = router.query.singleClipId as string;
  const clip = trpc.useQuery([
    "clip.get-single-clip",
    {
      id: clipID,
    },
  ]);
  const [liked, setLiked] = useState<boolean>(false);
  const handledLikeClicked = () => {
    setLiked(!liked);

  };
  return (
    <div className="bg-white dark:bg-white h-screen">
      <Navbar />
      <main className="mx-[18px] my-10 2xl:mx-64 sm:mx-[87px]">
        <div>
          {" "}
          <video
            controls
            className="flex w-full"
            src={`https://d1rdwsr9nm2ku1.cloudfront.net/${clip.data?.url}`}
          />
          <h1 className="text-2xl dark:text-black font-bold mt-4">
            {clip.data?.title}
          </h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                src={clip.data?.user.image as string}
                width="36"
                height="36"
                alt="/profile.jpg"
                className="w-6 h-6 rounded-xl"
              />
              <p className="ml-2 text-sm">
                {clip.data?.user.name as string} •{" "}
                {clip.data?.createdAt.getMonth() +
                  "-" +
                  clip.data?.createdAt.getDate() +
                  "-" +
                  clip.data?.createdAt.getFullYear()}{" "}
                • {clip.data?.viewCount} views
              </p>
            </div>

            <button className="flex inline-block text-sm items-center"
                  onClick={handledLikeClicked}>
              {clip.data?.likeCount}{" "}
              {liked ? (
                <HeartIcon
                  width="14"
                  height="14"
                />
              ) : (
                <SolidHeartIcon width="14" height="14" fill="#ef4444"/>
              )}
            </button>
          </div>
        </div>
        <Comment />
      </main>
    </div>
  );
};

export default CreateClip;
