import Image from 'next/image'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

export const Header:React.FC<{}> = () => {
    return (
        <AppBar position='static' elevation={0} color='transparent'>
            <Toolbar>
                <Image alt='logo' src='/images/logo.png' height={20} width={119} />
            </Toolbar>
        </AppBar>
    )
}
