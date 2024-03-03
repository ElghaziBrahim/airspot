import styles from "../../styles/heading.module.css"

interface HeadingProps {
    title: string;
    subtitle: string
}
const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
    return (
        <div className={styles.heading}>
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
