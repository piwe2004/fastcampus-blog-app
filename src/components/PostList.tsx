import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface PostListProps {
    hasNavigation?: boolean;
    defaultTab?: TabType
}

export interface CommentsInterface{
    content:string;
    uid:string;
    createdAt:string;
    email:string;
    updatedAt:string;
}

export interface PostProps {
    id?: string;
    title: string;
    email: string;
    content: string;
    summary: string;
    createAt: string;
    updateAt:string;
    uid:string;
    category?:CategoryType;
    comments?:CommentsInterface[];
}
type TabType = "all" | 'my';
export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES: CategoryType[] = ["Frontend", "Backend", "Web", "Native"]

export default function PostListPage({ hasNavigation = true, defaultTab = 'all', }: PostListProps) {
    const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab);
    const [posts, setPosts] = useState<any[]>([]);
    const { user } = useContext(AuthContext);

    const getPosts = async () => {
        //const datas = await getDocs(collection(db, 'posts'));
        setPosts([]);
        let postsRef = collection(db, "posts");
        let postsQuery;
        if(activeTab === 'my' && user ){
            postsQuery = query(postsRef, where('uid', '==', user.uid), orderBy("createAt", "desc"));
        }else if(activeTab === 'all' ){
            postsQuery = query(postsRef, orderBy("createAt", "desc"));
        }else{
            postsQuery = query(postsRef, where('category', '==', activeTab), orderBy("createAt", "desc"));
        }
        const datas = await getDocs(postsQuery);
        datas?.forEach((doc) => {
            const dataObj = { ...doc.data(), id: doc.id };
            setPosts((prev) => [...prev, dataObj as PostProps])
        });
    }


    useEffect(() => {
        getPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const handleDelete = async (id:string) => {
        const confirm = window.confirm('해당 글을 삭제 하시겠습니까?')
        if(confirm && id ){
            await deleteDoc(doc(db, 'posts', id));
            toast.success('삭제되었습니다.');
            getPosts()
        }
    }



    return (
        <>
            {hasNavigation && (
                <ul className='post__navigation'>
                    <li role='presentation' className={activeTab === 'all' ? "post__navigation--active" : ""} onClick={() => setActiveTab('all')}>전체</li>
                    <li role='presentation' className={activeTab === 'my' ? "post__navigation--active" : ""} onClick={() => setActiveTab('my')}>나의 글</li>
                    {CATEGORIES?.map((category)=>(
                        <li
                            key={category}
                            onClick={()=>setActiveTab(category)}
                            className={activeTab === category 
                                ? 'post__navigation--active' 
                                : ''}
                        >{category}</li>
                    ))}
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
                                <div className='post__delete bnt-hover' onClick={()=>handleDelete(post.id as string)}>삭제</div>
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
