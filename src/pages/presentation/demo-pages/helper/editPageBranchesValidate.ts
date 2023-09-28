interface IValuesBranches
{
	branchName: string;
	branchEmail: string;
	image: string;
	branchStatus: string;
}

const validateBranches = ( values: IValuesBranches ) =>
{
	const errors: IValuesBranches = {
		branchName: '',
		branchEmail: '',
		image: '',
		branchStatus: '',
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

	if ( !values.branchStatus )
	{
		errors.branchStatus = 'Required';
	}

	return errors;
};

export default validateBranches;
