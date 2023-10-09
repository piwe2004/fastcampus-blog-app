import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import {app} from "firebaseApp"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify'

export default function SignupForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCongirm, setPasswordCongirm] = useState<string>("");
    const [error, setError] = useState<string>("");
    const naviagte = useNavigate();

    const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const auth = getAuth(app);
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('회원가입에 성공했습니다.');
            naviagte("/login")
        }catch(error:any){
            console.error(error);
            toast.error(error?.code);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const{
            target:{name, value},
        } = e;
        if(name === 'email'){
            setEmail(value);
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!value?.match(validRegex)){
                setError("이메일 혈식이 올바르지 않습니다.");
            }else{
                setError('');
            }
        }
        if(name === 'password'){
            setPassword(value);
            if(value?.length < 6){
                setError('6글자 이상 넣어 주세요.')
            }else if(passwordCongirm?.length > 0 && value !== passwordCongirm){
                setError('패스워드가 다릅니다. 다시 확인해 주세요.')  
            }else{
                setError('');
            }
        }
        if(name === 'password_confirm'){
            setPasswordCongirm(value);
            if(value !== password){
                setError('패스워드가 다릅니다. 다시 확인해 주세요.')            
            }else{
                setError('');
            }
        }
    }

    return (
        <form onSubmit={onSubmit} className='form form__lg'>
            <h2 className='form__title'>회원가입</h2>
            <dl className='form__block'>
                <dt><label htmlFor="email">이메일</label></dt>
                <dd><input type="text" id="email" name="email" required onChange={onChange} /></dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="password">비밀번호</label></dt>
                <dd><input type="password" id="password" name="password" onChange={onChange} /></dd>
            </dl>
            <dl className='form__block'>
                <dt><label htmlFor="password_confirm">비밀번호확인</label></dt>
                <dd><input type="password" id="password_confirm" name="password_confirm" onChange={onChange} /></dd>
            </dl>
            {
                error && error?.length > 0 && (
                    <div className="form__block">
                        <div className="form__error">{error}</div>
                    </div>
                )
            }
            <div className='form__block'>
                <input type="submit" value="회원가입" className='form__btn--submit' disabled={error.length > 0}/>
            </div>
        </form>
    )
}
