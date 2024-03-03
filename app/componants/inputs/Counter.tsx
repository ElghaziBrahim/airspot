import React, { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "../../../styles/counter.module.css";

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,
    subtitle,
    value,
    onChange,
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return;
        }
        onChange(value - 1);
    }, [value, onChange]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
            </div>
            <div className={styles.controls}>
                <div className={styles.control} onClick={onReduce}>
                    <AiOutlineMinus />
                </div>
                <div className={styles.value}>{value}</div>
                <div className={styles.control} onClick={onAdd}>
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
};

export default Counter;
