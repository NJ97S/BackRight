import { ChangeEvent, useState } from "react";

import axios from "axios";

import { postSignUpPreSignedImageUrl } from "../apis/api";

const useGetProfileImage = () => {
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgKey, setImgKey] = useState<string | null>(null);

  const handleSignUpProfileImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setUploadedImgUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(imageFile);

    try {
      const { profileImgKey, profileImgPreSignedUrl } =
        await postSignUpPreSignedImageUrl(imageFile.name);

      await axios.put(profileImgPreSignedUrl, imageFile, {
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      setImgKey(profileImgKey);
    } catch (error) {
      // TODO: 이미지 업로드 에러 처리
    }
  };

  const handleEditProfileImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      return;
    }

    const imageFile = e.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setUploadedImgUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(imageFile);

    setImgFile(imageFile);
  };

  return {
    handleSignUpProfileImageChange,
    handleEditProfileImageChange,
    uploadedImgUrl,
    imgFile,
    imgKey,
  };
};

export default useGetProfileImage;
