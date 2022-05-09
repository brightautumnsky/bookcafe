import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/users";
import { useNavigate } from "react-router-dom";

function authHoc(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.payload.isAuth) {
          if (option) {
            navigate("/login");
          }
        } else {
          if (adminRoute && !response.data.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, [dispatch, navigate]);

    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}

export default authHoc;
