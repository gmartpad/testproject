import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AppContext } from 'contexts/App'
import { useContext } from 'react'
import { Input, ErrorSpan, SubmitButton } from './styled'
import { useRouter } from 'next/router'

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
        onSubmit: values => {
            setName(values.name)
            router.push('/cartas')
        }
    })

    return (
        <form 
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
            }}        
            onSubmit={formik.handleSubmit}
        >
            <label htmlFor="name">
                <h2>Digite seu nome:</h2>
            </label>
            <Input
                id="name"
                type="text"
                {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
                <ErrorSpan>{formik.errors.name}</ErrorSpan>
            ) : null}
            <SubmitButton disabled={!formik.isValid} type="submit">
                Ver Cartas
            </SubmitButton>
        </form>
    )
}

export default NameForm