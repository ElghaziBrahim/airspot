"use client"
import { useCallback, useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import styles from "../../../styles/rentModal.module.css"
import { categories } from "../navbar/Categories"
import { IoMdContact } from "react-icons/io"
import { useForm, FieldValues } from "react-hook-form"
import Select from "react-select"
import useCountries from "@/app/hooks/useContries"
enum STEPS {
    CATEGORY = 0,
    LOCATIONS,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE,
}
const RentModal = () => {
    const rentModel = useRentModal()
    const { getAll } = useCountries()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [selectedCategory, setSelectedCategory] = useState("")

    const onBack = () => { setStep((prev) => prev - 1) }

    const onNext = () => { setStep((prev) => prev + 1) }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "create"
        }
        return "next"
    }, [step])

    const secondaryLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }
        return "back"
    }, [step])


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: "",
            price: 1,
            title: "",
            description: ""

        }
    })


    /* const handleSubmit = useCallback(() => { }, []) */

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        })
    }


    let bodyContent = (
        <div className={styles.rentBody}>
            <div className={styles.heading}>
                <div className={styles.heading_title}>
                    Which of these best describes your plcae?
                </div>
                <div className={styles.heading_subtitle}>
                    Pick a category
                </div>
            </div>

            <div className={styles.categories}>
                {categories.map((item) => (
                    /* ocClick,selected,label,icon */
                    <div key={item.label}
                        onClick={() => {
                            setCustomValue("category", item.label);
                            setSelectedCategory(item.label);
                        }}
                        className={`${styles.category} ${(item.label === selectedCategory) ? styles.selectedCategory : ''}`}>
                        <item.icon size={30} />

                        {item.label}

                    </div>
                ))}
            </div>
        </div>
    )

    if (step === STEPS.LOCATIONS) {
        bodyContent = (
            <div className={styles.rentBody}>
                <div className={styles.heading}>
                    <div className={styles.heading_title}>
                        Where is your place located?
                    </div>
                    <div className={styles.heading_subtitle}>
                        Pick a category
                    </div>
                </div>
                <div>
                    <Select
                        placeholder="Anywhere"
                        isClearable
                        options={getAll()}
                    />

                </div>

            </div>
        )
    }
    return (
        <Modal
            isOpen={rentModel.isOpen}
            onClose={rentModel.onClose}
            onSubmit={onNext}
            /* onSubmit={handleSubmit(onSubmit)} */
            title="rent"
            body={bodyContent}
            /* footer={footerContent}  */
            actionLabel={actionLabel}
            /* disabled={isLoading} */
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            secondaryActionLabel={secondaryLabel}
        />
    )
}

export default RentModal
