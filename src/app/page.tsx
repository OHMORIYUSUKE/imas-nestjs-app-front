"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Button, TextField } from "@mui/material";
import { Footer } from "./component/footer";
import { Header } from "./component/header";
import { IGetIdolInfo } from "./types/idol";
import { TableBodyField } from "./component/table/body";
import { TableHeaderField } from "./component/table/header";

export default function Home() {
  const router = useRouter();

  const [idolsData, setIdolsData] =
    useState<(IGetIdolInfo & { image?: string })[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSearchWord(data.get("search") as string);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const key = "access_token";
        const value = document.cookie.match(new RegExp(key + "=([^;]*);*"));
        if (value === null) {
          window.alert("ログインしてください");
          router.push("/login");
          return;
        }
        const token = value[1];
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(`http://localhost:3001/api/idols/search?name=${searchWord}`, {
            headers,
          })
          .then((data) => {
            const res = data.data as (IGetIdolInfo & { image?: string })[];
            setIdolsData(res);
            setIsLoading(false);
          })
          .catch((error) => {
            if (error.response.status === 401) {
              window.alert("ログインしてください");
              router.push("/login");
            } else {
              console.log(error);
              window.alert("エラーが発生しました");
            }
          });
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchWord]);

  if (isLoading || !idolsData) {
    return <>ロード中...</>;
  }
  return (
    <>
      <Header></Header>
      <Box height={70}></Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 1,
          position: "fixed",
          top: 50,
          left: 0,
          right: 0,
          zIndex: 999,
        }}
        display="flex"
        p={2}
        bgcolor="background.paper"
      >
        <TextField
          type="text"
          fullWidth
          id="outlined-basic"
          label="アイドルの名前で検索"
          variant="outlined"
          name="search"
        />
        <Button variant="contained" type="submit">
          検索
        </Button>
      </Box>
      <Box height={70}></Box>
      <TableContainer sx={{ maxHeight: 670 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeaderField />
          <TableBodyField idolsData={idolsData} />
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table"></Table>
      </TableContainer>
      <Footer></Footer>
    </>
  );
}
