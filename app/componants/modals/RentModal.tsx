"use client"
import { useCallback, useMemo, useState } from "react"
import Modal from "./Modal"
import useRentModal from "@/app/hooks/useRentModal"
import styles from "../../../styles/rentModal.module.css"
import { categories } from "../navbar/Categories"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form"
import Select from "react-select"
import useCountries from "@/app/hooks/useContries"
import { CountrySelectValue } from "@/app/api/types"
import Input from "../inputs/input"
import axios from "axios"

import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import Heading from "../Heading"
import UploadImage from "../inputs/UploadImage"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
enum STEPS {
    CATEGORY = 0,
    LOCATIONS,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE,
}
const RentModal = () => {

    const router = useRouter()
    const rentModel = useRentModal()
    const { getAll } = useCountries()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedLocation, setSelectedLocation] = useState({} as CountrySelectValue)
    const [isLoading, setIsLoading] = useState(false)

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [selectedLocation])

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


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step != STEPS.PRICE) {
            return onNext()
        }
        setIsLoading(true)
        axios.post("/api/listings", data)
            .then(() => {
                toast.success("Listing Created");
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModel.onClose()
            })
            .catch(() => {
                toast.error("something went wrong")
            })
            .finally(() => {
                setIsLoading(false)
            })


    }


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
    const imageScr = watch("imageSrc")
    const guestCount = watch("guestCount")
    const roomCount = watch("roomCount")
    const bathroomCount = watch("bathroomCount")






    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldValidate: true,
            shouldTouch: true,
        })
    }


    let bodyContent = (
        <div className={styles.rentBody}>
            <Heading
                title="Which of these best describes your plcae?"
                subtitle="Pick a category"
            />
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

                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you"
                />
                <div>
                    <Select
                        placeholder="Anywhere"
                        isClearable
                        options={getAll()}
                        /* value={value } */
                        value={selectedLocation}
                        /* onChange={(value) => onChange(value as CountrySelectValue)} */
                        onChange={(value) => { console.log(value); setCustomValue("location", value); setSelectedLocation(value) }}

                        formatOptionLabel={(option: any) => (
                            <div className={styles.countryInfo}>
                                <div className={styles.country_inf}>
                                    {option.label},
                                    <span className={styles.countryRegion}>
                                        {option.region}
                                    </span>
                                </div>
                            </div>

                        )}
                        className={styles.select_input}
                    />
                    <Map
                        center={selectedLocation?.latlng}
                    />
                </div>

            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={styles.rentBody}>
                <Heading
                    title="Some basics about your place"
                    subtitle="Amenities you do have"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue("guestCount", value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many guests do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue("roomCount", value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many guests do you have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue("bathroomCount", value)}
                />


            </div>
        )
    }
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className={styles.rentBody}>
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show your guest what your place looks like"
                />
                <UploadImage
                    value={imageScr}
                    onChange={(value) => { setCustomValue("imageSrc", value) }}
                />
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className={styles.rentBody}>
                <Heading
                    title="How whould you describe your place?"
                    subtitle="Short works best"
                />

                <Input
                    disabled={isLoading}
                    id="title"
                    label="Title"
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    disabled={isLoading}
                    id="description"
                    label="Description"
                    register={register}
                    errors={errors}
                    required
                />

            </div>
        )
    }
    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className={styles.rentBody}>
                <Heading
                    title="Now,set your price"
                    subtitle="Charge How much per night?"
                />
                <Input
                    formatPrice
                    disabled={isLoading}
                    id="price"
                    label="Price"
                    type="number"
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    return (
        <Modal
            isOpen={rentModel.isOpen}
            onClose={rentModel.onClose}
            onSubmit={handleSubmit(onSubmit)}
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
