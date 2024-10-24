import { memo, useCallback, useEffect, useState } from "react"
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardActions, Button, Avatar, Typography, Box, Container, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
import { httpService } from "../services/httpService";
import { API_REQUESTS } from "../common/apiRequests";
import { useSelector } from "react-redux";

interface IFormInput {
    role: string;
    firstname: string;
    lastname: string;
    gender: string;
    dob: string;
    address: string;
    description: string;
  }
const CreateProfile2 = () => {
    const [roles, setRoles] = useState([]);
    const loggedUser = useSelector((state: any) => state.login.userDetails);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IFormInput>();

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

     // Define the submit handler
  const onSubmit = async (data:any) => {
    console.log(loggedUser)
    // console.log({...data, userId: loggedUser.id});
    // return
    API_REQUESTS.CREATE_PROFILE.PAYLOAD = {...data, userId: loggedUser.id}
    // e.preventDefault()
    try {
        const data = await httpService(API_REQUESTS.CREATE_PROFILE);
        console.log(data)
        // setRoles(data)
    } catch (error) {
        console.log(error)
    }
    
}

    return (
        <Container >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                {...register("role", { required: 'Role is required' })}
                                label="Role"
                                error={!!errors.role}
                            >
                                {roles.map((role: any) => (
                                    <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>
                                ))}
                            </Select>
                            {errors.role && <span style={{marginLeft: '14px', fontSize:'0.75rem', color:"#d32f2f"}} >{errors.role.message as string}</span>}
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="First Name"
                            fullWidth
                            margin="dense"
                            error={!!errors.firstname}
                            helperText={errors.firstname && "Please First your name"}
                            // helperText={'Please enter first name'}
                            {...register("firstname", { required: 'First Name is required' })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Last Name"
                            fullWidth
                            margin="dense" // Changed to dense for smaller spacing
                            error={!!errors.lastname}
                            helperText={errors.lastname ? errors.lastname.message as string : ''}
                            {...register("lastname", { required: 'Last Name is required' })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth error={!!errors.gender}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                                {...register("gender", { required: 'Gender is required' })}
                                label="Gender"
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                            {errors.gender && <span style={{marginLeft: '14px', fontSize:'0.75rem', color:"#d32f2f"}}>{errors.gender.message as string}</span>}
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            label="Date of Birth"
                            type="date"
                            fullWidth
                            margin="dense" // Changed to dense for smaller spacing
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.dob}
                            helperText={errors.dob ? errors.dob.message as string : ''}
                            {...register("dob", { required: 'Date of Birth is required' })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Address"
                            fullWidth
                            margin="dense" // Changed to dense for smaller spacing
                            error={!!errors.address}
                            helperText={errors.address ? errors.address.message as string : ''}
                            {...register("address", { required: 'Address is required' })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Description"
                            multiline
                            rows={2} // Reduced rows for a more compact look
                            fullWidth
                            margin="dense" // Changed to dense for smaller spacing
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message as string : ''}
                            {...register("description", { required: 'Description is required' })}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }} textAlign="center">
                        <Button type="submit" variant="outlined" color="warning">Create Profile</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}
export default CreateProfile2;