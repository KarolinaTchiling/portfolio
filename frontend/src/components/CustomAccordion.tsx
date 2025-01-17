import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  '&::before': {
    display: 'none',
  },
  backgroundColor: '#0a0a0a', 
  // backgroundColor: 'blue', 
  display: 'flex',
  flexDirection: 'column',
  transition: 'flex 0.5s ease',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1px' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent background
  flexDirection: 'row-reverse',
  minHeight: '0px', // Almost invisible
  padding: '0px', // No padding
  [`& .MuiAccordionSummary-content`]: {
    margin: 0, // Remove extra margin
    display: 'none', // Hide the content if it's not necessary
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  overflow: 'hidden',
  // maxHeight: '400px', // Default to collapsed
  transition: 'max-height 0.3s ease',
  // maxWidth: '1000px',
  margin: '0 auto',
  backgroundColor: 'lightgreen', 
}));

interface CustomizedAccordionProps {
  expanded: boolean;
  onChange: () => void;
}

export default function CustomizedAccordion({
  expanded,
  onChange,
}: CustomizedAccordionProps) {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      style={{
        flexGrow: expanded ? 3 : 1, // Increase this value to grow the expanded accordion
        flexShrink: expanded ? 0 : 1, // Ensure expanded accordion doesn't shrink
        flexBasis: expanded ? '100%' : '0%', // Control the initial size more explicitly
        // transition: 'flex-grow 0s ease, flex-basis 0s ease', // Smooth resizing
        overflow: 'hidden', // Avoid content overflow
      }}
    >
      <AccordionSummary aria-controls="panel-content" id="panel-header">
        <Typography component="span"></Typography>
      </AccordionSummary>
      <AccordionDetails >
        <Typography >
          
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.

            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

