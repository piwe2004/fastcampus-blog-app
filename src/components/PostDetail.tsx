import React from 'react'

export default function PostDetail() {
    return (
        <>
            <div className='post__detail'>
                <div className='post__box'>
                    <h2 className='post__title'>Lorem Ipsum is simply</h2>
                    <ul className='post__profile-box'>
                        <li className='post__profile'></li>
                        <li className='post__author-name'></li>
                        <li className='post__date'>2023.07.08 토요일</li>
                    </ul>
                    <div className='post__utils-box'>
                        <div className='post__edit bnt-hover'>수정</div>
                        <div className='post__delete bnt-hover'>삭제</div>
                    </div>
                    <div className='post__text'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                </div>
            </div>
        </>
    )
}
