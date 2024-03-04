import React from 'react';
import styles from "../../styles/heartButton.module.css";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { SafeUser } from '../api/types';
import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
    const { hasFavorited, toggleFavorite } = useFavorite({ listingId, currentUser })

    return (
        <div onClick={toggleFavorite}  >
            {hasFavorited ? (
                <AiOutlineHeart size={28} className={styles.emptyHeart} />

            ) : (
                <AiFillHeart size={28} className={styles.heartFill} />
            )}
        </div>
    );
}

export default HeartButton;
