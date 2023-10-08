import React, { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  // console.log(isLogin)
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle logout
  const handleLogout = () => {
    try {
      localStorage.clear();
      dispatch(authActions.logout());
      toast.success("logout Successfully");
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">Blog App</Typography>
          {isLogin && (
            <>
              <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, val) => setValue(val)}
                >
                  <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                  <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                  <Tab
                    label="Create Blog"
                    LinkComponent={Link}
                    to="/create-blog"
                  />
                </Tabs>
              </Box>
            </>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
