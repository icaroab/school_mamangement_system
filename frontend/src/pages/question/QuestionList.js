import { useEffect, useState } from 'react';
import {  Box, Menu, MenuItem, ListItemIcon, Container } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlueButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../components/SpeedDialTemplate';
import { getAllsections } from '../../redux/sectionRelated/sectionHandle';

const QuestionList = () => {
  const navigate = useNavigate()
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const titles = useSelector((state) => state.section.sectionesList);
  const isLoading = useSelector((state) => state.section.loading);
  // const { titles, isLoading } = useQuestion()

  const questionRows = titles && titles.length > 0 && titles.map((section) => {
    return {
      name: section.name,
      id: section._id,
      isAnswered: section.isAnswered,
    };
  })
  useEffect(() => {
    dispatch(getAllsections(currentUser._id, currentUser.role));

  }, [dispatch, currentUser])
  const SectionButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
    return (
      <ButtonContainer>
        <BlueButton variant="contained"
          onClick={() => navigate("/questions/" + currentUser._id+"/"+row.id)}>
          {
            currentUser.role === "Admin" ? "View" : "Test"
          }
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    // const handleClick = (event) => {
    //   setAnchorEl(event.currentTarget);
    // };
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
      //   action: () => deleteHandler(adminID, "sections")
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
            <TableTemplate columns={titles} rows={questionRows} buttonHaver={SectionButtonHaver} />
          }
          {currentUser.role === 'Admin' && <SpeedDialTemplate actions={actions} />}
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