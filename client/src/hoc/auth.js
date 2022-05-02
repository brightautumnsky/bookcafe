import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/users";
// import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  let user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  function AuthenticationCheck(props) {
    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
          if (option) {
            // navigate("/login");
          }
        } else {
          if (adminRoute && !response.data.isAdmin) {
            // navigate("/");
          } else {
            if (option === false) {
              // navigate("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent user={user} />;
  }

  return AuthenticationCheck;
}
