import { Typography, Card, CardContent } from '@mui/material';

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>Welcome to Home Page</Typography>
        <Typography>This is your starting point. Navigate using the top bar.</Typography>
      </CardContent>
    </Card>
  );
}
