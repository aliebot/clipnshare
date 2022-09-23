import { HeartIcon, ClipboardIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { isContext } from "vm";
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
  const [successToast, setSuccessToast] = useState<boolean>(false);
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const counter = useRef(0);
  const handledLikeClicked = async () => {
    setLiked(!liked);
  };

  function successCopyToast() {
    return (
      <div className="max-w-xs bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700 absolute" role="alert">
  <div className="flex p-4">
    <div className="flex-shrink-0">
      <svg className="h-4 w-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
    </div>
    <div className="ml-3">
      <p className="text-sm text-gray-700 dark:text-gray-400">
        Copied link to the clip.
      </p>
    </div>
  </div>
</div>
    );
  }
  return (
    <div className="bg-white dark:bg-white h-screen">
      <Head>
        <title>clipnshare | {clip.data?.title}</title>
        <meta
          property="og:url"
          content={`https://d1rdwsr9nm2ku1.cloudfront.net/${clip.data?.url}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={clip.data?.title} />
      </Head>
      <Navbar />
      <main className="mx-[18px] my-10 2xl:mx-64 sm:mx-[87px]">
        <div>
          <video
            controls
            className="flex w-full"
            src={`https://d1rdwsr9nm2ku1.cloudfront.net/${clip.data?.url}`}
          />
          <div className="flex items-center justify-between">
            <h1 className="text-2xl dark:text-black font-bold mt-4">
              {clip.data?.title}
            </h1>

            <button
              onClick={async () => {
                const url =
                  "https://d1rdwsr9nm2ku1.cloudfront.net/" + clip.data?.url;
                navigator.clipboard.writeText(url);
                setSuccessToast(true);
                await sleep(4000);
                setSuccessToast(false);
                console.log(url);
              }}
              className="inline-flex items-center justify-center px-4 py-2 mt-4 text-sm text-center text-white bg-indigo-500 rounded-md shadow-sm cursor-pointer hover:bg-indigo-600 focus:ring-indigo-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                />
              </svg>
              <p className="relative ml-0.5">Copy link</p>
            </button>
          </div>
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

            <button
              className="flex inline-block text-sm items-center"
              onClick={handledLikeClicked}
            >
              {clip.data?.likeCount}{" "}
              {liked ? (
                <HeartIcon width="14" height="14" />
              ) : (
                <SolidHeartIcon width="14" height="14" fill="#ef4444" />
              )}
            </button>
          </div>
        </div>
        {successToast && <div className="flex justify-center my-4">{successCopyToast()}</div>}
        <Comment />
      </main>
    </div>
  );
};

export default CreateClip;