import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {app} from 'firebaseApp'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function LoginForm() {
    const [error, setError] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const naviagte = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const auth = getAuth(app);
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('로그인에 성공 하였습니다.');
            naviagte("/")
        }catch(error:any){
            toast.error(error?.code);
            console.error(error);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {
            target : {name, value},
        } = e;
        if (name === 'email') {
            setEmail(value);
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!value?.match(validRegex)){
                setError("이메일 혈식이 올바르지 않습니다.");
            }else{
                setError('');
            }
        }
        if (name === 'password') {
            setPassword(value);
            if(value?.length < 6){
                setError('6글자 이상 넣어 주세요.')
            }else{
                setError('');
            }
        }
    }
    return (
        <form onSubmit={onSubmit} className='form form__lg'>
            <h2 className='form__title'>로그인</h2>
            <dl className='form__block'>
                <dt><label htmlFor="email">이메일</label></dt>
                <dd><input type="text" id="email" name="email" value={email} required onChange={onChange} /></dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="password">비밀번호</label></dt>
                <dd><input type="password" id="password" name="password" value={password} required onChange={onChange} /></dd>
            </dl>
            <div className='form__block'>
                <span>계정이 없으신가요? </span>
                <Link to="/signup" className='form__link'>회원가입 하러 가기</Link>
            </div>
            {error && error?.length > 0 && (
                <div className='form__block'>
                    <div className='form__error'>{error}</div>
                </div>
            )}
            <div className='form__block'>
                <input type="submit" value="로그인" className='form__btn--submit' />
            </div>
        </form>
    )
}
