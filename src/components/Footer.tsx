import {useContext} from 'react';
import { Link } from 'react-router-dom'
import { BsSun, BsMoonFill } from 'react-icons/bs'
import ThemeContext from 'context/ThemeContext'

export default function Footer() {
    const context = useContext(ThemeContext);
    return (
        <footer>
            <ul>
                <li><Link to="/posts/new" className='bnt-hover'>글쓰기</Link></li>
                <li><Link to="/posts" className='bnt-hover'>게시글</Link></li>
                <li><Link to="/profile" className='bnt-hover'>프로필</Link></li>
            </ul>
            <div>
                {context.theme === 'light' 
                ? <BsSun onClick={context.toggleMode} className='footer__theme-btn' /> 
                : <BsMoonFill onClick={context.toggleMode} className='footer__theme-btn' />}
            </div>
        </footer>
    )
}
