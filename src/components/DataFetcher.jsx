import React, { useState, useEffect } from "react";
import JapaneseTimeDisplay from "./JapaneseTimeDisplay";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // 取得したいユーザー名
  const userName = "任意の名前";

  useEffect(() => {
    const fetchUserData = async () => {
      const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
      const API_URL = `https://api.intra.42.fr/v2/users/${userName}`;
      // const API_URL = `https://api.intra.42.fr/v2/exams/19460/exams_users`;
      // const API_URL = `https://api.intra.42.fr/v2/campus/26/exams`;
      // const API_URL = `https://api.intra.42.fr/v2/campus/26/events`;
      // const API_URL = `https://api.intra.42.fr/v2/users?filter[kind]=student&`;
      // const API_URL = `https://api.intra.42.fr/v2/campus/26`;
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  console.log(userData);

  const { projects_users } = userData;

  const projects = projects_users.map((project) => {
    return {
      id: project.project.id,
      name: project.project.name,
      final_mark: project.final_mark,
      marked: project.marked,
      marked_at: project.marked_at,
      cursus_ids: project.cursus_ids,
    };
  });

  const cursusProjects = projects
    .filter((project) => project.cursus_ids.includes(21))
    .sort((a, b) => a.marked_at - b.marked_at);

  return (
    <div>
      <h1>{userData.login}</h1>
      {/* <h3>{userData.blackholed_at}</h3> */}
      {cursusProjects.map((project) => {
        return (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <p>final_mark: {project.final_mark}</p>
            <p>marked: {project.marked}</p>
            <p>
              marked_at:{" "}
              {project.marked_at ? (
                <JapaneseTimeDisplay utcTimeString={project.marked_at} />
              ) : (
                "Not yet"
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default UserInfo;
