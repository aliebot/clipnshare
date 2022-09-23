import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import { trpc } from "../../utils/trpc";

const CreateClip: NextPage = () => {
  // Create Video Form
  const [title, setTitle] = useState<string>("");
  const [isPublic, setIsPublic] = useState<boolean>(false);

  // video upload

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoAsset, setVideoAsset] = useState<any>();
  const [wrongFileType, setWrongFileType] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>();
  const [videoSrc, setVideoSrc] = useState("");
  const videoRef = useRef<any>();

  useEffect(() => {
    const src = URL.createObjectURL(new Blob([videoAsset]));
    setVideoSrc(src);
  }, [videoAsset]);

  // Next-Auth
  const { data: session } = useSession();
  const router = useRouter();
  {
    /* User shouldn't be able to come to this page due to Upload button not being visible for unauthenticated users.
    But if for some reason they do, redirect them to the home page. */
  }
  if (!session && process.browser) {
    router.push("/");
  }

  const addClip = trpc.useMutation(["clip.upload-clip"], {
    onSuccess: () => {
      router.push("/");
    },
    onError: (data) => {
      setSubmitError(data.message);
    },
  });

  async function handleSubmit(e: any) {
    e.preventDefault();

    // @ts-ignore
    const { data } = await axios.get(
      `/api/aws/preSignedUrl?fileType=${videoAsset.type}?userId=${session?.user?.id}`
    );
    const { uploadUrl, key } = data;
    await axios.put(uploadUrl, videoAsset);

    addClip.mutate({
      title,
      public: isPublic,
      fileName: key,
      userId: session?.user?.id!
    });
  }
  return (
    <div className="bg-white dark:bg-white h-screen">
      <Navbar />
      <main className="mx-[18px] my-10 2xl:mx-64 sm:mx-[87px]">
        <h2 className="text-2xl dark:text-black font-bold">Upload a Clip</h2>
        <p className="text-sm text-gray-500">
          Clips that you upload can be either public or private, but easily
          shareable no matter what.
        </p>
        <p className="mt-4 mb-2 text-xs text-gray-500">
          Upload either MP4, WEBM, or OFF file types (50MB max)
        </p>
        <form id="upload-clip" onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <div className="flex items-center justify-center w-full cursor-pointer">
              {isLoading ? (
                <p className="flex flex-col items-center justify-center h-full pt-5">
                  Uploading...
                </p>
              ) : (
                <>
                  {!videoAsset ? (
                    <label className="flex flex-col w-full border-4 border-indigo-300 border-dashed h-60 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center h-full pt-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="dark:text-black">Drop video here or</p>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 hover:underline">
                          Attach a file
                        </p>
                      </div>
                      <input
                        type="file"
                        id="file"
                        className="opacity-0"
                        name="file"
                        ref={videoRef}
                        onChange={(e) => setVideoAsset(e.target.files![0])}
                      />
                    </label>
                  ) : (
                    <div>
                      <video src={videoSrc} controls className=""></video>
                    </div>
                  )}
                </>
              )}
            </div>
            {wrongFileType && (
              <p className="w-full text-base font-semibold text-red-400 ">
                Wrong file type. Must be mp4, webm, or ogg
              </p>
            )}
            {submitError && (
              <p className="w-full text-base font-semibold text-red-400 ">
                {submitError}
              </p>
            )}
            <div className="inline-flex items-center w-full mt-3">
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="title of your amazing clip"
                className="block w-full bg-gray-100 border-transparent text-black rounded-md focus:border-gray-500 focus:bg-white focus:ring-0"
              />
              <div className="inline-flex items-center pl-2 ">
                <label className="pr-1">Public: </label>
                <input
                  type="checkbox"
                  className="text-indigo-500 focus:ring-indigo-600"
                  checked={isPublic}
                  onChange={(e) => {
                    const { checked } = e.target;
                    setIsPublic(checked);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full px-4 py-2 mt-6 text-sm text-center text-white bg-indigo-500 rounded-md shadow-sm cursor-pointer hover:bg-indigo-600 focus:ring-indigo-800 focus:outline-none"
            >
              Upload
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateClip;

// <form onSubmit={handleSubmit()}>
//   {error && <p>{error.message}</p>}
//   <input
//     type='text'
//     placeholder='your video title'
//     {...register('title')}
//   />{' '}
//   <br />
//   <input type='text' placeholder='your video url' {...register('url')} />
//   <br />
//
//   <button>Create Video</button>
// </form>;
