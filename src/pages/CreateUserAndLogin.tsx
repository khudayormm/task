import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormContainer, SubmitHandler, TextFieldElement, useForm } from 'react-hook-form-mui';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createLoginUser } from '../libs/user';
import { TLoginCreateUser } from '../types/user';
import { axiosPrivate, axiosPublic } from '../api/axiosPublic';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link color="inherit" href="https://mui.com/">
                Practical Task
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    key: yup.string().required(),
    secret: yup.string().required()
})


export default function CreateUserAndLogin() {

    const { handleSubmit, setError, setFocus, formState: { isSubmitting, errors } } = useForm({ resolver: yupResolver(schema) })
    const mutate = createLoginUser()


    const onSubmit: SubmitHandler<TLoginCreateUser> = async(data) => {
        mutate.mutate(data, {
            onError(err: any) {
                if (!err.response.data.isOk) {
                    setError("key", {
                        message: "Bu kalit bilan user ro'yxatdan o'tgan!"
                    })
                }
            },

            async onSuccess(data) {
                try {
                    const res = await axiosPrivate.get(`/myself`)
                    localStorage.setItem("key", data.data.data.key)
                    localStorage.setItem("secret", data.data.data.secret)
                    window.location.reload()
                } catch (error) {
                    console.log(error)
                }
                

              
            }
        })       
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" mb={5}>
                        Sign up
                    </Typography>
                    <FormContainer onSuccess={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextFieldElement
                                    name="name"
                                    required
                                    fullWidth
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldElement
                                    type='email'
                                    required
                                    fullWidth
                                    label="Email"
                                    name="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldElement
                                    required
                                    fullWidth
                                    label="Key word"
                                    error={errors.key ? true : false}
                                    helperText={errors.key?.message}
                                    name="key"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldElement
                                    required
                                    fullWidth
                                    name="secret"
                                    label="Password"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={mutate.isLoading}                        
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {mutate.isLoading ? "Loading..." : "Sign Up"}
                        </Button>
                    </FormContainer>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}