import React, { useEffect, useState } from "react";
import "./App.css";
import UserServices from "./Services/user.service";
import { UserModel } from "./Models/user.model";

function App() {
  const getUsersDB = async () => {
    let resUsers = await UserServices.getUsers();
    setUsers(resUsers.message);
  };

  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    getUsersDB();
  }, []);

  return (
    <>
      {users.map((user, index) => {
        return <div>{user.email}</div>;
      })}
    </>
  );
}

export default App;
