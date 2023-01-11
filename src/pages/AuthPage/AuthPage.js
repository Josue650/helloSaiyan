// AuthPage.js
import '../../Auth.css'
import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage(props){
    return(
        <main>
            <div className='container'>
                <div className='header-container'>
                    <h3> Join the Fun </h3>
                </div>
                <SignUpForm setUser={props.setUser}/>
                <LoginForm setUser={props.setUser}/>
            </div>
        </main>
    )
}
