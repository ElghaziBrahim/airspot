import styles from "../../styles/heading.module.css"

interface HeadingProps {
    center?: boolean
    title: string;
    subtitle: string
}
const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <div className={`${styles.heading} ${center ? styles.heading_center : ""}`}>
            <div className={styles.heading_title}>
                {title}
            </div>
            <div className={styles.heading_subtitle}>
                {subtitle}
            </div>
        </div>
    )
}

export default Heading
