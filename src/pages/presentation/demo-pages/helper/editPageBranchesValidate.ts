interface IValuesBranches
{
	branchName: string;
	branchEmail: string;
	image: string;
	state: string;
}

const validateBranches = ( values: IValuesBranches ) =>
{
	const errors: IValuesBranches = {
		branchName: '',
		branchEmail: '',
		image: '',
		state: '',
	};
	if ( !values.branchName )
	{
		errors.branchName = 'Required';
	} else if ( values.branchName.length < 6 )
	{
		errors.branchName = 'Must be 6 characters or more';
	} else if ( values.branchName.length > 50 )
	{
		errors.branchName = 'Must be 50 characters or less';
	}

	if ( !values.branchEmail )
	{
		errors.image = 'Required';
	}

	if ( !values.image )
	{
		errors.image = 'Required';
	}

	if ( !values.state )
	{
		errors.state = 'Required';
	}

	return errors;
};

export default validateBranches;
