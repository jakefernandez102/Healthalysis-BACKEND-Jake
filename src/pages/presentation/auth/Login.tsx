/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prettier/prettier */
import React, { FC, useCallback, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useFormik } from 'formik';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import AuthContext from '../../../contexts/authContext';
import Spinner from '../../../components/bootstrap/Spinner';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = () => {

	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
}

LoginHeader.defaultProps = {
	isNewUser: false,
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = () => {
	const { setUser,setUserInfo } = useContext(AuthContext);

	const [signInPassword, setSignInPassword] = useState<boolean>(false);

	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/'), [navigate]);


	const passwordCheck = async (email: string, password: string) => {
		

		const response = await fetch('http://api.healthalysis.com/auth/backoffice/login',{
		method:'POST',
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify({email,password})
		})
		const result = await response.json();
		console.log(result)
		console.log(result.message)

		if(result.error || result.message){
			console.error("Error:", result.message);
			return false
		}
		console.log("Success:", result);
		setUserInfo(result)
		return true
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			loginUsername: '',
			loginPassword: '',
		},
		validate: (values) => {
			const errors: { loginUsername?: string; loginPassword?: string } = {};

			if (!values.loginUsername) {
				errors.loginUsername = 'Required';
			}

			if (!values.loginPassword) {
				errors.loginPassword = 'Required';
			}

			return errors;
		},
		validateOnChange: false,
		onSubmit: (values) => {
			handleSubmit(values)
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	
	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			setSignInPassword(true);
			setIsLoading(false);
		}, 1000);
	};

	async function handleSubmit(values:any){
		if (await passwordCheck(values.loginUsername, values.loginPassword)) {

				if (setUser) {
					setUser(values.loginUsername);
					
				}
				handleOnClick();
			} else {
				formik.setFieldError('loginPassword', 'User email and password do not match.');
			}
	}

	return (
		<PageWrapper
			isProtected={false}
			title='Login'
			className='bg-dark'>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className='text-decoration-none  fw-bold display-2 text-light'
										aria-label='Healthalysis'>
										<Logo width={200} />
									</Link>
								</div>

								<LoginHeader/>

								<form className='row g-4'>
									<div className='col-12'>
										<FormGroup
											id='loginUsername'
											isFloating
											label='Your email '
											className={classNames({
												'd-none': signInPassword,
											})}>
											<Input
												autoComplete='user email'
												value={formik.values.loginUsername}
												isTouched={formik.touched.loginUsername}
												invalidFeedback={
													formik.errors.loginUsername
												}
												isValid={formik.isValid}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												onFocus={() => {
													formik.setErrors({});
												}}
											/>
										</FormGroup>
										{signInPassword && (
											<div className='text-center h4 mb-3 fw-bold'>
												Hi, {formik.values.loginUsername}.
											</div>
										)}
										<FormGroup
											id='loginPassword'
											isFloating
											label='Password'
											className={classNames({
												'd-none': !signInPassword,
											})}>
											<Input
												type='password'
												autoComplete='current-password'
												value={formik.values.loginPassword}
												isTouched={formik.touched.loginPassword}
												invalidFeedback={
													formik.errors.loginPassword
												}
												validFeedback='Looks good!'
												isValid={formik.isValid}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										{!signInPassword ? (
											<Button
												color='warning'
												className='w-100 py-3'
												isDisable={!formik.values.loginUsername}
												onClick={handleContinue}>
												{isLoading && (
													<Spinner isSmall inButton isGrow />
												)}
												Continue
											</Button>
										) : (
											<div className='row d-flex justify-content-between'>
												<Button
													color='warning'
													className='col-5 py-3 '
													onClick={formik.handleSubmit}>
													Login
												</Button>
												<Button
													color='dark'
													className='col-5 py-3'
													onClick={()=>setSignInPassword(false)}>
													Go Back
												</Button>
											</div>
										)}
									</div>
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className='text-decoration-none me-3 link-light'
							>
								Privacy policy
							</a>
							<a
								href='/'
								className='text-decoration-none me-3 link-light'
							>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

Login.defaultProps = {
	isSignUp: false,
};

export default Login;
