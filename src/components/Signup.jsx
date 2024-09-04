import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";

const LoadingSpinner = () => (
  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
);

const ErrorMessage = ({ message }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
    role="alert"
  >
    <span className="block sm:inline">{message}</span>
  </div>
);

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "students", user.uid), {
        first_name: firstName,
        last_name: lastName,
        email: email,
        courses: [],
      });

      dispatch(login({ userId: user.uid }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 flex justify-center items-center">
      <form
        onSubmit={handleSignup}
        className="max-w-md mx-auto p-6 bg-zinc-600 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-100">
          Sign Up
        </h2>
        {error && <ErrorMessage message={error} />}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 text-zinc-100 rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 text-zinc-100 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 text-zinc-100 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 text-zinc-100 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : null}
          <span className="ml-2">
            {isLoading ? "Signing Up..." : "Sign Up"}
          </span>
        </button>
        <div className="mt-4 text-center text-zinc-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowCredentials(true);
    }, 500);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(login({ userId: user.uid, email: user.email }));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto p-6 bg-zinc-600 rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-100">
          Log In
        </h2>
        {error && <ErrorMessage message={error} />}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 text-zinc-100 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-zinc-700 text-zinc-100 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : null}
          <span className="ml-2">{isLoading ? "Logging In..." : "Log In"}</span>
        </button>
        <div className="mt-4 text-center text-zinc-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>

      {/* Popup with test credentials */}
      {showCredentials && (
        <div
          style={{
            position: "fixed",
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -0%)",
          }}
          className="bg-zinc-900 text-white p-4 rounded-xl flex flex-col"
        >
          <h2 className="text-xl text-center p-2">Test Credentials</h2>

          <p>
            <strong>Email:</strong> <span>test1@gmail.com</span>
          </p>
          <p>
            <strong>Password:</strong> <span>123456</span>
          </p>
          <button
            onClick={() => setShowCredentials(false)}
            style={{
              marginTop: "10px",
              backgroundColor: "#007bff",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
