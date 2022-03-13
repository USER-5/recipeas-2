import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import { FC, useState } from "react";

type Props = {
  onChange: (id: string) => void;
  value?: string | null;
};

const UploadImage: FC<Props> = ({ onChange, value }) => {
  // use image in-progress while processing
  const [procImgUrl, setProcImgUrl] = useState<string>();

  const selectedFiles = async (files: File[]) => {
    setProcImgUrl(URL.createObjectURL(files[0]));
    let formData = new FormData();
    const options = {
      maxSizeMB: 5,
    };
    try {
      const file = await imageCompression(files[0], options);
      formData.append("file", file);
      const response = await fetch("/api/image", {
        body: formData,
        method: "POST",
      });
      if (response.ok) {
        const id = await response.text();
        onChange(id);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Dropzone
      onDrop={selectedFiles}
      accept={IMAGE_MIME_TYPE}
      className="my-6"
      loading={!!procImgUrl}
      onReject={() =>
        alert(
          "Incompatible filetype. Sometimes clicking (rather than drag & drop) works better."
        )
      }
    >
      {() => (
        <div className="m-auto">
          {procImgUrl || value ? (
            <>
              {value && (
                // this weirdness lets us quietly swap-out the local and hosted images
                <div
                  className={`max-w-full max-h-80 relative aspect-[4/3] m-auto rounded-sm ${
                    procImgUrl ? "invisible max-h-0" : ""
                  }`}
                >
                  <Image
                    alt="The uploaded image"
                    src={"/uploaded/" + value}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm"
                    onLoadingComplete={() => setProcImgUrl(undefined)}
                  ></Image>
                </div>
              )}
              {procImgUrl && (
                <div className="max-w-full max-h-80 relative aspect-[4/3] m-auto rounded-sm">
                  <Image
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm"
                    alt="The selected image"
                    src={procImgUrl}
                  ></Image>
                </div>
              )}
              <span className="text-gray-700 w-full text-center inline-block">
                Want to change the picture? Drag a different image or click
                again.
              </span>
            </>
          ) : (
            <h2 className="text-center m-6">
              Drag image here or click to select files
            </h2>
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default UploadImage;
