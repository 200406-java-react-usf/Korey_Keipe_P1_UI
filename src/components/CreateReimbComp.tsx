import React, { useState } from 'react';
import { 
    Typography, 
    FormControl, 
    InputLabel, 
    Input, 
    Button, 
    makeStyles 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Reimb } from '../models/reimb';
import { User } from '../models/user';
import { NewReimb } from '../models/newReimb';

interface ICreateReimbProps {
    authUser: User;
    errorMessage: string;
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
    }
});

function CreateReimbComp(props: ICreateReimbProps) {

	const classes = useStyles();

	const [amount, setAmount] = useState(0.00);
	const [description, setDescription] = useState('');
    const [type_id, setType] = useState (1);
    const [errorMessage, setErrorMessage] = useState ('');

	let updateAmount = (e: any) => {
		setAmount(e.target.value);
	}

	let updateDescription = (e: any) => {
		setDescription(e.target.value);
	}

	let updateType = (e: any) => {
		setType(e.target.value);
	}

	let createReimb = async () => {

        try{
		let reimb = new NewReimb(amount, description, type_id);
		let newReimb = await createReimb(reimb);
		props.setNewReimb(newReimb)
		console.log(newReimb);	
        } catch (e) {
            setErrorMessage(e);
        }
    }


	return (
				
			<>
				<div className={classes.registerContainer}>
					<form className={classes.registerForm}>
						<br/><br/>
						<Typography align="center" variant="h4">Register</Typography>

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
						<Button onClick={createReimb} variant="contained" color="primary" size="medium">Submit</Button>
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

export default CreateReimbComp;