"use client";

import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
// import "@uploadthing/react/styles.css";

interface Props {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}
export const FileUpload = ({ onChange, value, endpoint }: Props) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
        //   fill
          width={100}
          height={100}
          src={value}
          alt="Upload"
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
          title="Remove file"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadButton
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        onChange(res?.[0]?.ufsUrl);
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        console.error(`ERROR! ${error.message}`);
      }}
      endpoint={endpoint}
      //   onClientUploadComplete={(res) => {
      //     onChange(res?.[0].fileUrl);
      //   }}
      //   onUploadError={(error: Error) => {
      //     console.error(error);
      //   }}
    />
  );
};
