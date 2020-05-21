import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input,  
    makeStyles, 
	Select
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { User } from '../models/user';
import { NewReimb } from '../models/newReimb';
import { createReimb } from '../remote/reimb-service';
import { Reimb } from '../models/reimb';
import { Link } from 'react-router-dom';
import { grey, cyan, teal } from '@material-ui/core/colors';

const primary = grey[500]; // #F44336
const accent = teal[900]; // #E040FB

interface ICreateReimbProps {
    authUser: User;
    setNewReimb: (newReimb: Reimb) => void;
}

const useStyles = makeStyles({
    registerContainer: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
    registerForm: {
        width: "50%"
	},
	link: {
        textDecoration: 'none',
		color: accent,
		fontWeight: 'bold'
    }
});

function SubmitReimbComp(props: ICreateReimbProps) {

	const classes = useStyles();

	const [amount, setAmount] = useState(0.00);
	const [description, setDescription] = useState('');
	const [author_id, setAuther ] = useState(props.authUser?.user_id);
	const [status_id, setStatus] = useState(1);
	const [type_id, setType] = useState (1);
	const [errorMessage, setErrorMessage] = useState('');

	let updateAmount = (e: any) => {
		setAmount(e.target.value);
	}

	let updateDescription = (e: any) => {
		setDescription(e.target.value);
	}

	let updateType = (e: any) => {
		setType(e.target.value);
	}

	let create = async () => {

		try {
		let reimb = new NewReimb(amount, description, author_id, type_id);
		let response = await createReimb(reimb);
		props.setNewReimb(response)
		console.log(response);	
		} catch (e) {
			setErrorMessage(e)
		}
	}

	return (
				
			<>
				<div className={classes.registerContainer}>
					<form className={classes.registerForm}>
						<br/><br/>
						<Typography align="center" variant="h4">New Reimbursement</Typography>

						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="amount">Amount</InputLabel>
							<Input 
								onChange={updateAmount} 
								value={amount} 
								id="amount" type="number" 
								placeholder="Amount" />
						</FormControl>
						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="description">Description</InputLabel>
							<Input 
								onChange={updateDescription}
								value={description}
								id="description" type="text"
								placeholder="Description"/>
						</FormControl>
						<FormControl>
                        <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                            <Select native onChange = {updateType}>
                                <option aria-label="None" value="" />
                                <option value = {1}>Lodging</option>
                                <option value = {2}>Travel</option>
                                <option value = {3}>Food</option>
                                <option value = {4}>Other</option>
                            </Select>
                    	</FormControl>
						<br/><br/>
						<Link to="/dashboard" onClick={create} className={classes.link}>Submit</Link>
						<br/><br/>
						{
							errorMessage
								? 
								<Alert severity="error"> {errorMessage} </Alert>
								:
							<></>
						}
					</form>
				</div>

			</>
		)
}

export default SubmitReimbComp;