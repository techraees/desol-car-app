"use client";

import { useRef, useState } from "react";
import { Flex, Box, Input, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import ErrorMessage from "@/components/ErrorMessage";

const ImageUpload = ({
  onImageChange,
  errors,
  setClearImageError,
  images,
  setImages,
}: {
  onImageChange: any;
  errors: string | null;
  setClearImageError: any;
  images: File[];
  setImages: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files);
      setImages([...images, ...newImages]);
      onImageChange(newImages);
      setClearImageError(null);
    }
  };

  const handleBoxClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <>
      <Flex direction="row" align="start" gap={2} wrap={"wrap"} className="p-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-[100px] h-[100px] overflow-hidden"
          >
            <IconButton
              aria-label="Remove Image"
              icon={<CloseIcon className="text-[12px] p-0.5" />}
              size="xxs"
              position="absolute"
              top={0}
              right={0}
              onClick={() => handleRemoveImage(index)}
              className="hidden"
            />
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${index + 1}`}
              width="100%"
              height="100%"
            />
          </div>
        ))}

        <Box
          w="100px"
          h="100px"
          borderRadius="md"
          cursor="pointer"
          onClick={handleBoxClick}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={`bg-[#efefef9c] ${
            errors && "border border-[red] border-solid"
          }`}
        >
          <span className="text-center text-[12px] text-nowrap">
            + Add Pictures
          </span>
        </Box>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          ref={inputRef}
          style={{ display: "none" }}
        />
      </Flex>
      {errors && <ErrorMessage>{errors}</ErrorMessage>}
    </>
  );
};

export default ImageUpload;
