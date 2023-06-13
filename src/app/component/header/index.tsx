import { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

type Props = {};

export const Header: FC<Props> = ({}) => {
  const router = useRouter();
  const [userData, setUserData] = useState<
    | {
        email: string;
        id: number;
      }
    | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    window.alert("ログアウトしました");
    const key = "access_token";
    document.cookie = `${key}=; max-age=0`;
    router.push("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = "access_token";
        const value = document.cookie.match(new RegExp(key + "=([^;]*);*"));
        if (value === null) {
          return;
        }
        const token = value[1];
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get("http://localhost:3001/api/user/profile", { headers })
          .then((data) => {
            const res = data.data as {
              email: string;
              id: number;
            };
            setUserData(res);
            setIsLoading(false);
          })
          .catch((error) => {
            setUserData(undefined);
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              アイドル管理ダッシュボード
            </Typography>
            {userData === undefined ? (
              <Button color="inherit">Login</Button>
            ) : (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem>E-mail : {userData.email}</MenuItem>
                  <MenuItem>ID : {userData.id}</MenuItem>
                  <MenuItem onClick={logOut}>
                    <span style={{ color: "red" }}>ログアウト</span>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
