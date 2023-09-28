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
import CommonTableRowCompanies from '../../_common/CommonTableRowCompanies';
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
import BeveledCone from '../../../assets/img/abstract/beveled-cone.png';

const CompaniesList = () => {
	/**
	 * For Tour
	 */
	useTourStep(6);

	const { themeStatus, darkModeStatus } = useDarkMode();

	const [companies,setCompanies] = useState<any[]>([])
	const [filterMenu, setFilterMenu] = useState<boolean>(false);
	
	useEffect(()=>{

		fetch('http://api.healthalysis.com/company')
			.then((response) => response.json())
			.then((comps) =>{
				const updatedCompanies = comps.companies.map((cpm) => {
					cpm.users = 10;
					return cpm;
				})
				setCompanies(updatedCompanies)
			})
		
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

	const formikCompanies = useFormik({
		initialValues: {
			_id:'',
			name: '',
			image: BeveledCone,
			branches:['ejemplo@correo.com'],
			users:10,
			companyStatus: '1',
			defaultLanguage: '1',
			
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onSubmit: (values) => {
			setFilterMenu(false);
			// alert(JSON.stringify(values, null, 2));
		},
	});
	


	const filteredData = companies.filter(
		(company) =>
			// Company Status
			company?.companyStatus.toString() === formikCompanies.values.companyStatus
	);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);

	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
	const onCurrentPageItems = dataPagination(items, currentPage, perPage);

	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageItems);
	return (
		<PageWrapper title={dashboardPagesMenu.companies.subMenu.companiesList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Avatar srcSet={UserImageWebp} src={UserImage} size={32} />
					<span>
						<strong>Report by</strong> Timothy J. Doe
					</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					{(!!formik.values.minPrice || !!formik.values.maxPrice) && (
						<CommonFilterTag
							title='Price'
							text={`${formik.values.minPrice || '0'} to ${
								formik.values.maxPrice || 'no limit'
							}`}
						/>
					)}

					{!!formik.values.categoryName && (
						<CommonFilterTag title='Category' text={formik.values.categoryName} />
					)}

					{(formikCompanies.values.companyStatus) && (
						<CommonFilterTag
							title='Company Status'
							text={
								(formikCompanies.values.companyStatus ? 'Active' : '')
							}
						/>
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
								<form className='row g-3' onSubmit={formikCompanies.handleSubmit}>
									<div className='col-12'>
										<FormGroup id='companyStatus'>
											<Label htmlFor='categoryName'>Company Status</Label>
											<Select
												id='companyStatus'
												ariaLabel='Category'
												placeholder='Category Name'
												list={[
													{ value: '1', text: 'Active' },
													{ value: '2', text: 'Inactive' },
												]}
												onChange={formikCompanies.handleChange}
												value={formikCompanies.values.companyStatus}
											/>
										</FormGroup>
									</div>
									<div className='col-6'>
										<Button
											color='primary'
											isOutline
											className='w-100'
											onClick={formikCompanies.resetForm}>
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
						<CardLabel icon='LocalConvenienceStore' iconColor='info'>
							<CardTitle tag='div' className='h5'>
								Companies List{' '}
								<small className='ms-2'>
									Item:{' '}
									{selectTable.values.selectedList.length
										? `${selectTable.values.selectedList.length} / `
										: null}
									{filteredData.length}
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
										Company ID{' '}
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
									<th scope='col'
										onClick={() => requestSort('branches')}
									>
										Branches{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('branches')}
											icon='FilterList'
										/>
									</th>
									<th scope='col'
										onClick={() => requestSort('users')}
									>
										Users {' '}
										<Icon
											size='lg'
											className={getClassNamesFor('users')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('companyStatus')}
										className='cursor-pointer text-decoration-underline'
									>
										CompanyStatus{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('companyStatus')}
											icon='FilterList'
										/>
									</th>
									<th
										scope='col'
										onClick={() => requestSort('defaultLanguage')}
										className='cursor-pointer text-decoration-underline'>
										Defauld Language{' '}
										<Icon
											size='lg'
											className={getClassNamesFor('defaultLanguage')}
											icon='FilterList'
										/>
									</th>
									<th scope='col' className='text-end'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{onCurrentPageItems.map((company) => (
									<CommonTableRowCompanies
										key={company?.companyId}
										// eslint-disable-next-line react/jsx-props-no-spreading
										{...company}
										selectName='selectedList'
										selectOnChange={selectTable.handleChange}
										selectChecked={selectTable.values.selectedList.includes(
											// @ts-ignore
											company?.companyId,
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

export default CompaniesList;
