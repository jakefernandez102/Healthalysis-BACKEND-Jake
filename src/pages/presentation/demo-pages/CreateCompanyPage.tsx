import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Avatar from '../../../components/Avatar';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Select from '../../../components/bootstrap/forms/Select';
import CommonMyWallet from '../../_common/CommonMyWallet';
import USERS from '../../../common/data/userDummyData';
import Icon from '../../../components/icon/Icon';
import { dashboardPagesMenu } from '../../../menu';
import showNotification from '../../../components/extras/showNotification';
import validateBranches from './helper/editPageBranchesValidate';
import validateCompany from './helper/editPagesCompanyValidate';
import { useParams } from 'react-router-dom';


type TTabs = 'Account Details' | 'Branches' | 'My Wallet';
interface ITabs {
	[key: string]: TTabs;
}
const EditBoxedPage = () => {
	const TABS: ITabs = {
		ACCOUNT_DETAIL: 'Account Details',
		BRANCHES: 'Branches',
		MY_WALLET: 'My Wallet',
	};
	const [activeTab, setActiveTab] = useState<TTabs>(TABS.ACCOUNT_DETAIL);
	const [actualCompany,setActualCompany]=useState<any>()
	const {id} = useParams()

	useEffect(()=>{
		fetch(`http://api.healthalysis.com/company/${id}`)
		.then(response => response.json())
		.then(company => setActualCompany(company))
	},[id])

	const formik = useFormik({
		initialValues: {
			name: 'CBUM Gym',
			domain: 'www.cbumgym.com',
			email: 'cbumgym@mail.com',
			branches: '64f4eff1ac24b9ee7fe6e8c1',
			image: 'test/img/cubumgym.jpg',
			companyStatus: '0',
			defaultLanguage: '1',
		},
		validate: validateCompany,
		onSubmit: () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				"The user's account details have been successfully updated.",
			);
			console.log(formik.values)
		},
	});

	useEffect(()=>{
		formik.setValues({
			name: actualCompany?.name ,
			domain: actualCompany?.domain,
			email: actualCompany?.email ,
			branches:actualCompany?.branches ?? '',
			image: actualCompany?.image ,
			companyStatus: actualCompany?.companyStatus ,
			defaultLanguage: actualCompany?.defaultLanguage ,
		})
	},[id,actualCompany])

	const formikBranches = useFormik({
		initialValues: {
			branchName: 'Chicago - cbumgym',
			branchEmail: 'losangeles@cbumgym.com',
			image: 'test/test.cbumgym.png',
			branchStatus: '1',
		},
		validate: validateBranches,
		onSubmit: () => {
			showNotification(
				
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>Updated Successfully</span>
				</span>,
				"The user's address have been successfully updated.",
			);
			
		},
	});
	
const handleOnSubmit= (e)=>{
	e.preventDefault()
// TODO: IMPLEMENTAR REQUEST PARA CREAR COMPANY
	try {
		console.log('first')
	} catch (error) {
		console.log(error)
	}

	console.log(formik.values)
	console.log(formikBranches.values)
}
	return (
		<PageWrapper title={dashboardPagesMenu.companies.subMenu.createCompany.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Companies', to: '/' },
							{ title: 'Create Company', to: '/' },
						]}
					/>
					<SubheaderSeparator />
					<span className='text-muted'>John Doe</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button
						color='dark'
						isLight
						icon='Add'
						onClick={() => {
							setActiveTab(TABS.ACCOUNT_DETAIL);
							formik.setValues({
								name: '',
								domain: '',
								email: '',
								branches: '',
								image: '',
								companyStatus: '',
								defaultLanguage: '',
							});
							formikBranches.setValues({
								branchName: '',
								branchEmail: '',
								image: '',
								branchStatus: '0',
							});
						}}>
						Add New
					</Button>
					{TABS.ACCOUNT_DETAIL === activeTab && (
						<Button color='info' isOutline icon='Save' onClick={handleOnSubmit}>
							Save
						</Button>
					)}
					{TABS.BRANCHES === activeTab && (
						<Button
							color='info'
							isOutline
							icon='Save'
							onClick={handleOnSubmit}>
							Save
						</Button>
					)}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-xl-3 col-lg-4 col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='Person' iconColor='info'>
									<CardTitle tag='div' className='h5'>
										Account Settings
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										Company Information
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<Button
											icon='Contacts'
											color='info'
											className='w-100 p-3'
											isLight={TABS.ACCOUNT_DETAIL !== activeTab}
											onClick={() => setActiveTab(TABS.ACCOUNT_DETAIL)}>
											{TABS.ACCOUNT_DETAIL}
										</Button>
									</div>
									<div className='col-12 border-bottom' />
									<div className='col-12'>
										<Button
											icon='Notifications'
											color='success'
											className='w-100 p-3'
											isLight={TABS.BRANCHES !== activeTab}
											onClick={() => setActiveTab(TABS.BRANCHES)}>
											{TABS.BRANCHES}
										</Button>
									</div>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft className='w-100'>
									<Button
										icon='Delete'
										color='danger'
										isLight
										className='w-100 p-3'>
										Delete User
									</Button>
								</CardFooterLeft>
							</CardFooter>
						</Card>
					</div>
					<div className='col-xl-9 col-lg-8 col-md-6'>
						{TABS.ACCOUNT_DETAIL === activeTab && (
							<Card stretch tag='form' noValidate onSubmit={handleOnSubmit}>
								<CardHeader>
									<CardLabel icon='Contacts' iconColor='info'>
										<CardTitle tag='div' className='h5'>
											Account Details
										</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody className='pb-0' isScrollable>
									<div className='row g-4'>
										<div className='col-12'>
											<div className='row g-4 align-items-center'>
												<div className='col-lg-auto'>
													<Avatar
														srcSet={USERS.JOHN.srcSet}
														src={USERS.JOHN.src}
														color={USERS.JOHN.color}
													/>
												</div>
												<div className='col-lg'>
													<div className='row g-4'>
														<div className='col-auto'>
															<Input
																type='file'
																autoComplete='photo'
																ariaLabel='Upload image file'
															/>
														</div>
														<div className='col-auto'>
															<Button
																color='dark'
																isLight
																icon='Delete'>
																Delete Avatar
															</Button>
														</div>
														<div className='col-12'>
															<p className='lead text-muted'>
																Avatar helps your teammates get to
																know you.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='col-12 border-bottom' />
										<div className='col-md-6'>
											<FormGroup id='name' label='Name' isFloating>
												<Input
													placeholder='Name'
													autoComplete='additional-name'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.name}
													isValid={formik.isValid}
													isTouched={formik.touched.name}
													invalidFeedback={formik.errors.name}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-6'>
											<FormGroup id='domain' label='domain' isFloating>
												<Input
													placeholder='Domain'
													autoComplete='family-name'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.domain}
													isValid={formik.isValid}
													isTouched={formik.touched.domain}
													invalidFeedback={formik.errors.domain}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='email'
												label='Email'
												isFloating>
												<Input
													placeholder='Email'
													autoComplete='email'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.email}
													isValid={formik.isValid}
													isTouched={formik.touched.email}
													invalidFeedback={formik.errors.email}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-6'>
											<FormGroup
												id='companyStatus'
												label='Company Status'
												isFloating>
												<Select
													id='companyStatus'
													ariaLabel='company-status'
													placeholder='Choose...'
													list={[
														{ value: '0', text: 'Choose...' },
														{ value: '1', text: 'Active' },
														{ value: '2', text: 'Inactive' },
													]}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.companyStatus}
													isValid={formik.isValid}
													isTouched={formik.touched.companyStatus}
													invalidFeedback={formik.errors.companyStatus}
												/>
											</FormGroup>
										</div>
										<div className='col-6'>
											<FormGroup
												id='defaultLanguage'
												label='DefaultLanguae'
												isFloating>
												<Select
													id='defaultLanguage'
													ariaLabel='default-language'
													placeholder='Choose...'
													list={[
														{ value: '0', text: 'Choose...' },
														{ value: '1', text: 'Spanish' },
														{ value: '2', text: 'English' },
													]}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.defaultLanguage}
													isValid={formik.isValid}
													isTouched={formik.touched.defaultLanguage}
													invalidFeedback={formik.errors.defaultLanguage}
												/>
											</FormGroup>
										</div>
									</div>
								</CardBody>
								<CardFooter>
									<CardFooterLeft>
										<Button
											color='info'
											isLink
											type='reset'
											onClick={formik.resetForm}>
											Reset
										</Button>
									</CardFooterLeft>
									<CardFooterRight>
										<Button
											type='submit'
											icon='Save'
											color='info'
											isOutline
											isDisable={!formik.isValid && !!formik.submitCount}>
											Save
										</Button>
									</CardFooterRight>
								</CardFooter>
							</Card>
						)}
						{TABS.BRANCHES === activeTab && (
							<Card
								stretch
								tag='form'
								noValidate
								onSubmit={formikBranches.handleSubmit}>
								<CardHeader>
									<CardLabel icon='Place' iconColor='info'>
										<CardTitle>{TABS.BRANCHES}</CardTitle>
									</CardLabel>
								</CardHeader>
								<CardBody className='pb-0' isScrollable>
									<div className='row g-4'>
										<div className='col-12'>
											<div className='row g-4 align-items-center'>
												<div className='col-lg-auto'>
													<Avatar
														srcSet={USERS.RYAN.srcSet}
														src={USERS.RYAN.src}
														color={USERS.RYAN.color}
													/>
												</div>
												<div className='col-lg'>
													<div className='row g-4'>
														<div className='col-auto'>
															<Input
																type='file'
																autoComplete='photo'
																ariaLabel='Upload image file'
															/>
														</div>
														<div className='col-auto'>
															<Button
																color='dark'
																isLight
																icon='Delete'>
																Delete Avatar
															</Button>
														</div>
														<div className='col-12'>
															<p className='lead text-muted'>
																Avatar helps your teammates get to
																know you.
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='col-lg-12'>
											<FormGroup
												label='branchName'
												isFloating>
												<Input
													id='branchName'
													onChange={formikBranches.handleChange}
													onBlur={formikBranches.handleBlur}
													value={formikBranches.values.branchName}
													isValid={formikBranches.isValid}
													isTouched={formikBranches.touched.branchName}
													invalidFeedback={
														formikBranches.errors.branchName
													}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-lg-12'>
											<FormGroup
												id='branchEmail'
												label='Branch Email'
												isFloating>
												<Input
													id='branchEmail'
													onChange={formikBranches.handleChange}
													value={formikBranches.values.branchEmail}
												/>
											</FormGroup>
										</div>
										<div className='col-md-3'>
											<FormGroup id='branchStatus' label='Branch Status' isFloating>
												<Select
													ariaLabel='Branch Status'
													placeholder='Choose...'
													list={[
														{ value: '0', text: 'Choose...' },
														{ value: '1', text: 'Active' },
														{ value: '2', text: 'Inactive' },
													]}
													onChange={formikBranches.handleChange}
													onBlur={formikBranches.handleBlur}
													value={formikBranches.values.branchStatus}
													isValid={formikBranches.isValid}
													isTouched={formikBranches.touched.branchStatus}
													invalidFeedback={formikBranches.errors.branchStatus}
												/>
											</FormGroup>
										</div>
									</div>
								</CardBody>
								<CardFooter>
									<CardFooterLeft>
										<Button
											color='info'
											isLink
											type='reset'
											onClick={formikBranches.resetForm}>
											Reset
										</Button>
									</CardFooterLeft>
									<CardFooterRight>
										<Button
											type='submit'
											icon='Save'
											color='info'
											isOutline
											isDisable={
												!formikBranches.isValid &&
												!!formikBranches.submitCount
											}>
											Save
										</Button>
									</CardFooterRight>
								</CardFooter>
							</Card>
						)}
						{TABS.MY_WALLET === activeTab && <CommonMyWallet />}
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default EditBoxedPage;
