import React, { useState } from 'react'
import { useFormik } from 'formik'
import { Input } from '../Input'
import { Select } from '../Select'
import styles from './Form.module.scss'
import {
	FORM_FIELD_TEXT, FORM_TEXT,
	HEADER_TEXT, INFORMATION_TEXT_1,
	INFORMATION_TEXT_2,
	POLICY_TEXT, SUBMIT_TEXT,
	MESSAGE_SUCCESS, MESSAGE_FAILED,
	INFORMATION_TEXT_UNDERLAIN
} from '../../mocks'

export function Form() {

	const [message, setMessage] = useState('')

	async function handleSubmit(values) {
		try {
			const res = await fetch('http://127.0.0.1:5000/mail/sendmail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(values)
			})
			if (res.ok) {
				setMessage(MESSAGE_SUCCESS)
			} else {
				setMessage(MESSAGE_FAILED)
			}
		} catch (err) {
			setMessage(MESSAGE_FAILED)
		}
	}

	const formik = useFormik({
		initialValues: {
			fio: '',
			email: '',
			seminar: ''
		},
		onSubmit: values => {
			handleSubmit(values)
		},
	});

	return (
		<div className={styles.container}>
			<h1>{HEADER_TEXT}</h1>
			<div className={styles.information}>
				<p>{INFORMATION_TEXT_1}</p>
				<p>{INFORMATION_TEXT_2} <span>{INFORMATION_TEXT_UNDERLAIN}</span></p>
			</div>
			<form onSubmit={formik.handleSubmit}>
				<Input
					id="fio"
					name="fio"
					onChange={formik.handleChange}
					value={formik.values.fio}
					type="text"
					label={FORM_TEXT[0].label}
					placeholder={FORM_TEXT[0].placeholder}
				/>
				<Input
					id="email"
					name="email"
					onChange={formik.handleChange}
					value={formik.values.email}
					type="email"
					label={FORM_TEXT[1].label}
					placeholder={FORM_TEXT[1].placeholder}
				/>
				<Select
					id="seminar"
					name="seminar"
					onChange={formik.handleChange}
					label={FORM_TEXT[2].label}
					data={FORM_TEXT[2].data}
				/>
				<div className={styles.bottom__box}>
					<div className={styles.policy__box}>
						<p>{FORM_FIELD_TEXT}</p>
						<p>{POLICY_TEXT}</p>
					</div>
					<button
						type="submit"
						className={styles.submit}
					>
						{SUBMIT_TEXT}
					</button>
				</div>
				{message ? <p>{message}</p> : null}
			</form>
		</div>
	)
}