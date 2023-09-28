import React, { createContext, FC, ReactNode, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { getUserDataWithUsername, IUserProps } from '../common/data/userDummyData';

export interface IUserInfo {
	id:string;
	token:string
	name:string;
	lastname:string
	email:string;
	age:number | string;

}

export interface IAuthContextProps {
	user: string;
	setUser?(...args: unknown[]): unknown;
	userInfo?:IUserInfo;
	setUseInfo?: {};
	userData: Partial<IUserProps>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<string>(localStorage.getItem('facit_authUsername') || '');
	const [userInfo, setUserInfo] = useState<{}>(JSON.parse(localStorage.getItem('facit_authUserInfo')) || {});
	const [userData, setUserData] = useState<Partial<IUserProps>>({});

	useEffect(() => {
		localStorage.setItem('facit_authUsername', user);
		localStorage.setItem('facit_authUserInfo', JSON.stringify(userInfo));
	}, [user,userInfo]);

	useEffect(() => {
		if (user !== '') {
			setUserData(getUserDataWithUsername(user));
		} else {
			setUserData({});
		}
	}, [user]);

	const value = useMemo(
		() => ({
			user,
			setUser,
			userInfo,
			setUserInfo,
			userData,
		}),
		[user, userData,userInfo],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
