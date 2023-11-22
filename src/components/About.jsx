import React, { useEffect, useState } from "react";

export default function About() {
  const host = "http://localhost:5000";
  const [user, setuser] = useState({ name: "", email: "", date: "" });
  const getuser = async () => {
    // api call
    const response = await fetch(`${host}/api/user/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setuser(json);
  };
  useEffect(() => {
    getuser();
    // eslint-disable-next-line
  }, []);

  return (

    <div className=" d-block container my-5" id="overlay">
      <div class="card ml-5 " style={{ width: "16rem" }}>
        
        <img 
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJ8AAACfCAMAAADQxfvSAAAAZlBMVEX///8AAADy8vInJyfS0tJOTk5HR0dKSkr8/PzKysrg4ODo6Oj19fVCQkK5ubmdnZ0XFxdiYmKnp6eUlJSHh4dycnIbGxssLCyysrJoaGiOjo4gICDZ2dlUVFRcXFyBgYEMDAw2NjZVK338AAAD6UlEQVR4nO2ci3aqMBBFDaDlJSiI2vqg/v9PFi7VWooCmXMCt2V/QLtXSCbJzMTZDI/lpLvMJfxhCEG6VkpthtZoxormK1XiD23SQOhtKjml7KFdfmLF8626chrapkbgvap7DkMLfcNP56qGN7TTDcs71eXKCRgN7VURJD+G7pONN3wIDPLdA7uC1bJQHNDRqq2JRs6JFwyjFzVNuwbeF5n5uRhGdje7TzInNKnnnXvZlbyaizjhW2+7ko1lRs/vP3gVJyOHBv9FU0+p5ZGvd3wS8VrZOmy9cCHQK0aQPAfdTKRXBBruhhIJ9ZTaU/0OYr8VUy8R6ymV8PTcjlvuU068Geht2/99K1veRof4vMQV4uYQv5z1gcM1xG/NOmpZ+jvvPQvWHmLJ9rYrtD1u8pv8foHf2Ncvz2/s8W/ym/yG9HuUiuzHy8jHb/L73X7zP+uHWb9j9+PNv78xfpPfWP3GHp8hekqR/NwU5BdTEkSBblnmJ2dGSXMD0+N0x2CSaxVrgp+08nFPRvDbA/0YKV4H6Mcow/mSwuB3doxCq4WLLydGhBaXBr/gFAljmF/M0APULq9w+k2CVft/7sSK1IcgL65WHEgFpCXIb8nRm6HOV28kPw/kx2rHCkB+rIa2sd+PQBGaE51LnH5Ndc3YvB4iF/GB58QOnZH3l0BWMLUdFeDH1Jt16Nht4ZXqJ5+AvOhSIt/iuG2you7Jkh23xXPs/YniCciMfiXSHCC9B1qvN/sK/1mXL7klvRvo0JYcsrjBryLUP8QsjDxi8LX9DD3a040x7NhyRfMewrt31NE7xXBPLv+Rn6uXyj+bemsW6M2/F1MPzXy9RNHS1JtgzUMg+ej3hae3Ba9MvTDTTfSaekY4dr+x72+6R1RW3rSO7jOL3Iye/hXEyAHB0r9iZgYE9+/aesX9g/v6reAosCth7yHi/AFX7yjNQNvcAZTXMLmbiLzJ5MzUC8V6SjHvwIgSNfMDI3qIGL1DnwQXgN+FdQ0JUPXflGHoxqjyeXFTgncAhvsLzK7kskcuYzfCVH7vmUewMXTwdv8MIYVW10E8Om/m5IjH8Ih5M/2IXHZc8JFNk81k+lkPWMB7jmY4DFNcQ+Jzdmn/YGMliN866Mo26XlzevirWyzmPZILfX+cCYMddfzKHrITuw/rDgk4ZjhupzVgO/yA95zs2aYX5KgWSX0O+aNw6MtKuzjemrYUKx1i0TZjp/VwaMUmw3E72/ibYYI7u6NY3gVsXGc4kluxHXJtxHO7iELaIvHcGi0nPy0mPxmTn4zJT8bkJ2PykzH5ybj5jf38B31ajuOr1zcc0d3til0l3T4AENhLjXCr51EAAAAASUVORK5CYII="
          alt="..."
        />
        
       
        {localStorage.getItem('token')?<div class="card-body">
          <h5 class="card-title">{user.name}</h5>
          <p class="card-text">{user.email}</p>
          <p class="card-text">{user.date}</p>
        </div>:<h4 className="text-center">Login with iNotebook</h4>}
        
      </div>
      <div className="text-center ">
       <h1>Hello {user.name} Welcomes you to iNotebook</h1>
       <h3><p>you choose the best website to save your daily notes and your daily work todo lists 
        This platform provides you a daily alert to see your notes.
        Enjoy iNotebook
       </p></h3>
      </div>
    </div>
  );
}
