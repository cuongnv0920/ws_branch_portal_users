import FolderIcon from "@mui/icons-material/Folder";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { roomApi } from "api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "./styles.scss";

FilterByRoom.propTypes = {
  onChange: PropTypes.func,
};

function FilterByRoom(props) {
  const { onChange } = props;
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const rooms = await roomApi.getAll();
        setRoomList(rooms);
      } catch (error) {
        console.log("Có lỗi khi lấy dữ liệu Danh sách phòng/ ban.", error);
      }
    })();
  }, []);

  const handleRoomClick = (room) => {
    if (onChange) {
      onChange(room.id);
    }
  };

  return (
    <div className="roomList">
      <List
        component="nav"
        subheader={
          <ListSubheader className="roomList__title" component="nav">
            Danh sách Phòng/ Ban
          </ListSubheader>
        }
      >
        <div style={{ marginTop: "16px", backgroundColor: "#fff" }}>
          {roomList.map((room) => (
            <ListItemButton
              className="roomList__listButton listButton"
              onClick={() => handleRoomClick(room)}
            >
              <ListItemIcon className="listButton__listIcon">
                <FolderIcon />
              </ListItemIcon>
              <ListItemText
                primary={room.name}
                className="listButton__listText"
              />
            </ListItemButton>
          ))}
        </div>
      </List>
    </div>
  );
}

export default FilterByRoom;
