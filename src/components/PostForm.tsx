import { useState, useContext } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PostForm() {

    const [title, setTitle] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "posts"),{
                title: title,
                summary: summary,
                content: content,
                createAt: new Date()?.toLocaleDateString(),
                email:user?.email
            });
            toast?.success('게시글을 생성 하였습니다.');
            navigate("/");
        } catch (e) {
            toast?.error('게시글을 생성에 실패 하였습니다.');
            console.error(e)
        }
    }
    const onChage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    }
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
                    value="제출" 
                    className='form__btn--submit' 
                />
            </div>
        </form>
    )
}
