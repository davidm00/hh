import React, { useContext, useEffect, useState } from "react";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

const AuthRegister = () => {
    const navigate = useNavigate();
    const {setLocalUser} = useContext(UserContext);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
        }
        // TODO: redirect user to main app
        setAdd(false);
        setLocalUser(newUser)
        navigate("/communities");
      });
    }
  }, [newUser, add, navigate, setLocalUser]);

  const onChangeHandler = (prop) => (event) => {
    setNewUser({ ...newUser, [prop]: event.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthForm
        type="register"
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthRegister;
