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
))(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0)', // Fully transparent background
  flexDirection: 'row-reverse',
  minHeight: '0px', // Almost invisible
  padding: '0px', // No padding
  [`& .MuiAccordionSummary-content`]: {
    margin: 0, // Remove extra margin
    display: 'none', // Hide the content if it's not necessary
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  overflow: 'hidden',
  // maxHeight: '400px', // Default to collapsed
  transition: 'max-height 0.3s ease',
  margin: '0 auto', 
  backgroundColor: '#0a0a0a', 
}));

interface CustomizedAccordionProps {
  expanded: boolean;
  onChange: () => void;
  typographyComponent: React.ElementType;
}

export default function CustomizedAccordion({
  expanded,
  onChange,
  typographyComponent: Component,
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
        <Component />
      </AccordionDetails>
    </Accordion>
  );
}

