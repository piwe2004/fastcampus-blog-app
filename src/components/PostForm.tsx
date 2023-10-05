import React from 'react'

export default function PostForm() {
    return (
        <form action="/posts" method='post' className='form'>
            <dl className='form__block'>
                <dt><label htmlFor="title">제목</label></dt>
                <dd><input type="text" id="title" name="title" /></dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="summary">요약</label></dt>
                <dd><input type="text" id="summary" name="summary" /></dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="content">내용</label></dt>
                <dd><textarea name="content" id="content" required /></dd>
            </dl>
            <div className='form__block'>
                <input type="submit" value="제출" className='form__btn--submit' />
            </div>
        </form>
    )
}
