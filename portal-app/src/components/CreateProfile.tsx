import { memo, useCallback, useEffect, useState } from "react"
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardActions, Button, Avatar, Typography, Box, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
import { httpService } from "../services/httpService";
import { API_REQUESTS } from "../common/apiRequests";

const FormWrapper = styled(Box)`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

interface ICreateProfile {
    isShow: boolean;
    onClose: () => any;
}
interface IFormInput {
    role: string;
    firstname: string;
    lastname: string;
    gender: string;
    dob: string;
    address: string;
    description: string;
  }
  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
const CreateProfile = ({ isShow, onClose }: ICreateProfile) => {
    const [roles, setRoles] = useState([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FormData>();
    
      const password = watch("password");
    useEffect(() => {
        getRoles();
    }, [])

    const getRoles = async () => {
        try {
            const data = await httpService(API_REQUESTS.GET_ALL_ROLES);
            console.log(data)
            setRoles(data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = handleSubmit((data) => {
        if(data){
         console.log(data)
          
        }
        
      });

    return (
        <Box>
      <Grid container>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Card sx={{ marginTop: "20px" }}>

            <Box textAlign={"center"} margin={"50px"}>
            <Typography align="center" variant="h6">
              Register here..
            </Typography>
              <Box sx={{ "& .MuiTextField-root,MuiButton-root": { m: 1 } }}>
                <form onSubmit={onSubmit}>
                  <TextField
                    label="First name"
                    fullWidth
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                  />
                  <TextField
                    label="Last name"
                    fullWidth
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    error={!!errors.lastName}
                    helperText={errors.lastName ? errors.lastName.message : ""}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                  <TextField
                    label="Confirm password"
                    type="password"
                    fullWidth
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    error={!!errors.confirmPassword}
                    helperText={
                      errors.confirmPassword
                        ? errors.confirmPassword.message
                        : ""
                    }
                  />
                  <Button  variant="contained"
                    type="submit"
                    size="large"
                    fullWidth={true}>
                    Submit
                  </Button>
                </form>
                
              </Box>
     
            </Box>
          </Card>
        </Grid>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
      </Grid>
    </Box>
    )
}
export default CreateProfile;