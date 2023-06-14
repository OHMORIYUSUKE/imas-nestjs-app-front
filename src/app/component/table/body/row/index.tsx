import { IGetIdolInfo } from "@/app/types/idol";
import {
  Avatar,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { FC, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

declare enum TypeEnum {
  Princess = 1,
  Fairy = 2,
  Angel = 3,
  Ex = 5,
}

type Props = {
  row: IGetIdolInfo & { image?: string };
};
export const TableBodyRowField: FC<Props> = ({ row }) => {
  const [isFavorit, setIsFavorit] = useState(false);
  return (
    <TableRow key={row.id}>
      <TableCell style={{ whiteSpace: "nowrap" }}>
        {isFavorit ? (
          <IconButton
            color={"warning"}
            aria-label="add an alarm"
            onClick={() => setIsFavorit(!isFavorit)}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            color={"warning"}
            aria-label="add an alarm"
            onClick={() => setIsFavorit(!isFavorit)}
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
