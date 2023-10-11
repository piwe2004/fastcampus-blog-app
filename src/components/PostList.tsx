import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';

interface PostListProps {
    hasNavigation?: boolean;
}

type TabType = "all" | 'my';

export interface PostProps {
    id?: string;
    title: string;
    email: string;
    content: string;
    summary: string;
    createAt: string;
}

export default function PostListPage({ hasNavigation = true }: PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [posts, setPosts] = useState<any[]>([])

    const getPosts = async () => {
        const datas = await getDocs(collection(db, 'posts'));
        datas?.forEach((doc) => {
            setPosts([])
            const dataObj = { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObj as PostProps])
        });
    }

    const { user } = useContext(AuthContext);

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <>
            {hasNavigation && (
                <ul className='post__navigation'>
                    <li role='presentation' className={activeTab === 'all' ? "post__navigation--active" : ""} onClick={() => setActiveTab('all')}>전체</li>
                    <li role='presentation' className={activeTab === 'my' ? "post__navigation--active" : ""} onClick={() => setActiveTab('my')}>나의 글</li>
                </ul>
            )}
            <div className='post__list'>

                {posts?.length > 0 ? posts.map((post, i) => (
                    <div key={post?.id} className='post__box'>
                        <Link to={`/posts/${post?.id}`}>
                            <ul className='post__profile-box'>
                                <li className='post__profile'></li>
                                <li className='post__author-name'>{post?.email}</li>
                                <li className='post__date'>{post?.createAt}</li>
                            </ul>
                            <h2 className='post__title'>{post?.title}</h2>
                            <div className='post__text'>{post?.content}</div>
                        </Link>
                        {post?.email === user?.email && (
                            <div className='post__utils-box'>
                                <div className='post__edit'>
                                    <Link to={'/posts/edit/1'} className='bnt-hover'>수정</Link>
                                </div>
                                <div className='post__delete bnt-hover'>삭제</div>
                            </div>
                        )}
                    </div>
                ))
                    : <p className='post__no-post'>게시글이 없습니다.</p>
                }
            </div>
        </>
    )
}
