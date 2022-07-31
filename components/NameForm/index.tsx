import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AppContext } from 'contexts/App'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TextField, Button } from '@mui/material'
import { BaseForm } from './styled'

const NameForm = () => {
    const { name, setName } = useContext(AppContext)
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            name,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Tem de ter 3 caracteres ou mais')
                .max(30, 'Tem de ter 30 caracteres ou menos')
                .required('Preencha seu nome'),
        }),
        onSubmit: (values) => {
            setName(values.name)
            router.push('/cartas')
        },
    })

    return (
        <BaseForm
            onSubmit={(e) => {
                e.preventDefault()
                formik.handleSubmit()
            }}
        >
            <TextField
                autoFocus
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.errors.name}
                id='name'
                inputProps={formik.getFieldProps('name')}
                label='Nome'
                required
                sx={{
                    marginBottom: formik.touched.name && formik.errors.name ? 2 : 5,
                }}
                variant='outlined'
            />
            <Button
                color='success'
                disabled={!formik.isValid}
                disableElevation
                sx={{ width: '100%' }}
                type='submit'
                variant='contained'
            >
                Ver Cartas
            </Button>
        </BaseForm>
    )
}

export default NameForm
