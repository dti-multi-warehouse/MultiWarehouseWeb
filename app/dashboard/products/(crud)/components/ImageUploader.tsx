import {FC, useCallback, useEffect, useState} from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {useDropzone} from "react-dropzone";
import Image from "next/image";

interface FileWithPreview extends File {
    preview: string;
}

const ImageUploader: FC = () => {
    const [files, setFiles] = useState<FileWithPreview[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [
            ...prevFiles,
            ...acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        ]);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <Carousel className={"w-96 h-96"}>
            <CarouselContent className={"w-full h-full"}>
                {files.map((file, index) => (
                    <CarouselItem key={index}>
                        <Image src={file.preview} alt={"alt image"} height={384} width={384} />
                    </CarouselItem>
                ))}
                <CarouselItem {...getRootProps()} className={"flex items-center justify-center"}>
                    <input {...getInputProps()} className={""}/>
                    <p>Add picture</p>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext />
        </Carousel>
    )
}

export default ImageUploader