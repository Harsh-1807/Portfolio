import React from 'react';
import './Blogs.css';
import { FaMedium, FaDev } from 'react-icons/fa';

const blogs = [
  {
    title: "Optimization Algorithms in Machine Learning",
    platform: "Medium",
    icon: <FaMedium />,
    link: "https://medium.com/@nkharshbachhav/optimization-algorithms-in-machine-learning-8da9b5fc9f31",
    description: "Learn about the different optimization algorithms in machine learning.",
  },
  {
    title: "Normalization in DBMS : 1NF , 2NF , 3NF , BCNF , 4CNF , 5CNF",
    platform: "Medium",
    icon: <FaMedium />,
    link: "https://medium.com/@nkharshbachhav/normalization-in-dbms-1nf-2nf-3nf-bcnf-4cnf-5cnf-1ef07f82e39d",
    description: "How to reduce redundancy in a database.",
  },
  {
    title: "Understanding and Implementing Bias Correction",
    platform: "Medium",
    icon: <FaMedium />,
    link: "https://medium.com/@nkharshbachhav/understanding-and-implementing-bias-correction-10631de51996",
    description: "How to reduce bias in a machine learning model.",
  },
];

const Blogs: React.FC = () => {
  return (
    <div className="blogs-container">
      <h2 className="blogs-title">✍️ My Blog Posts</h2>
      <p className="blogs-intro">A collection of my thoughts and tutorials on software development.</p>
      <div className="blogs-grid">
        {blogs.map((blog, index) => (
          <a href={blog.link} key={index} target="_blank" rel="noopener noreferrer" className="blog-card" style={{ '--delay': `${index * 0.2}s` } as React.CSSProperties}>
            <div className="blog-icon animated-icon">{blog.icon}</div>
            <div className="blog-info animated-text">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-description">{blog.description}</p>
              <span className="blog-platform">{blog.platform}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
