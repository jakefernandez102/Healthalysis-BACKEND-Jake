import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import classNames from 'classnames';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Avatar from '../../../components/Avatar';
import UserImageWebp from '../../../assets/img/wanna/wanna1.webp';
import UserImage from '../../../assets/img/wanna/wanna1.png';
import Button from '../../../components/bootstrap/Button';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import CommonFilterTag from '../../_common/CommonFilterTag';
import CommonTableRowUsers from '../../_common/CommonTableRowUsers';
import Select from '../../../components/bootstrap/forms/Select';

import { dashboardPagesMenu } from '../../../menu';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import Icon from '../../../components/icon/Icon';
import useSelectTable from '../../../hooks/useSelectTable';
import useDarkMode from '../../../hooks/useDarkMode';
import useTourStep from '../../../hooks/useTourStep';

const UsersList = () => {
	/**
	 * For Tour
	 */
	useTourStep(6);

	const { themeStatus, darkModeStatus } = useDarkMode();
	const [usersList,setUserList]=useState<any[]>([])
	const userInfo = JSON.parse(localStorage.getItem('facit_authUserInfo'))
	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	
	useEffect(()=>{
		console.log(userInfo.token)
		const getALLUsers = async () => {
			try {
				
				const response = await fetch('http://api.healthalysis.com/users',{
					method:'GET',
					mode:'cors',
					headers: {
						Authentication: `Bearer: ${userInfo?.token}`,
						"Content-Type":'application/json'
					}
				})
					const data = await response.json();
					console.log(data)
			} catch (error) {
				console.log(error)
			}
		}
		getALLUsers()
	},[])

	const formik = useFormik({
		initialValues: {
			minPrice: '',
			maxPrice: '',
			categoryName: '3D Shapes',
			companyA: true,
			companyB: true,
			companyC: true,
			companyD: true,
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});
	const formikUser = useFormik({
		initialValues: {
			_id:'',
			companyType: '',
			name: '',
			lastname: '',
			age: '27',
			email: 'true',
			rolType: 'true',
			active: 'true',
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});

	const filteredData = usersList.filter(
		(f) =>
			// Category
			f.active === formikUser.values.active
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	
	return (
		<PageWrapper title={dashboardPagesMenu.users.subMenu.usersList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Avatar srcSet={UserImageWebp} src={UserImage} size={32} />
					<span>
						<strong>Report by</strong> Timothy J. Doe
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>

					{!!formikUser.values.active && (
						<CommonFilterTag title='User Status' text={formikUser.values.active.toString()==='true'?'Active':'Inavtive'} />
					)}

					<SubheaderSeparator />
					<Dropdown isOpen={filterMenu} setIsOpen={setFilterMenu}>
						<DropdownToggle hasIcon={false}>
							<Button icon='Filter' color='primary' isLight data-tour='filter'>
								Filter
								<span
									className={classNames(
										'position-absolute',
										'top-0 start-95',
										'translate-middle',
										'badge',
										'rounded-pill',
										'bg-danger',
										'border border-2',
										{
											'border-white': !darkModeStatus,
											'border-dark': darkModeStatus,
										},
									)}>
									2/3
									<span className='visually-hidden'>filter</span>
								</span>
							</Button>
						</DropdownToggle>
						<DropdownMenu
							isAlignmentEnd
							size='lg'
							isCloseAfterLeave={false}
							data-tour='filter-menu'>
							<div className='container py-2'>
								<form className='row g-3' onSubmit={formikUser.handleSubmit}>
									<div className='col-12'>
										<FormGroup id='acitve'>
											<Label htmlFor='categoryName'>User Status</Label>
											<Select
												id='active'
												ariaLabel='Category'
												placeholder='Category Name'
												list={[
													{ value: 'true', text: 'Active' },
													{ value: 'false', text: 'Inactive' },
												]}
												onChange={formikUser.handleChange}
												value={formikUser.values.active.toString()}
											/>
										</FormGroup>
									</div>

									<div className='col-6'>
										<Button
											color='primary'
											isOutline
											className='w-100'
											onClick={formik.resetForm}>
											Reset
										</Button>
									</div>
									<div className='col-6'>
										<Button color='primary' className='w-100' type='submit'>
											Filter
										</Button>
									</div>
								</form>
							</div>
						</DropdownMenu>
					</Dropdown>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<Card stretch data-tour='list'>
					<CardHeader>
						<CardLabel icon='List' iconColor='info'>
							<CardTitle tag='div' className='h5'>
								Users List{' '}
								<small className='ms-2'>
									Item:{' '}
									{selectTable.values.selectedList.length
										? `${selectTable.values.selectedList.length} / `
										: null}
									{usersList.length}
								</small>
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Dropdown className='d-inline'>
								<DropdownToggle hasIcon={false}>
									<Button
										color={themeStatus}
										icon='MoreHoriz'
										aria-label='Actions'
									/>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<Button icon='Edit'>Edit</Button>
									</DropdownItem>
									<DropdownItem>
										<Button icon='Delete'>Delete</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</CardActions>
					</CardHeader>
					<CardBody className='table-responsive' isScrollable>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>{SelectAllCheck}</th>
									<th
										scope='col'
										onClick={() => requestSort('_id')}
										className='cursor-pointer text-decoration-underline'>
										User ID{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('_id')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Image</th>
									<th scope='col'
									onClick={() => requestSort('name')}
									>
										Name{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('name')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'>Company Type</th>
									<th
										scope='col'
										onClick={() => requestSort('name')}
										className='cursor-pointer text-decoration-underline'>
										Age{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('name')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('email')}
										className='cursor-pointer text-decoration-underline'>
										Email{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('email')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'
									onClick={() => requestSort('active')}
									>
										Status
										<Icon
											size='lg'
											className={getClassNamesFor('active')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'
									onClick={() => requestSort('rolType')}
									>
										Rol Type
										<Icon
											size='lg'
											className={getClassNamesFor('rolType')}
											icon='FilterList'
										/>										
									</th>
									<th scope='col' className='text-end'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{onCurrentPageItems.map((user) => (
									<CommonTableRowUsers
										key={user?._id}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...user}
										selectName='selectedList'
										selectOnChange={selectTable.handleChange}
										selectChecked={selectTable.values.selectedList.includes(
											// @ts-ignore
											user?._id,
										)}
									/>
								))}
							</tbody>
						</table>
					</CardBody>
					<PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default UsersList;
