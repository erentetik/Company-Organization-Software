import { useRef , useState, useEffect } from 'react';
//import { faCheck, faTimes, faInfoCircle } from '@fortawesome/fontawesome-free-solid-svg-icons';
import NavigateButton from './NavigateButton';
const MAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const ActivateUser = () => {
    const emailRef = useRef();
    const errRef = useRef();

    const [user , setUser] = useState('');
    const [validMail , setValidMail] = useState(false);
    const [userFocus , setUserFocus] = useState(false);

    const [errMsg , setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const result = MAIL_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidMail(result); }, [user]);

    useEffect(() => {
        setErrMsg('');
    }, [user]);

    return ( 
        <div className='container'>
            <section className='activate-user'>
                <p ref={errRef} className={ errMsg ? "errmsg" : "offscreen"} aria-live='assertive'> {errMsg} </p>
                <form>
                    <label htmlFor="email"></label>
                    <input  type="email"
                            id="email" 
                            placeholder='Enter your email address.'
                            ref={emailRef}
                            value={user} 
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            className='email-input' />
                    <button type="submit" className='button'>Send activation mail</button>
                </form>
                


            </section>
            <NavigateButton to="/" buttonText="I already have an account." />
        </div>
     );
}
 
export default ActivateUser;