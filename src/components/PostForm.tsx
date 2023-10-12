import { useState, useContext, useEffect } from 'react';
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CATEGORIES, CategoryType, PostProps } from './PostList';

export default function PostForm() {
    const param = useParams();
    const [post, setPost] = useState<PostProps | null>(null)
    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [category, setCategory] = useState<CategoryType>()
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (post && post?.id) {
                // 포스트 데이터가 있다면
                const postRef = doc(db, "posts", post?.id);
                await updateDoc(postRef, {
                    title: title,
                    summary: summary,
                    content: content,
                    updateAt: new Date()?.toLocaleDateString("ko", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }),
                    category: category
                });
                toast?.success('수정 하였습니다.');
                navigate(`/posts/${post?.id}`);
            } else {
                // 포스트 데이터가 없다면
                await addDoc(collection(db, "posts"), {
                    title: title,
                    summary: summary,
                    content: content,
                    createAt: new Date()?.toLocaleDateString("ko", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }),
                    email: user?.email,
                    uid: user?.uid
                });
                toast?.success('게시글을 생성 하였습니다.');
                navigate("/");
            }
        } catch (e) {
            toast?.error('게시글을 생성에 실패 하였습니다.');
            console.error(e)
        }
    }
    const onChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'title') {
            setTitle(value);
        }
        if (name === 'summary') {
            setSummary(value);
        }
        if (name === 'content') {
            setContent(value);
        }
        if (name === 'category') {
            setCategory(value as CategoryType)
        }
    }

    const getPost = async (id: string) => {
        if (id) {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);

            setPost({ id: docSnap.id, ...docSnap.data() as PostProps })
        }
    }

    useEffect(() => {
        if (param?.id) getPost(param?.id)
    }, [param?.id]);

    useEffect(() => {
        if (post) {
            setTitle(post?.title);
            setSummary(post?.summary);
            setContent(post?.content);
            setCategory(post?.category as CategoryType)
        }
    }, [post])

    return (
        <form onSubmit={onSubmit} className='form'>
            <dl className='form__block'>
                <dt><label htmlFor="title">제목</label></dt>
                <dd>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        onChange={onChage}
                        value={title}
                    />
                </dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="category">카테고리</label></dt>
                <dd>
                    <select
                        name="category"
                        id="category"
                        onChange={onChage}
                        defaultValue={category}
                    >
                        <option value="">카테고리를 선택해 주세요.</option>
                        {CATEGORIES?.map((category)=>(
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                </dd>
            </dl>
            <dl className='form__block'>
                <dt>
                    <label htmlFor="summary">요약</label>
                </dt>
                <dd>
                    <input
                        type="text"
                        id="summary"
                        name="summary"
                        required
                        onChange={onChage}
                        value={summary}
                    />
                </dd>
            </dl>
            <dl className='form__block'>
                <dt>
                    <label htmlFor="content">내용</label>
                </dt>
                <dd>
                    <textarea
                        name="content"
                        id="content"
                        onChange={onChage}
                        value={content}
                        required
                    />
                </dd>
            </dl>
            <div className='form__block'>
                <input
                    type="submit"
                    value={post ? '수정' : '제출'}
                    className='form__btn--submit'
                />
            </div>
        </form>
    )
}
