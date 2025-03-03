import { useState, useRef, ReactNode } from "react";
import { SxProps, Theme, useTheme } from "@mui/material/styles";
import {
    Stack,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import ColoredSvg from "@/components/ColoredSvg"; // Adjust as necessary
import useReactQuery from "@/hooks/useReactQuery";
import { RequestConfig } from "@/types/shared";
import { icons } from "@/constants/icons";
import { calculateSpacing } from "@/utils/helpers";
import { useTranslation } from "@/translation";
import ErrorText from "./ErrorText";

interface SimpleSelectProps<T> {
    value?: T;
    label?: string;
    titleRequired?: boolean;
    title: string;
    onChange: (value: T) => void;
    items?: T[];
    sxSelect?: SxProps<Theme>;
    sxIcon?: SxProps<Theme>;
    disabled?: boolean;
    displayEmpty?: boolean;
    displayKey: keyof T;
    requestConfig?: RequestConfig;
    error?: string;
}

const SimpleSelect = <T,>({
    label,
    titleRequired,
    title,
    value,
    onChange,
    items,
    sxSelect,
    sxIcon,
    disabled = false,
    displayEmpty = false,
    displayKey,
    requestConfig,
    error
}: SimpleSelectProps<T>) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const [open, setOpen] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Fetch options if metadataKey is provided, else use provided items
    const { data: metadataOptions, isLoading } = useReactQuery<T[]>({
        key: requestConfig?.queryKey ?? '',
        url: requestConfig?.url ?? '',
        enabled: !!requestConfig,
    });

    const options = requestConfig ? metadataOptions?.data ?? [] : items ?? [];

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <Stack flexDirection="column" justifyContent="space-between" gap={0.5}>
            <Typography variant="body2" sx={{ fontSize: 13, display: "flex", alignItems: "center" }}>
                {title}
                {titleRequired && (
                    <Typography component="span" sx={{ fontSize: 13, color: "error.main", marginLeft: 0.5 }}>
                        *
                    </Typography>
                )}
            </Typography>
            <FormControl
                error={!!error}
                sx={{
                    transition: "all ease-out 200ms",
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: error ? theme.palette.error.main : undefined, // Apply border color change
                        },
                        "&:hover fieldset": {
                            borderColor: error ? theme.palette.error.dark : undefined,
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
                        },
                        "&.Mui-disabled fieldset": {
                            borderColor: error ? theme.palette.error.main : theme.palette.action.disabled,
                        },

                    },
                    "& .MuiOutlinedInput-input:-webkit-autofill": {
                        boxShadow: (theme) => `0px 48px ${theme.palette.background.paper} inset !important`,
                        borderRadius: "0 !important",
                    },
                }}
                size="small"
            >
                <InputLabel>{label}</InputLabel>
                <Select
                    displayEmpty={displayEmpty}
                    value={value ? (value as any).id : ""}
                    label={label}
                    renderValue={(val) => {
                        const selectedItem = options.find((item) => (item as any).id === val);
                        return selectedItem ? (selectedItem as any)[displayKey] as ReactNode : "";
                    }}
                    sx={{ pr: calculateSpacing(10), width: "100%", ...sxSelect }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                width: selectRef.current ? selectRef.current.offsetWidth : "auto",
                                maxWidth: "100%",
                            },
                        },
                        sx: { maxHeight: 400 },
                    }}
                    onChange={(e) => {
                        const selectedItem = options.find((item) => (item as any).id === e.target.value);
                        if (selectedItem) onChange(selectedItem);
                    }}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    disabled={disabled || (isLoading && !!requestConfig)}
                    ref={selectRef}
                    IconComponent={() => (
                        <Stack
                            onClick={open ? handleClose : handleOpen}
                            height={open ? 24 : 16}
                            sx={{ cursor: "pointer", rotate: open ? "180deg" : "0deg", pb: 3, ...sxIcon }}
                        >
                            {requestConfig && isLoading ?
                                <CircularProgress size={24} /> :
                                <ColoredSvg
                                    src={icons.chevronDown}
                                    width={24}
                                    height={24}
                                    color={theme.palette.text.primary}
                                />
                            }
                        </Stack>
                    )}
                >
                    {options.length > 0 ? (
                        options.map((item, i) => (
                            <MenuItem key={i} value={(item as any).id} sx={{ width: "100%", whiteSpace: "normal" }}>
                                <Typography fontWeight={500}>{(item as any)[displayKey]}</Typography>
                            </MenuItem>
                        ))
                    ) : (
                        <Typography padding={1} fontWeight={500}>{t('No Options')}</Typography>
                    )}
                </Select>
                <ErrorText error={error} />
            </FormControl>
        </Stack>
    );
};

export default SimpleSelect;
