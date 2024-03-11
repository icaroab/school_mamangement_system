import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Container } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { BlueButton, GreenButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import useQuestion from '../hook/useQuestion';
import SpeedDialTemplate from '../../components/SpeedDialTemplate';
import Popup from '../../components/Popup';

const QuestionList = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)
  const { titles, isLoading } = useQuestion()

  const questionRows = titles && titles.length > 0 && titles.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  })

  const SclassButtonHaver = ({ row }) => {
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
          onClick={() => navigate("/questions/" + row.id)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
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
        </Box>
        </Container>
      </>
    );
  }

  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Classes',
      //   action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {isLoading ?
        <div>Loading...</div>
        :
        <>
          {
            Array.isArray(titles) && titles.length > 0 &&
            <TableTemplate columns={titles} rows={questionRows} buttonHaver={SclassButtonHaver} />
          }
          {currentUser.role == 'Admin' && <SpeedDialTemplate actions={actions} />}
        </>
      }

    </>
  );
};

export default QuestionList;

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
  gap: 1rem;
`;