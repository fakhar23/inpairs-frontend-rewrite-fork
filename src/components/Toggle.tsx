import {
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
  styled,
  toggleButtonGroupClasses,
} from "@mui/material";
import { COLORS } from "../../tailwind.config";

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: `1px solid ${COLORS.primary.DEFAULT}`,
    color: COLORS.primary.DEFAULT,
    [`&.${toggleButtonGroupClasses.disabled}`]: {
      border: `1px solid ${COLORS.primary.DEFAULT}`,
    },
  },
  [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
    {
      marginLeft: -1,
      borderLeft: "1px solid transparent",
    },
}));

export const ToggleButton = styled(MuiToggleButton)(() => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: COLORS.primary.DEFAULT,
  },
  "&.Mui-selected": {
    color: COLORS.primary,
  },
}));
