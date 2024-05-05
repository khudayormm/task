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
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { createLoginUser } from '../libs/user';
import { TLoginCreateUser } from '../types/user';

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

const schema = zod.object({
    name: zod.string(),
    email: zod.string(),
    key: zod.string(),
    secret: zod.string()
})


export default function CreateUserAndLogin() {

    const { handleSubmit, control, formState: { isSubmitting, errors } } = useForm({ resolver: zodResolver(schema) })
    const mutate = createLoginUser()


    const onSubmit: SubmitHandler<TLoginCreateUser> = async(data) => {
        mutate.mutate(data)       
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
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextFieldElement
                                    type='email'
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Email"
                                    name="email"
                                    autoComplete="email-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldElement
                                    required
                                    fullWidth
                                    id="email"
                                    label="Key word"
                                    name="key"
                                    autoComplete="key-word"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextFieldElement
                                    required
                                    fullWidth
                                    name="secret"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
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