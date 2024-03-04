"use client"
import { SafeUser } from '@/app/api/types';
import useCountries from '@/app/hooks/useContries';
import { Listing, Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useMemo } from 'react';
import { format } from 'date-fns';
import HeartButton from '../HeartButton';
import styles from '../../../styles/listinCard.module.css'; // Import CSS modules

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (disabled) {
                return;
            }
            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }
        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    return (
        <div className={styles.listingCard} onClick={() => router.push(`/listing/${data.id}`)}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={data.imageSrc} alt="listing" />
                <div className={styles.heartButtonContainer}>
                    <HeartButton listingId={data.id} currentUser={currentUser} />
                </div>
            </div>
            <div className={styles.location}>
                {location?.region || data.category}
            </div>
            <div className={styles.reservationDate}>
                {reservationDate || data.category}
            </div>
            <div className={styles.priceContainer}>
                <div className={styles.price}>
                    $ {price}
                </div>
                {!reservation && (
                    <div className={styles.night}>
                        night
                    </div>
                )}
            </div>
            {onAction && actionLabel && (
                <button disabled={disabled} onClick={handleCancel} className={styles.actionButton}>
                    {actionLabel}
                </button>
            )}
        </div>

    );
};

export default ListingCard;
