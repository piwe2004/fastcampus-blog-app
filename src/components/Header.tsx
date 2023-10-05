import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <h1 className='header__logo'><Link to="/">BLOG</Link></h1>
            <ul>
                <li><Link to="/posts/new" className='bnt-hover'>글쓰기</Link></li>
                <li><Link to="/posts" className='bnt-hover'>게시글</Link></li>
                <li><Link to="/profile" className='bnt-hover'>프로필</Link></li>
            </ul>
        </header>
    )
}
