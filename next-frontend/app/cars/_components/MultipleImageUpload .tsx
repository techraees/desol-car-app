import { useRef, useState } from "react";
import { Flex, Box, Input, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const ImageUpload = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages([...images, ...newImages]);
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
        className="bg-[#efefef9c]"
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
  );
};

export default ImageUpload;
