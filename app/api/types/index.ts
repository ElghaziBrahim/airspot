import { User } from "@prisma/client"

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export type CountrySelectVakue = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    value: string
}
