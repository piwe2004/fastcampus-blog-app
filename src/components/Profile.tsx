import { Link } from 'react-router-dom';
import {app} from 'firebaseApp'
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';

const onSignOut = async () => {
    try {
        const auth = getAuth(app);
        signOut(auth);
        toast.success('로그아웃 되었습니다.')
    } catch (error:any) {
        toast.error(error?.code)
    }
}

export default function Profile() {

    const {user} = useContext(AuthContext);
    return (
        <div className='profile__box'>
            <div className='flex__box-lg'>
                <div className='profile__image' />
                <div>
                    <div className='profile__email'>{user?.email}</div>
                    <div className='profile__name'>{user?.displayName || '사용자'}</div>
                </div>
            </div>
            <button className='profile__logout bnt-hover' onClick={onSignOut}>로그아웃</button>
        </div>
    )
}
