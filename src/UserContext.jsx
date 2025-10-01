// import { createContext, useContext, useEffect, useState } from "react";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const [users, setUsers] = useState([]);         
//   const [currentUser, setCurrentUser] = useState(null);

//   // Load users once from db.json on mount
//   useEffect(() => {
//     fetch("http://localhost:3000/users")
//       .then((res) => res.json())
//       .then(setUsers)
//       .catch(() => setUsers([]));
//   }, []);

//   // Signup
//   const signup = async (user) => {
//     const newUser = { ...user, id: Date.now().toString()};

//     const res = await fetch("http://localhost:3000/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     });

//     if (res.ok) {
//       setUsers((prev) => [...prev, newUser]);
//       setCurrentUser(newUser);
//     }
//   };

//   // Login
//   const login = (email, password) => {
//     const user = users.find((u) => u.email === email && u.password === password);
//     if (!user) return false;
//     setCurrentUser(user);
//     return true;
//   };

//   // Update
//   const updateUser = async (updatedData) => {
//     if (!currentUser) return;

//     const updatedUser = { ...currentUser, ...updatedData };

//     const res = await fetch(`http://localhost:3000/users/${String(currentUser.id)}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedUser),
//     });

//     if (res.ok) {
//       setUsers((prev) =>
//         prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
//       );
//       setCurrentUser(updatedUser);
//     } else {
//       console.error("Failed to update user in db.json");
//     }
//   };

//   const logout = () => setCurrentUser(null);

//   return (
//     <UserContext.Provider
//       value={{ users, currentUser, signup, login, updateUser, logout }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// export const useUser = () => useContext(UserContext);
