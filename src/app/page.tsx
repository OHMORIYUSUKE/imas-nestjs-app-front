"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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

export type IGetIdolInfoArray = IGetIdolInfo[];
export type IGetIdolInfo = {
  id: number;
  sortId: number;
  resourceId: string;
  type: TypeEnum;
  fullName: string;
  displayName: string;
  lastName: string;
  firstName: string | null;
  alphabetName: string;
  fullNameRuby: string;
  age: number | null;
  birthplace: Birthplace;
  handednessType: HandednessType;
  height: number;
  weight: number;
  hobby: string;
  speciality: string;
  favorites: string;
  cv: string;
  colorCode: string;
  birthday: Birthday;
  constellation: Constellation;
  bloodType: BloodType;
  measurements: Measurements;
};
declare enum TypeEnum {
  Princess = 1,
  Fairy = 2,
  Angel = 3,
  Ex = 5,
}
type Birthplace = {
  id: number;
  name: string;
};
declare enum HandednessTypeIdEnum {
  _0 = 0,
  _1 = 1,
  _2 = 2,
}
declare enum HandednessTypeNameEnum {
  None = "\u8A2D\u5B9A\u306A\u3057",
  Right = "\u53F3",
  Left = "\u5DE6",
}
type HandednessType = {
  id: HandednessTypeIdEnum;
  name: HandednessTypeNameEnum;
};
type Birthday = {
  month: number;
  day: number;
};
type Constellation = {
  id: number;
  name: string;
};
declare enum BloodTypeIdEnum {
  _0 = 0,
  _1 = 1,
  _2 = 2,
  _3 = 3,
  _4 = 4,
}
declare enum BloodTypeNameEnum {
  None = "\u8A2D\u5B9A\u306A\u3057",
  A = "A",
  B = "B",
  AB = "AB",
  O = "O",
}
type BloodType = {
  id: BloodTypeIdEnum;
  name: BloodTypeNameEnum;
};
type Measurements = {
  bust: number;
  waist: number;
  hip: number;
};

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
            const res = data.data as IGetIdolInfoArray & { image?: string };
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
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
        display={"flex"}
      >
        <TextField
          type="text"
          fullWidth
          id="outlined-basic"
          label="検索(名前)"
          variant="outlined"
          name="search"
        />
        <Button variant="contained" type="submit">
          検索
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ whiteSpace: "nowrap" }}>ID</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>顔写真</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>ソートID</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>リソースID</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>タイプ</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>名前</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>姓</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>名</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>英語名</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>
                フルネーム（ルビ）
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>年齢</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>出身地</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>利き手</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>身長</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>体重</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>趣味</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>特技</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>お気に入り</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>CV</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>
                カラーコード
              </TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>誕生日</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>星座</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>血液型</TableCell>
              <TableCell style={{ whiteSpace: "nowrap" }}>
                スリーサイズ
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {idolsData.map((row) => (
              <TableRow key={row.id}>
                <TableCell style={{ whiteSpace: "nowrap" }}>{row.id}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  <Avatar alt="顔写真" src={row.image} />
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.sortId}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.resourceId}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {TypeEnum[row.type]}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.fullName}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.lastName}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.firstName}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.alphabetName}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.fullNameRuby}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.age}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.birthplace.name}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.handednessType.name}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.height}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.weight}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.hobby}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.speciality}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.favorites}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>{row.cv}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.colorCode}
                  <Avatar
                    sx={{ bgcolor: row.colorCode, width: 24, height: 24 }}
                  >
                    {" "}
                  </Avatar>
                </TableCell>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                >{`${row.birthday.month}月${row.birthday.day}日`}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.constellation.name}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {row.bloodType.name}
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {`${row.measurements.bust}-${row.measurements.waist}-${row.measurements.hip}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Footer></Footer>
    </>
  );
}
