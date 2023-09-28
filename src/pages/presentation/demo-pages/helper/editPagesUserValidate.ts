enum CompanyType
{
	BackOffice = 'BACKOFFICE',
	Admin = 'ADMIN',
}
enum RolType
{
	Admin = 'ADMIN',
	Employee = 'EMPLOYEE',
	Billing = 'BILLING',
	Client = 'CLIENT'
}


interface IValues
{
	companyId: string;
	companyType: CompanyType | string;
	name: string;
	lastname: string;
	age: number | string;
	displayName: string;
	email: string;
	password: string;
	newPassword: string;
	confirmPassword: string;
	rolType: RolType | CompanyType | string;
	active: boolean | string;
}
const editPagesUserValidate = ( values: IValues ) =>
{
	const errors: IValues = {
		companyId: '',
		companyType: '',
		name: '',
		lastname: '',
		age: '',
		displayName: '',
		email: '',
		password: '',
		newPassword: '',
		confirmPassword: '',
		rolType: '',
		active: '',
	};
	if ( !values.companyType )
	{
		errors.companyType = 'Required';
	} else if ( values.companyType !== CompanyType.BackOffice && values.companyType !== CompanyType.Admin )
	{
		errors.companyType = 'Company Type must be one of: BACKOFFICE - ADMIN';
	}

	if ( !values.companyId )
	{
		errors.companyId = 'Required';
	}

	if ( !values.rolType )
	{
		errors.rolType = 'Required';
	}

	if ( !values.age )
	{
		errors.age = 'Required';
	} else if ( values.age <= 18 )
	{
		errors.age = 'Age must be higher than 18';
	}



	if ( !values.name )
	{
		errors.name = 'Required';
	} else if ( values.name.length < 3 )
	{
		errors.name = 'Must be 3 characters or more';
	} else if ( values.name.length > 20 )
	{
		errors.name = 'Must be 20 characters or less';
	}

	if ( !values.lastname )
	{
		errors.lastname = 'Required';
	} else if ( values.lastname.length < 3 )
	{
		errors.lastname = 'Must be 3 characters or more';
	} else if ( values.lastname.length > 20 )
	{
		errors.lastname = 'Must be 20 characters or less';
	}

	if ( !values.displayName )
	{
		errors.displayName = 'Required';
	} else if ( values.displayName.length > 30 )
	{
		errors.displayName = 'Must be 20 characters or less';
	}

	if ( !values.email )
	{
		errors.email = 'Required';
	} else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test( values.email ) )
	{
		errors.email = 'Invalid email address';
	}

	if ( values.password )
	{
		if ( !values.newPassword )
		{
			errors.newPassword = 'Please provide a valid password.';
		} else
		{
			errors.newPassword = '';

			if ( values.newPassword.length < 8 || values.newPassword.length > 32 )
			{
				errors.newPassword +=
					'The password must be at least 8 characters long, but no more than 32. ';
			}
			if ( !/[0-9]/g.test( values.newPassword ) )
			{
				errors.newPassword +=
					'Require that at least one digit appear anywhere in the string. ';
			}
			if ( !/[a-z]/g.test( values.newPassword ) )
			{
				errors.newPassword +=
					'Require that at least one lowercase letter appear anywhere in the string. ';
			}
			if ( !/[A-Z]/g.test( values.newPassword ) )
			{
				errors.newPassword +=
					'Require that at least one uppercase letter appear anywhere in the string. ';
			}
			if ( !/[!@#$%^&*)(+=._-]+$/g.test( values.newPassword ) )
			{
				errors.newPassword +=
					'Require that at least one special character appear anywhere in the string. ';
			}
		}

		if ( !values.confirmPassword )
		{
			errors.confirmPassword = 'Please provide a valid password.';
		} else if ( values.newPassword !== values.confirmPassword )
		{
			errors.confirmPassword = 'Passwords do not match.';
		}
	}

	return errors;
};

export default editPagesUserValidate;
