'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb';
import styles from '../../../styles/uploadImage.module.css'; // Import CSS Module

declare global {
    var cloudinary: any;
}

const uploadPreset = "bdw3jgku";

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        className={styles.uploadContainer} // Apply classNames using CSS Module
                        onClick={() => open?.()}
                    >
                        <TbPhotoPlus
                            size={50}
                        />
                        <div className={styles.uploadText}>
                            Click to upload
                        </div>
                        {value && (
                            <div className={styles.uploadedImage}>
                                <Image
                                    fill
                                    className={styles.image}
                                    src={value}
                                    alt="House"
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;
