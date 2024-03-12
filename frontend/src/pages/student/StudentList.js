import {  useState } from 'react';
import { IconButton,  Menu, MenuItem, ListItemIcon } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from 'react-router-dom';
import { BlueButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';

import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import styled from 'styled-components';
import useStudent from '../hook/useStudent';


const StudentList = () => {
    const navigate = useNavigate()
    const { students, isLoading } = useStudent()
    const studentRows = students && students.length > 0 && students.map((student) => {
        return {
            name: student.name,
            id: student._id,
        };
    })

    const SectionButtonHaver = ({ row }) => {
        const actions = [
            { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
            { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
        ];
        return (
            <ButtonContainer>
                <IconButton color="secondary">
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton variant="contained"
                    onClick={() => navigate("/student/" + row.id)}>
                    View
                </BlueButton>
                <ActionMenu actions={actions} />
            </ButtonContainer>
        );
    };

    const ActionMenu = ({ actions }) => {
        const [anchorEl, setAnchorEl] = useState(null);

        const open = Boolean(anchorEl);

        // const handleClick = (event) => {
        //     setAnchorEl(event.currentTarget);
        // };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: styles.styledPaper,
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {actions.map((action, id) => (
                        <MenuItem onClick={action.action} key={id}>
                            <ListItemIcon fontSize="small">
                                {action.icon}
                            </ListItemIcon>
                            {action.name}
                        </MenuItem>
                    ))}
                </Menu>
            </>
        );
    }

    return (
        <>
            {isLoading ?
                <div>Loading...</div>
                :
                <>
                    {
                        Array.isArray(students) && students.length > 0 &&
                        <TableTemplate columns={students} rows={studentRows} buttonHaver={SectionButtonHaver} />
                    }
                </>
            }

        </>
    );
};

export default StudentList;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;