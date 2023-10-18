import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

export const SignInPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [signInError, setSignInError] = useState("");
  const navigate = useNavigate();

  const onClickSignIn = async () => {
    try {
      setSignInError("");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue
      );
      if (userCredential.user) navigate("/");
    } catch (e) {
      setSignInError(e.message);
    }
  };

  return (
    <div className="full-height-page">
      <div className="centered-container space-before">
        {signInError ? (
          <div>
            <p className="error-message">{signInError.message}</p>
          </div>
        ) : null}
        <input
          type="text"
          value={emailValue}
          placeholder="Email address"
          className="full-width space-after"
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <input
          type="password"
          value={passwordValue}
          placeholder="Password"
          className="full-width space-after"
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button className="full-width" onClick={onClickSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};
