import { useState, useContext } from 'react';
import { PostProps, CommentsInterface } from './PostList';
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';


interface CommentsProps {
    post: PostProps;
    getPost: (id: string) => Promise<void>;
}

export default function Comments({ post, getPost }: CommentsProps) {
    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (post && post?.id) {
                const postRef = doc(db, "posts", post.id);
                if (user?.uid) {
                    const commentObj = {
                        content: comment,
                        uid: user.uid,
                        email: user.email,
                        createdAt: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        }),
                    };

                    await updateDoc(postRef, {
                        comments: arrayUnion(commentObj),
                        updatedAt: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    })
                    await getPost(post.id);
                }
            }
            toast.success('댓글이 등록 되었습니다.');
            setComment('');
        } catch (error) {
            console.error(error)
            toast.error('댓글이 등록 되지 않았습니다.')
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "comment") {
            setComment(value);
        }
    }

    const handleDeleteComment = async (data: CommentsInterface) => {
        const confirm = window.confirm('해당 댓글을 삭제 하시겠습니까?');
        if (confirm && post.id) {
            const postRef = doc(db, "posts", post?.id);
            await updateDoc(postRef, {
                comments:arrayRemove(data),
            });
            toast.success('댓글이 삭제 되었습니다.');
            await getPost(post.id);
        }
    }

    return (
        <div className="comments">
            <form onSubmit={onSubmit} className="comments__form">
                <div className="form__block">
                    <label htmlFor="comment">댓글 입력</label>
                    <textarea name="comment" id="comment" required value={comment} onChange={onChange}></textarea>
                </div>
                <div className='form__block'>
                    <input type="submit" value="입력" className='form__btn-submit' />
                </div>
            </form>
            <ul className="comments__list">
                {post?.comments?.map((comment) => (
                    <li key={comment.createdAt} className='comment__box' >
                        <ul className='comment__profile-box'>
                            <li className='comment__email'>{comment.email}</li>
                            <li className='comment__date'>{comment.createdAt}</li>
                            {
                                comment.uid === user?.uid && (
                                    <li className='comment__delete' onClick={() => handleDeleteComment(comment)}>삭제</li>
                                )
                            }
                        </ul>
                        <p className='comment__text'>{comment.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
