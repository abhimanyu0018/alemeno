import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [expandSyllabus, setExpandSyllabus] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCourse(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return (
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-zinc-100"></div>
      </div>
    );
  }

  const handleEnroll = async () => {
    if (isLoggedIn) {
      setEnrolling(true);
      setError(null);

      try {
        const userDocRef = doc(db, "students", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const enrolledCourses = userData.courses || [];

          // Check if the course is already enrolled
          if (enrolledCourses.includes(id)) {
            setError("You are already enrolled in this course.");
            setEnrolling(false);
            return;
          }

          // Enroll the user by adding the course ID to the courses array
          await updateDoc(userDocRef, {
            courses: arrayUnion(id),
          });

          console.log("Enrolled successfully");
          navigate("/dashboard");
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Enrollment failed", err);
        setError("Failed to enroll. Please try again.");
      } finally {
        setEnrolling(false);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-32 h-32 mr-4"
                />
                <div>
                  <h1 className="text-3xl font-bold">{course.name}</h1>
                  <p className="text-xl text-zinc-400">
                    Instructor: {course.instructor}
                  </p>
                </div>
              </div>

              {course.enrollmentStatus === "Closed" ? null : (
                <button
                  className="text-xl bg-zinc-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-950"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Course Details</h2>
                <p className="mb-2">
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Schedule:</span>{" "}
                  {course.schedule}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {course.location}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Pre-requisites:</span>{" "}
                  {course.prerequisites}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Status</h2>
                <p
                  className={`inline-block px-3 py-1 rounded-full ${
                    course.enrollmentStatus === "Closed"
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {course.enrollmentStatus}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-zinc-300">{course.description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
              <button
                onClick={() => setExpandSyllabus(!expandSyllabus)}
                className="bg-zinc-700 hover:bg-zinc-600 text-zinc-100 font-bold py-2 px-4 rounded mb-4"
              >
                {expandSyllabus ? "Hide Syllabus" : "Show Syllabus"}
              </button>
              {expandSyllabus && (
                <div className="bg-zinc-700 rounded-lg p-4">
                  {course.syllabus.map((item, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold">
                        Week {item.week}: {item.topic}
                      </h3>
                      <p className="text-zinc-300">{item.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CourseDetails;
