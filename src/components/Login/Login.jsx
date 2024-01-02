import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [regError, setRegError] = useState("");
    const [regSuccess, setRegSuccess] = useState("");
    const [showPass, setShowPass] = useState(false);
    const emailRef = useRef(null);

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        setRegError("");
        setRegSuccess("");

        if (password.length < 6) {
            setRegError("Password should be at least 6 characters");
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setRegError("password must contain a capital letter!");
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    setRegSuccess("User logged in successfully!");
                }
                else {
                    setRegError("Verify your email!");
                }
                console.log(result.user);
            })
            .catch(error => {
                setRegError(error.message);
            })
    }

    const handleForgetPass = () => {
        const email = emailRef.current.value;

        setRegError("");
        setRegSuccess("");

        if (!email) {
            setRegError("Please enter your email!");
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Check your email!");
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className="mt-10">
            <h2 className="text-center mb-5 text-3xl font-semibold">Please login!</h2>
            <form onSubmit={handleLogin} action="" className="relative w-4/12 mx-auto">
                <label htmlFor="email">Email</label>
                <br />
                <input
                    id="email"
                    className="border-gray-300 border w-full mb-4 p-2 rounded"
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder="enter your email"
                    required
                />
                <br />
                <label htmlFor="password">Password</label>
                <br />
                <input
                    id="password"
                    className="border-gray-300 border w-full p-2 rounded"
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="enter your password"
                    required
                />
                <span onClick={() => setShowPass(!showPass)} className="absolute top-[117px] right-2">
                    {
                        showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                </span>
                <br />
                <label onClick={handleForgetPass} className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
                <input className="btn btn-primary mt-3" type="submit" value="Login" />
            </form>
            {
                regError && <p className="text-red-500 text-center mt-3">{regError}</p>
            }
            {
                regSuccess && <p className="text-green-500 text-center mt-3">{regSuccess}</p>
            }
            <p className="text-center mt-4">
                Do not have an account? <Link to="/register" className="link text-blue-600">
                    Please register!
                </Link>
            </p>
        </div>
    );
};

export default Login;