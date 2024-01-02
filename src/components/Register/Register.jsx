import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [regError, setRegError] = useState("");
    const [regSuccess, setRegSuccess] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsConditions = e.target.terms.checked;

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
        else if (!termsConditions) {
            alert("please accept our terms and conditions!");
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setRegSuccess("user created successfully!");
                console.log(result.user);

                // update username and photo
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg",
                })
                    .then()
                    .catch()

                // verify email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("Please check your email and verify!");
                    })
            })
            .catch(error => {
                setRegError(error.message);
            })
    }

    return (
        <div className="mt-10">
            <h2 className="text-center mb-5 text-3xl font-semibold">Please register!</h2>
            <form onSubmit={handleRegister} action="" className="relative w-4/12 mx-auto">
                <label htmlFor="name">Name</label>
                <br />
                <input id="name" className="border-gray-300 border w-full mb-4 p-2 rounded" type="text" name="name" placeholder="enter your name" required />
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input id="email" className="border-gray-300 border w-full mb-4 p-2 rounded" type="email" name="email" placeholder="enter your email" required />
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
                <span onClick={() => setShowPass(!showPass)} className="absolute top-[200px] right-2">
                    {
                        showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                </span>
                <br />
                <div className="my-3">
                    <input type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms"><small> Accept terms and conditions</small></label>
                </div>
                <input className="btn btn-primary mt-3" type="submit" value="Register" />
            </form>
            {
                regError && <p className="text-red-500 text-center mt-3">{regError}</p>
            }
            {
                regSuccess && <p className="text-green-500 text-center mt-3">{regSuccess}</p>
            }
            <p className="text-center mt-4">
                Already have an account? <Link to="/login" className="link text-blue-600">
                    Please login!
                </Link>
            </p>
        </div>
    );
};

export default Register;