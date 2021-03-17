import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import * as yup from 'yup'




const Signup = () => {

    let [hide, setHide] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (value,{resetForm}) => {
            console.log(value)
            resetForm({value:''})
        },
        validationSchema: yup.object().shape({
            name: yup.string()
                .min(3, 'To short').required('Required'),
            email: yup.string()
                .email('Invalid email').required('Email is required'),
            password: yup.string().min(6, 'Toshort')
                .max(20, 'To long').required('Password is required'),
            confirmPassword: yup.string().oneOf(
                [yup.ref('password')],
                'Both password need to be same'
            )
            // yup.string().when('password',{
            //     is: value => (value && value.length>0 ? true : false),
            //     then:yup.string().oneOf(
            // [yup.ref('password')],
            // 'Both password need to be same'
            // )
            // })
        })
    });

    const handlePasswordSee = () => {
        setHide(!hide)
    }




    return (
        <div className='login_container'>
            <div className='main_login_div'>
                <h2 className='login_head'>Sign Up</h2>
                <div className='form_div'>
                    <form onSubmit={formik.handleSubmit} >
                        <div className='fields_div'>
                            <label htmlFor="email">Name</label>
                            <input
                                className='form_input'
                                type="text"
                                name="name"
                                id="name"
                                placeholder='Name'
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.errors.name && formik.touched.name ?
                                <div className='error'>{formik.errors.name}</div>
                                :
                                null
                            }
                        </div>
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
                        <div className='fields_div'>
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                className='form_input'
                                type={!hide ? "password" : 'text'}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder='password'
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
                            {!hide ?
                                <AiOutlineEye className='eye_icon' onClick={handlePasswordSee} />
                                :
                                <AiOutlineEyeInvisible
                                    className={hide ? 'eye_icon eye_icon_color' : 'eye_icon'}
                                    onClick={handlePasswordSee}
                                />
                            }
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ?
                                <div className='error err2'>{formik.errors.confirmPassword}</div>
                                :
                                null
                            }
                        </div>
                        <button className='login_btn' type="submit">Sign up</button>
                        <div className='create_div'>
                            <p>already have an account </p>
                            <Link className='create_link' to='/'>login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup