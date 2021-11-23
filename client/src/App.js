import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.action";


const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");


  useEffect(() => {
    setUid(id)
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [token, uid, dispatch, id]);

  return (
    <Routes />
  );
};

export default App;