import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    makeStyles 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { updateReimb } from '../remote/reimb-service';
import { Reimb } from '../models/reimb';
import { Link } from 'react-router-dom';

interface IUpdateReimbProps {
	thisReimb: Reimb;
	setNewReimb: (newReimb: Reimb) => void;
	setThisReimb: (reimb: Reimb) => void;
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
    }
});

function UpdateReimbComp(props: IUpdateReimbProps) {

	const classes = useStyles();

	const [id, setId] = useState(props.thisReimb.id)
	const [amount, setAmount] = useState(props.thisReimb.amount);
	const [submitted, setSubmitted] = useState(props.thisReimb.submitted);
	const [resolved, setResolved] = useState(props.thisReimb.resolved);
	const [description, setDescription] = useState(props.thisReimb.description);
	const [author_id, setAuther ] = useState(props.thisReimb.author_id);
	const [resolver_id, setResolver_Id] = useState(props.thisReimb.resolver_id);
	const [status_id, setStatus] = useState(props.thisReimb.status_id);
	const [type_id, setType] = useState (props.thisReimb.type_id);
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

	let update = async () => {

		try {
		let reimb = new Reimb(id, amount, submitted, resolved, description, author_id, resolver_id, status_id, type_id);
		let response = await updateReimb(reimb);
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
						<Typography align="center" variant="h4">Update Reimbursement</Typography>

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

						<FormControl margin="normal" fullWidth>
							<InputLabel htmlFor="email">Type</InputLabel>
							<Input 
								onChange={updateType}
								value={type_id}
								id="type" type="text"
								placeholder="type"/>
						</FormControl>
						<br/><br/>
						<Link to="/dashboard" onClick={update}> UPDATE </Link>
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

export default UpdateReimbComp;