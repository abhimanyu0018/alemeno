import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const [myCourses, setMyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    const fetchUserCourses = async () => {
      setIsLoading(true);
      try {
        const userDocRef = doc(db, "students", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const enrolledCourses = userData.courses || [];

          // Fetch details of each enrolled course
          const courseDetails = await Promise.all(
            enrolledCourses.map(async (courseId) => {
              const courseDocRef = doc(db, "courses", courseId);
              const courseDoc = await getDoc(courseDocRef);
              return { id: courseId, ...courseDoc.data() };
            })
          );

          setMyCourses(courseDetails);
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setError("Failed to load courses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCourses();
  }, [userId]);

  const handleLogout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut(auth);
      dispatch(logout());
      console.log("User logged out ....");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-800 text-white">
      <nav className="flex justify-between px-20 h-[10%] items-center bg-zinc-600 w-full">
        <h2 className="text-3xl font-semibold">Dashboard</h2>
        <div className="flex gap-4">
          <Link
            className="hover:underline underline-offset-4 text-xl px-4 py-2 rounded-lg"
            to="/"
          >
            Explore Courses
          </Link>
          <button
            className="hover:border-2 px-4 py-2 rounded-lg"
            onClick={handleLogout}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </nav>

      <div className="h-[90%] pt-10 px-20">
        <h2 className="text-2xl font-bold">My Courses</h2>
        <div>
          {/* Map through all courses and display them in cards. */}
          {isLoading ? (
            <p>Loading courses...</p>
          ) : myCourses.length === 0 ? (
            <div className=" mt-4 flex justify-center items-center h-20">
              <p>No courses found. Start exploring and enrolling in courses!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {myCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-zinc-700 p-4 rounded-lg shadow-md"
                >
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnail}
                      alt="thumbnail"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {course.name}
                    </h3>
                    <p className="text-gray-300">
                      Instructor: {course.instructor}
                    </p>
                    <p className="text-gray-300">
                      Duration: {course.duration} weeks
                    </p>
                    <p className="text-gray-300">Schedule: {course.schedule}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default Dashboard;
