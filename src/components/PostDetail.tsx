import { useState, useEffect } from 'react';
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PostProps } from './PostList';
import { db } from 'firebaseApp';
import Loader from './Loader';
import { toast } from 'react-toastify';
import Comments from './Comments';



export default function PostDetail() {
    const params = useParams();
    const [post, setPost] = useState<PostProps | null>(null);
    const navigate = useNavigate()

    const getPost = async (id: string) => {
        if (id) {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);
            setPost({ id: docSnap.id, ...docSnap.data() as PostProps })
        }
    }

    const handleDelete = async () => {
        const confirm = window.confirm('해당 글을 삭제 하시겠습니까?')
        if (confirm && post && post.id) {
            await deleteDoc(doc(db, 'posts', post.id));
            toast.success('삭제되었습니다.');
            navigate('/posts');
        }
    }

    useEffect(() => {
        if (params?.id) getPost(params?.id)
    }, [params?.id]);



    return (
        <>
            <div className='post__detail'>
                {post ? (
                    <>
                        <div className='post__box'>
                            <h2 className='post__title'>{post?.title}</h2>
                            <ul className='post__profile-box'>
                                <li className='post__profile'></li>
                                <li className='post__author-name'>{post?.email}</li>
                                <li className='post__date'>{post?.createAt}</li>
                            </ul>
                            <div className='post__utils-box'>
                                {post?.category && (
                                    <div className='post__category'>{post?.category}</div>
                                )}
                                <div className='post__edit bnt-hover'>
                                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                                </div>
                                <div className='post__delete bnt-hover' onClick={handleDelete}>삭제</div>
                            </div>
                            <div className='post__text post__text--pre-wrap'>
                                {post?.content}
                            </div>
                        </div>
                        <Comments post={post} getPost={getPost} />
                    </>
                )
                    : <Loader />
                }
            </div>
        </>
    )
}
