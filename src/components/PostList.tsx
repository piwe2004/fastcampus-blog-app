import {useState} from 'react'
import { Link } from 'react-router-dom'

interface PostListProps{
    hasNavigation ?: boolean;
}

type TabType = "all" | 'my';

export default function PostListPage({ hasNavigation = true } : PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>('all')
    return (
        <>
            {hasNavigation && (
                <ul className='post__navigation'>
                    <li role='presentation' className={activeTab === 'all' ? "post__navigation--active" : ""} onClick={()=>setActiveTab('all')}>전체</li>
                    <li role='presentation' className={activeTab === 'my' ? "post__navigation--active" : ""}onClick={()=>setActiveTab('my')}>나의 글</li>
                </ul>
            )}
            <div className='post__list'>
                {[...Array(10)].map((e, i) => (
                    <div key={i} className='post__box'>
                        <Link to={`/posts/${i}`}>
                            <ul className='post__profile-box'>
                                <li className='post__profile'></li>
                                <li className='post__author-name'></li>
                                <li className='post__date'>2023.07.08 토요일</li>
                            </ul>
                            <h2 className='post__title'>게시글 {i}</h2>
                            <div className='post__text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </div>
                            <div className='post__utils-box'>
                                <div className='post__edit'>
                                    <Link to={'/posts/edit/1'} className='bnt-hover'>수정</Link>
                                </div>
                                <div className='post__delete bnt-hover'>삭제</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
