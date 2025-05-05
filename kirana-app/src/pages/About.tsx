import { Typography, Card, CardContent } from '@mui/material';

export default function About() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>About Us</Typography>
        <Typography>This is the About page, built with MUI and React Router.</Typography>
      </CardContent>
    </Card>
  );
}
