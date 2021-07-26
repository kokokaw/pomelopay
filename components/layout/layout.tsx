
import { Header } from 'components/header'

import styles from './layout.module.scss'

export const Layout:React.FC<{}> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.containerBody}>
                {children}
            </div>
        </div>
    )
}
