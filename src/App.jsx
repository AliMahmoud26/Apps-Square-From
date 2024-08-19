import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("phone", phone);
    if (file) {
      formData.append("image", file);
    }
  
    // Log the FormData key-value pairs
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      const response = await fetch("https://www.appssquare.sa/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  }

  return (
    <>
      <div className="sign-up-form">
        <h2>Sign Up Form</h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="phone">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <input
            type="file"
            name="file"
            className="file"
            onChange={handleChange}
          />
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              style={{ maxWidth: "100%", marginTop: "10px" }}
            />
          )}
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
