import React from 'react';
import useContext from 'react';
import classNames from 'classnames';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import CommonHeaderChat from './CommonHeaderChat';
import useDarkMode from '../../../hooks/useDarkMode';
import AuthContext from '../../../contexts/authContext';

const DashboardBookingHeader = () => {
	const { darkModeStatus } = useDarkMode();
	const userInfo = JSON.parse(localStorage.getItem('facit_authUserInfo')) ?? {};
	return (
		<Header>
			<HeaderLeft>
				<div className='d-flex align-items-center'>
					<div className='row g-4'>
						<div className='col-md-auto'>
							<div
								className={classNames('fs-3', 'fw-bold', {
									'text-dark': !darkModeStatus,
								})}>
								Hi, {userInfo.name}!
							</div>
						</div>
					</div>
				</div>
			</HeaderLeft>
			<HeaderRight>
				{/* <CommonHeaderChat /> */}
			</HeaderRight>
		</Header>
	);
};

export default DashboardBookingHeader;
