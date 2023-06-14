import { IGetIdolInfo } from "@/app/types/idol";
import {
  Avatar,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { FC, useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { useRouter } from "next/navigation";

declare enum TypeEnum {
  Princess = 1,
  Fairy = 2,
  Angel = 3,
  Ex = 5,
}

type Props = {
  row: IGetIdolInfo & { image?: string; favorite: boolean };
};
export const TableBodyRowField: FC<Props> = ({ row }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(row.favorite);

  const onFavorite = (idolId: number) => {
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
    const body = {
      idolId: idolId,
    };
    axios
      .post("http://localhost:3001/api/idols/favorite", body, {
        headers,
      })
      .then((data) => {
        window.alert("いいねしました");
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        window.alert("いいね時にエラーです");
      });
  };

  const onRemoveFavorite = (idolId: number) => {
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
      .delete(`http://localhost:3001/api/idols/favorite/${idolId}`, {
        headers,
      })
      .then((data) => {
        window.alert("いいねを取り消しました");
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        window.alert("いいねを取り消し時にエラーです");
      });
  };

  return (
    <TableRow key={row.id}>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {isFavorite ? (
          <IconButton
            color={"warning"}
            aria-label="add an alarm"
            onClick={() => {
              onRemoveFavorite(row.id);
            }}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            color={"warning"}
            aria-label="add an alarm"
            onClick={() => {
              onFavorite(row.id);
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </TableCell>

      <TableCell style={{ whiteSpace: "nowrap" }}>{row.id}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        <Avatar alt="顔写真" src={row.image} />
      </TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.resourceId}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {TypeEnum[row.type]}
      </TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.fullName}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.lastName}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.firstName}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.alphabetName}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.fullNameRuby}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.age}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {row.birthplace.name}
      </TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {row.handednessType.name}
      </TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.height}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.weight}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.hobby}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.speciality}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.favorites}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>{row.cv}</TableCell>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {row.colorCode}
        <Avatar sx={{ bgcolor: row.colorCode, width: 24, height: 24 }}>
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
  );
};
