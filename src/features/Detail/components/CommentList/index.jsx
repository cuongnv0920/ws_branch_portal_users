import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import { commentApi } from "api";
import { getEdit, removeGetEdit } from "features/Detail/commentClice";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../Delete";
import Edit from "../Edit";
import "./styles.scss";

CommentList.propTypes = {
  commentList: PropTypes.array,
  refeshCommnetList: PropTypes.func,
};

CommentList.defaultProps = {
  commentList: [],
};

function CommentList(props) {
  const { commentList } = props;
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const logged = useSelector((state) => state.auth.current);
  const emailLogged = logged.email;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function showMenuAction(email) {
    if (email === emailLogged) {
      return true;
    } else {
      return false;
    }
  }

  const handleCloseDialogEdit = () => {
    const action = removeGetEdit();
    dispatch(action);
    setOpenDialogEdit(false);

    const { refeshCommnetList } = props;
    if (refeshCommnetList) {
      refeshCommnetList();
    }
  };

  const handleOpenDialogEdit = async (event) => {
    try {
      const id = event.currentTarget.id;
      const comment = await commentApi.get(id);
      const action = getEdit(comment);
      await dispatch(action);

      setOpenDialogEdit(true);
    } catch (error) {
      enqueueSnackbar("Lấy dữ liệu có lỗi, vui lòng liên hệ quản trị.", {
        variant: "error",
      });
    }
  };

  const handleCloseDialogDelete = () => {
    const action = removeGetEdit();
    dispatch(action);
    setOpenDialogDelete(false);

    const { refeshCommnetList } = props;
    if (refeshCommnetList) {
      refeshCommnetList();
    }
  };

  const handleOpenDialogDelete = async (event) => {
    try {
      const id = event.currentTarget.id;
      const comment = await commentApi.get(id);
      const action = getEdit(comment);
      await dispatch(action);

      setOpenDialogDelete(true);
    } catch (error) {
      enqueueSnackbar("Lấy dữ liệu có lỗi, vui lòng liên hệ quản trị.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="commentList">
      {commentList.map((comment, _) => (
        <Stack direction="row" spacing={2} className="commentList__stack">
          <Avatar className="commentList__avatar">
            {comment.user.email.slice(0, 1)}
          </Avatar>
          <div className="commentList__content">
            <h4>{comment.user.fullName}</h4>
            <h5>{`- ${comment.content}`}</h5>
          </div>

          {showMenuAction(comment.user.email) && (
            <Stack direction="row" spacing={1}>
              <IconButton
                className="commentList__buttonAction"
                id={comment.id}
                onClick={handleOpenDialogEdit}
                size="small"
                title="Sửa"
              >
                <EditIcon sx={{ color: "#00a152" }} fontSize="small" />
              </IconButton>

              <IconButton
                className="commentList__buttonAction"
                id={comment.id}
                onClick={handleOpenDialogDelete}
                size="small"
                title="Xóa"
              >
                <DeleteIcon sx={{ color: "#f50057" }} fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      ))}

      <Dialog
        fullWidth="sm"
        maxWidth="sm"
        open={openDialogEdit}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogEdit(event, reason);
          }
        }}
      >
        <DialogContent>
          <Edit closeDialog={handleCloseDialogEdit} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogEdit}
            className="dialogButtonCancel"
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="lg"
        open={openDialogDelete}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleCloseDialogDelete(event, reason);
          }
        }}
      >
        <DialogContent>
          <Delete closeDialog={handleCloseDialogDelete} />
        </DialogContent>
        <DialogActions className="dialogAction">
          <Button
            onClick={handleCloseDialogDelete}
            className="dialogButtonCancel"
          >
            Thoát
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CommentList;
