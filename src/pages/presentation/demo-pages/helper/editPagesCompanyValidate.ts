interface IValuesCompany
{
	name: string;
	domain: string;
	email: string;
	branches: string;
	image: string;
	companyStatus: string;
	defaultLanguage: string;
}
const validateCompany = ( values: IValuesCompany ) =>
{
	const errors: IValuesCompany = {
		name: '',
		domain: '',
		email: '',
		branches: '',
		image: '',
		companyStatus: '',
		defaultLanguage: '',
	};
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

	if ( !values.domain )
	{
		errors.domain = 'Required';
	} else if ( values.domain.length < 3 )
	{
		errors.domain = 'Must be 3 characters or more';
	}

	if ( !values.email )
	{
		errors.email = 'Required';
	}

	if ( !values.branches )
	{
		errors.branches = 'Required';
	}

	if ( values.image )
	{
		if ( !values.companyStatus )
		{
			errors.companyStatus = 'Please provide a valid option.';
		}

		if ( !values.defaultLanguage )
		{
			errors.defaultLanguage = 'Please provide a valid option.';
		}
	}

	return errors;
};

export default validateCompany;
