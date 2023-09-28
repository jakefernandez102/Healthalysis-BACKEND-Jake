import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ApexOptions } from 'apexcharts';
import Checks from '../../components/bootstrap/forms/Checks';
import Chart from '../../components/extras/Chart';
import Badge from '../../components/bootstrap/Badge';
import Button from '../../components/bootstrap/Button';
import { dashboardPagesMenu, demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import BeveledCone from '../../assets/img/abstract/beveled-cone.png'
interface ICommonTableRowProps {
	companyId: string | number;
	image: string;
	name: string;
	branches: string[];
	users: string[]
	companyStatus:string | number;
	defaultLanguage:string | number
	category: string;
	series: ApexOptions['series'];
	color: string;
	stock: string | number;
	price: number;
	store: string;
	selectOnChange: any;
	selectChecked: any;
	selectName: string;
}
//TODO: agregar USERS
const CommonTableRow: FC<ICommonTableRowProps> = ({
	companyId: id,
	image,
	name,
	branches,
	users,
	companyStatus,
	defaultLanguage,
	category,
	series,
	color,
	stock,
	price,
	store,
	selectOnChange,
	selectChecked,
	selectName,
}) => {
	const { darkModeStatus } = useDarkMode();
	const dummyOptions: ApexOptions = {
		colors: [color],
		chart: {
			type: 'line',
			width: 100,
			height: 35,
			sparkline: {
				enabled: true,
			},
		},
		tooltip: {
			theme: 'dark',
			fixed: {
				enabled: false,
			},
			x: {
				show: false,
			},
			y: {
				title: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					formatter(seriesName: string) {
						return '';
					},
				},
			},
		},
		stroke: {
			curve: 'smooth',
			width: 2,
		},
	};
	
	return (
		<tr>
			<th scope='row'>
				<Checks
					id={id.toString()}
					name={selectName}
					value={id}
					onChange={selectOnChange}
					checked={selectChecked}
					ariaLabel={selectName}
				/>
			</th>
			<th scope='row'>{id}</th>
			<td>
				{/* IMAGEN DEL OBJETO QUE VIENE DE COMPANYLIST */}
				<img src={BeveledCone} alt={name} width={54} height={54} />
				{/* <Link to={`../${demoPagesMenu.sales.subMenu.productID.path}/${id}`}>
					<img src={image} alt={name} width={54} height={54} />
				</Link> */}
			</td>
			<td>
				<div>
					<Link
						to={`../${demoPagesMenu.sales.subMenu.productID.path}/${id}`}
						className={classNames('fw-bold', {
							'link-dark': !darkModeStatus,
							'link-light': darkModeStatus,
						})}>
						{name}
					</Link>
					<div className='text-muted'>
						<small>{category}</small>
					</div>
				</div>
			</td>
			<td className='text-center'>
				{branches?.length === undefined ? '0' : branches?.length}
				{/* <Chart
					series={series}
					options={dummyOptions}
					type={dummyOptions.chart?.type}
					height={dummyOptions.chart?.height}
					width={dummyOptions.chart?.width}
				/> */}
			</td>

			<td>
				<span>
					{users}
					{/* {price.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})} */}
				</span>
			</td>
			<td className='h5 text-center'>
				<Badge
					color={
						(companyStatus === '2' && 'danger') ||
						(companyStatus === '1' && 'success') ||
						'info'
					}>
					{companyStatus === '1' ? 'Active' : 'Inactive'}
				</Badge>
			</td>
			<td className='h5 text-center'>
				<Badge
					color={
						(companyStatus === '2' && 'warning') ||
						(companyStatus === '1' && 'info') ||
						'info'
					}>
					{companyStatus === '1' ? 'English' : 'Español'}
				</Badge>
			</td>
			<td className='text-end'>
				<Button
					color='dark'
					isLight
					icon='Edit'
					tag='a'
					to={`../${dashboardPagesMenu.companies.subMenu.createCompany.path}/${id}`}
					aria-label='Edit'
				/>
			</td>
		</tr>
	);
};

export default CommonTableRow;
