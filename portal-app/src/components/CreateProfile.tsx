import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card, CardContent, CardActions, Button, Avatar, Typography, Box, Container, TextField, FormControl, InputLabel, Select, MenuItem, DialogTitle, IconButton, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { httpService } from "../services/httpService";
import { API_REQUESTS } from "../common/apiRequests";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useSelector } from "react-redux";

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
  role: any;
  firstname: string;
  lastname: string;
  gender: string;
  dob: string;
  address: string;
  description: string;
}

const CreateProfile = ({ isShow, onClose }: ICreateProfile) => {
  const [roles, setRoles] = useState([]);
  const [profile, setProfileData] = useState<IFormInput>();
  const loggedUser = useSelector((state: any) => state.login.userDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<IFormInput>();

  useEffect(() => {
    getRoles();
    getProfile();
  }, [])

  useEffect(() => {
    if (profile) {
      setValue("gender", profile.gender);
      setValue("role", profile.role);
      setValue("lastname", profile.lastname);
      setValue("firstname", profile.firstname);
      setValue("dob", profile.dob);
      setValue("address", profile.address);
      setValue("description", profile.description);
    }
  }, [profile]);

  const getProfile = async () => {
    API_REQUESTS.GET_PROFILE_BY_USER_ID.URL_PARAMS.userId = loggedUser.id
    try {
      const data = await httpService(API_REQUESTS.GET_PROFILE_BY_USER_ID);
      setProfileData(data)
    } catch (error) {
      console.log(error)
    }
  }

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
  const onSubmit = async (data: any) => {
    console.log(loggedUser)
    // console.log({...data, userId: loggedUser.id});
    // return
    API_REQUESTS.CREATE_PROFILE.PAYLOAD = { ...data, userId: loggedUser.id }
    // e.preventDefault()
    try {
      const data = await httpService(API_REQUESTS.CREATE_PROFILE);
      onClose();
      console.log(data)
      // setRoles(data)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }} mb={3}>
        <AppBar color="transparent" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onClose}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Profile form
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Container >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Role</InputLabel>
                    <Controller
                      name="role"
                      control={control}
                      rules={{ required: 'Role is required' }}
                      defaultValue={profile?.role || ""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Role"
                          error={!!errors.role}
                        >
                          {roles.map((role: any) => (
                            <MenuItem key={role.id} value={role.id}>{role.roleName}</MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.role && <span style={{ marginLeft: '14px', fontSize: '0.75rem', color: "#d32f2f" }} >{errors.role.message as string}</span>}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="First Name"
                    fullWidth
                    margin="dense"
                    // value={profile?.firstname}
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
                    // value={profile?.lastname}
                    helperText={errors.lastname ? errors.lastname.message as string : ''}
                    {...register("lastname", { required: 'Last Name is required' })}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: 'Gender is required' }}
                      defaultValue={profile?.gender || ""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Gender"
                          error={!!errors.gender}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && <span style={{ marginLeft: '14px', fontSize: '0.75rem', color: "#d32f2f" }}>{errors.gender.message as string}</span>}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    // value={profile?.dob}
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
                    // value={profile?.address}
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
                    // value={profile?.description}
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
        </Grid>
        <Grid size={{ md: 3, sm: 0 }}></Grid>
      </Grid>
    </Box>
  )
}
export default memo(CreateProfile);