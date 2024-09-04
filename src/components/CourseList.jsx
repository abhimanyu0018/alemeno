import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const courseList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center uppercase">
          Courses
        </h1>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by course name or instructor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
          <div className="absolute left-3 top-2.5 text-zinc-400">
            <SearchIcon />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Link
              to={`/course/${course.id}`}
              key={course.id}
              className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden hover:bg-zinc-700 transition-colors duration-200"
            >
              <div className="p-6">
                <div className="border-2 w-full h-40 flex justify-center items-center mb-4">
                  <img
                    src={course.thumbnail}
                    alt="Course thumbnail"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                <p className="text-zinc-400 mb-2">
                  Status:{" "}
                  <span
                    className={`${
                      course.enrollmentStatus === "Closed"
                        ? "bg-red-500"
                        : "bg-green-600"
                    } text-white rounded-xl px-2 py-1`}
                  >
                    {course.enrollmentStatus}
                  </span>
                </p>
                <p className="text-zinc-400">
                  Instructor:{" "}
                  <span className="text-white">{course.instructor}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
