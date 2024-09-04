import React, { useEffect } from "react";
// import { db } from "./firebase";
import { db } from "../firebase";
// Make sure to set up Firebase correctly in your project
import { collection, addDoc } from "firebase/firestore";

const AddDummyCourses = () => {
  const dummyCourses = [
    {
      id: 1,
      name: "Introduction to React Native",
      instructor: "John Doe",
      description:
        "Learn the basics of React Native development and build your first mobile app.",
      enrollmentStatus: "Open",
      thumbnail:
        "https://entri.app/blog/wp-content/uploads/2022/03/Untitled581-750x375.png",
      duration: "2 weeks",
      schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
      location: "Online",
      prerequisites: ["Basic JavaScript knowledge", "Familiarity with React"],
      syllabus: [
        {
          week: 1,
          topic: "Introduction to React Native",
          content:
            "Overview of React Native, setting up your development environment.",
        },
        {
          week: 2,
          topic: "Building Your First App",
          content:
            "Creating a simple mobile app using React Native components.",
        },
      ],
    },
    {
      id: 2,
      name: "Advanced JavaScript Concepts",
      instructor: "Jane Smith",
      description:
        "Dive deep into JavaScript and learn advanced topics for professional development.",
      enrollmentStatus: "Open",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl8XVlubbR9a7dJAQ3MAhfaSRy6ebW3TwStW81iqZvpfZDx7BW0-ntogjYMSKa54ELzJk&usqp=CAU",
      duration: "10 weeks",
      schedule: "Mondays and Wednesdays, 7:00 PM - 9:00 PM",
      location: "Online",
      prerequisites: ["Intermediate JavaScript knowledge"],
      syllabus: [
        {
          week: 1,
          topic: "Understanding Closures",
          content: "In-depth explanation of closures and their use cases.",
        },
        {
          week: 2,
          topic: "Asynchronous JavaScript",
          content: "Promises, async/await, and managing asynchronous code.",
        },
      ],
    },
    {
      id: 3,
      name: "Full-Stack Web Development with MERN",
      instructor: "David Brown",
      description:
        "Master full-stack development with MongoDB, Express, React, and Node.js.",
      enrollmentStatus: "In Progress",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOAtzhPhuuHGBFDyiKn4HoT48XHvtgEUK4Lg&s",
      duration: "12 weeks",
      schedule: "Weekends, 10:00 AM - 1:00 PM",
      location: "Online",
      prerequisites: ["Basic HTML, CSS, and JavaScript"],
      syllabus: [
        {
          week: 1,
          topic: "Introduction to MERN Stack",
          content:
            "Overview of the MERN stack and setup of the development environment.",
        },
        {
          week: 2,
          topic: "Building RESTful APIs with Node.js",
          content: "Creating and consuming APIs using Node.js and Express.",
        },
      ],
    },
    {
      id: 4,
      name: "Data Science with Python",
      instructor: "Emily White",
      description:
        "Learn data analysis, visualization, and machine learning using Python.",
      enrollmentStatus: "Open",
      thumbnail:
        "https://cdn.shopaccino.com/igmguru/products/data-science--with-python-igmguru_176161162_l.jpg?v=444",
      duration: "14 weeks",
      schedule: "Tuesdays and Thursdays, 6:00 PM - 9:00 PM",
      location: "Online",
      prerequisites: ["Basic Python knowledge"],
      syllabus: [
        {
          week: 1,
          topic: "Introduction to Data Science",
          content:
            "Overview of data science, its applications, and setting up your environment.",
        },
        {
          week: 2,
          topic: "Data Manipulation with Pandas",
          content: "Working with data using the Pandas library.",
        },
      ],
    },
    {
      id: 5,
      name: "UI/UX Design Fundamentals",
      instructor: "Michael Green",
      description:
        "Get started with UI/UX design and learn to create user-friendly interfaces.",
      enrollmentStatus: "Closed",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqq5GSDX2lWr1NgtoPdG0c1myfe_de54LRIBbkXOB-fcicdNjgc3BVDdNgtSzNUc0OkRs&usqp=CAU",
      duration: "6 weeks",
      schedule: "Wednesdays and Fridays, 5:00 PM - 7:00 PM",
      location: "Online",
      prerequisites: ["None"],
      syllabus: [
        {
          week: 1,
          topic: "Introduction to UI/UX Design",
          content:
            "Understanding the basics of user interface and user experience design.",
        },
        {
          week: 2,
          topic: "Wireframing and Prototyping",
          content: "Creating wireframes and prototypes for your designs.",
        },
      ],
    },
    {
      id: 6,
      name: "Cybersecurity Essentials",
      instructor: "Sophia Johnson",
      description:
        "Learn the fundamentals of cybersecurity to protect systems and data.",
      enrollmentStatus: "Open",
      thumbnail:
        "your.image.herehttps://images.credly.com/images/13f483bb-2a52-4197-b015-8f939d265520/Cybersec_Essentials_Badge.png",
      duration: "10 weeks",
      schedule: "Mondays and Wednesdays, 6:00 PM - 8:00 PM",
      location: "Online",
      prerequisites: ["Basic IT knowledge"],
      syllabus: [
        {
          week: 1,
          topic: "Introduction to Cybersecurity",
          content:
            "Overview of cybersecurity, its importance, and basic concepts.",
        },
        {
          week: 2,
          topic: "Network Security",
          content: "Understanding network security principles and practices.",
        },
      ],
    },
  ];

  useEffect(() => {
    const addCourses = async () => {
      const coursesCollection = collection(db, "courses");

      try {
        for (const course of dummyCourses) {
          await addDoc(coursesCollection, course);
        }
        console.log("Dummy courses added successfully");
      } catch (error) {
        console.error("Error adding dummy courses: ", error);
      }
    };

    addCourses();
  }, []);

  return (
    <div>
      <h1>Adding Dummy Courses to Firestore...</h1>
    </div>
  );
};

export default AddDummyCourses;
