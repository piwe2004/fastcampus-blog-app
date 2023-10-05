import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <ul>
                <li><Link to="/posts/new" className='bnt-hover'>글쓰기</Link></li>
                <li><Link to="/posts" className='bnt-hover'>게시글</Link></li>
                <li><Link to="/profile" className='bnt-hover'>프로필</Link></li>
            </ul>
        </footer>
    )
}
