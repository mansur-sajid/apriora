"use client";

import { IconButton } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoIcon from '@mui/icons-material/Info';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import MessageIcon from '@mui/icons-material/Message';

interface Props {
  selected: 'info' | 'people' | 'message';
  setSelected: (val: 'info' | 'people' | 'message') => void;
}

export const ControlButtons = ({ selected, setSelected }: Props) => {
  return (
    <div className="flex justify-start mt-3 gap-5">
      <IconButton
        onClick={() => setSelected('info')}
        className="hover:bg-white/20"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        {selected === 'info' ? (
          <InfoIcon className="text-blue-400" />
        ) : (
          <InfoOutlinedIcon className="text-white" />
        )}
      </IconButton>

      <IconButton
        onClick={() => setSelected('people')}
        className="hover:bg-white/20"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        {selected === 'people' ? (
          <PeopleAltIcon className="text-blue-400" />
        ) : (
          <PeopleAltOutlinedIcon className="text-white" />
        )}
      </IconButton>

      <IconButton
        onClick={() => setSelected('message')}
        className="hover:bg-white/20"
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
      >
        {selected === 'message' ? (
          <MessageIcon className="text-blue-400" />
        ) : (
          <MessageOutlinedIcon className="text-white" />
        )}
      </IconButton>
    </div>
  );
};
