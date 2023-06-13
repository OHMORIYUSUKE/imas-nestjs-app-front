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
import { Avatar } from "@mui/material";
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
          .get("http://localhost:3001/api/idols/search", { headers })
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
  }, []);

  if (!idolsData) {
    return <>ロード中...</>;
  }
  return (
    <>
      <Header></Header>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>顔写真</TableCell>
              <TableCell>ソートID</TableCell>
              <TableCell>リソースID</TableCell>
              <TableCell>タイプ</TableCell>
              <TableCell>名前</TableCell>
              <TableCell>表示名</TableCell>
              <TableCell>姓</TableCell>
              <TableCell>名</TableCell>
              <TableCell>英語名</TableCell>
              <TableCell>フルネーム（ルビ）</TableCell>
              <TableCell>年齢</TableCell>
              <TableCell>出身地</TableCell>
              <TableCell>利き手</TableCell>
              <TableCell>身長</TableCell>
              <TableCell>体重</TableCell>
              <TableCell>趣味</TableCell>
              <TableCell>特技</TableCell>
              <TableCell>お気に入り</TableCell>
              <TableCell>CV</TableCell>
              <TableCell>カラーコード</TableCell>
              <TableCell>誕生日</TableCell>
              <TableCell>星座</TableCell>
              <TableCell>血液型</TableCell>
              <TableCell>スリーサイズ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {idolsData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <Avatar alt="顔写真" src={row.image} />
                </TableCell>
                <TableCell>{row.sortId}</TableCell>
                <TableCell>{row.resourceId}</TableCell>
                <TableCell>{TypeEnum[row.type]}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell>{row.displayName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.alphabetName}</TableCell>
                <TableCell>{row.fullNameRuby}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.birthplace.name}</TableCell>
                <TableCell>{row.handednessType.name}</TableCell>
                <TableCell>{row.height}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{row.hobby}</TableCell>
                <TableCell>{row.speciality}</TableCell>
                <TableCell>{row.favorites}</TableCell>
                <TableCell>{row.cv}</TableCell>
                <TableCell>
                  {row.colorCode}
                  <Avatar
                    sx={{ bgcolor: row.colorCode, width: 24, height: 24 }}
                  >
                    {" "}
                  </Avatar>
                </TableCell>
                <TableCell>{`${row.birthday.month}月${row.birthday.day}日`}</TableCell>
                <TableCell>{row.constellation.name}</TableCell>
                <TableCell>{row.bloodType.name}</TableCell>
                <TableCell>
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
