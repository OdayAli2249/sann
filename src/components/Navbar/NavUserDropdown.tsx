import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import useDropdown from "@/hooks/useDropdown";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import CustomPopper from "../CustomPopper";
import { logout, useAuthContext } from "@/context/auth";
import { useTranslation } from "@/translation";
import { serveFile } from "@/utils/helpers";
import { Divider, Typography, useTheme } from "@mui/material";
import ColoredSvg from "../ColoredSvg";
import { icons } from "@/constants/icons";
export default function NavUserDropdown() {
  const { anchorRef, open, handleToggle, handleClose, handleListKeyDown } =
    useDropdown();
  const navigate = useNavigate();
  const { dispatch, state: { user } } = useAuthContext();
  const theme = useTheme();

  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={2}>
      <Box ref={anchorRef}>
        <Button
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{
            color: "text.primary",
            display: { xs: "none", sm: "none", md: "flex" },
            alignItems: 'space',
            justifyContent: "space-between",
            whiteSpace: "nowrap",
            minWidth: 200
          }}
          startIcon={
            <Avatar
              alt=""
              sx={{ width: "45px", height: "45px", cursor: "pointer" }}
              src={
                user?.photo &&
                  user?.photo !== null
                  ? serveFile(user?.photo as string)
                  : ""
              }
            />
          }
          endIcon={<ExpandMoreIcon />}
        >
          {user?.name ?? "User Name"}
        </Button>
        <Box sx={{
          display: { xs: "flex", sm: "flex", md: "none" },
          width: 200, justifyContent: 'flex-end'
        }}>
          <IconButton
            onClick={handleToggle}
            sx={{ alignSelf: 'flex-end' }}
          >
            <Avatar
              alt=""
              sx={{ width: "45px", height: "45px", cursor: "pointer" }}
              src={
                user?.photo &&
                  user?.photo !== null
                  ? serveFile(user?.photo as string)
                  : ""
              }
            />
          </IconButton>
        </Box>
      </Box>

      <CustomPopper
        {...{ anchorRef, handleClose, open }}
        popperPlacement="auto"
        paperElevation={6}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: '0.8rem',
          },
        }}
      >
        <MenuList
          autoFocusItem={open}
          id="composition-menu"
          aria-labelledby="composition-button"
          onKeyDown={handleListKeyDown}
          sx={{ padding: 2 }}
        >
          <MenuItem onClick={() => navigate("/")} sx={{ padding: 0, paddingY: 1 }}>
            <Box display="flex" alignItems="flex-start" gap={1}>
              <Avatar
                alt=""
                sx={{ width: "40px", height: "40px", cursor: "pointer" }}
                src={
                  user?.photo &&
                    user?.photo !== null
                    ? serveFile(user?.photo as string)
                    : ""
                }
              />
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="body2" color="text.secondary" fontSize={14}>{user?.name ?? "User Name"}</Typography>
                <Typography variant="body2" color="text.secondary" fontSize={12}>{user?.email}</Typography>
              </Box>
            </Box>
          </MenuItem>
          <Divider />
          <MenuItem
            sx={{
              padding: 1,
              borderRadius: '0.5rem', backgroundColor: '#fcefef',  // TODO Fix this color
            }}
            onClick={() => {
              handleClose();
              dispatch(logout());
              navigate("/");
            }}
          >
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: 'flex-start',
              width: '100%',
              gap: 1,
            }}
            >
              <ColoredSvg
                src={icons.logout}
                color={theme.palette.error.main}
              />
              <Typography color={theme.palette.error.main} fontSize={14}>{t("Logout")}</Typography>
            </Box>
          </MenuItem>
        </MenuList>
      </CustomPopper>
    </Stack >
  );
}
