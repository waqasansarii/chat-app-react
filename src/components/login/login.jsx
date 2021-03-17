import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as yup from 'yup'
import '../style/login_sigup_style.css'




const Login = () => {

    let [hide, setHide] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (value) => {
            console.log(value)
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .email('Invalid email').required('Email is required'),
            password: yup.string().min(6, 'Toshort')
                .max(20, 'To long').required('Password is required')
        })
    });

    const handlePasswordSee = () => {
        setHide(!hide)
    }



    return (
        <div className='login_container'>
            <div className='main_login_div'>
                <h2 className='login_head'>Log In</h2>
                <div className='form_div'>
                    <form onSubmit={formik.handleSubmit} >
                        <div className='fields_div'>
                            <label htmlFor="email">Email</label>
                            <input
                                className='form_input'
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email ?
                                <div className='error'>{formik.errors.email}</div>
                                :
                                null
                            }
                        </div>
                        <div className='fields_div'>
                            <label htmlFor="password">Password</label>
                            <input
                                className='form_input'
                                type={!hide ? "password" : 'text'}
                                name="password"
                                id="password"
                                placeholder='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            {!hide ?
                                <AiOutlineEye className='eye_icon' onClick={handlePasswordSee} />
                                :
                                <AiOutlineEyeInvisible
                                    className={hide ? 'eye_icon eye_icon_color' : 'eye_icon'}
                                    onClick={handlePasswordSee}
                                />
                            }
                            {formik.errors.password && formik.touched.password ?
                                <div className='error err2'>{formik.errors.password}</div>
                                :
                                null
                            }
                        </div>
                        <button className='login_btn' type="submit">Log In</button>
                        <div className='create_div'>
                            <p>or </p>
                            <Link className='create_link' to='/signup'>Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login