import {alpha, AppBar, Box, InputBase, styled, Toolbar, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {RootState, useAppDispatch} from "../store";
import {updateSearchTitle} from "../store/todosSlice.ts";
import {useCallback} from "react";
import {useSelector} from "react-redux";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const TodoPageHeader = () => {
    const dispatch = useAppDispatch();

    const titleToSearch = useSelector((state: RootState) => state.todos.searchTitle);
    const handleUpdateSearchTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        dispatch(updateSearchTitle(e.target.value));
    }, [dispatch]);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant={"h6"}
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Todo App
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            value={titleToSearch}
                            inputProps={{'aria-label': 'search'}}
                            onChange={handleUpdateSearchTitle}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TodoPageHeader;