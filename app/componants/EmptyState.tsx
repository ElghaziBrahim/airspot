"use client"
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import styles from "../../styles/emptyState.module.css"
interface EmptyProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean
}
const EmptyState: React.FC<EmptyProps> = ({
    showReset,
    title = "No Exact Matchs",
    subtitle = "Try changing or removing some of your filters"
}) => {
    const router = useRouter()
    return (
        <div className={styles.emptyState}>
            <Heading center title={title} subtitle={subtitle} />
            <div className={styles.resetButton}>
                {showReset && (
                    <button className={styles.button} onClick={() => router.push("/")}>
                        Remove all filters
                    </button>
                )}
            </div>
        </div>
    );
}

export default EmptyState
