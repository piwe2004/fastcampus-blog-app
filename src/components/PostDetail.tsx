import { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { PostProps } from './PostList';
import { db } from 'firebaseApp';
import Loader from './Loader';



export default function PostDetail() {
    const params = useParams();
    const [post, setPost] = useState<PostProps | null>(null);

    const getPost = async (id:string) => {
        if(id){
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);
            
            setPost({id :docSnap.id, ...docSnap.data() as PostProps})
        }
    }

    const handleDelete = () => {
        console.log('delete')
    }

    useEffect(() => {
        if(params?.id) getPost(params?.id)
    }, [params?.id])
    
    
    return (
        <>
            <div className='post__detail'>
                {post ? (
                <div className='post__box'>
                    <h2 className='post__title'>{post?.title}</h2>
                    <ul className='post__profile-box'>
                        <li className='post__profile'></li>
                        <li className='post__author-name'>{post?.email}</li>
                        <li className='post__date'>{post?.createAt}</li>
                    </ul>
                    <div className='post__utils-box'>
                        <div className='post__edit bnt-hover'>
                            <Link to={`/posts/edit/1`}>수정</Link>
                        </div>
                        <div className='post__delete bnt-hover' onClick={handleDelete}>삭제</div>
                    </div>
                    <div className='post__text post__text--pre-wrap'>
                        {post?.content}
                    </div>
                </div>
                )
                : <Loader />
            }
            </div>
        </>
    )
}
