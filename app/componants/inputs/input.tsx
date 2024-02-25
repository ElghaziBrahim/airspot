'use client'

import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from "react-hook-form";
import styles from "../../../styles/input.module.css"
import { BiDollar } from "react-icons/bi";


interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>
    errors: FieldErrors
}
const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    formatPrice,
    required,
    register,
    errors,
}) => {
    return (
        <div className={styles.input_container}        >
            {formatPrice && (
                <BiDollar
                    size={34}
                    className={styles.form_dolarSign}
                />
            )
            }
            <input
                className={styles.input}
                type={type}
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=" "

            />
            <label className={styles.input_label} >
                {label}
            </label>
        </div>
    )
}

export default Input
