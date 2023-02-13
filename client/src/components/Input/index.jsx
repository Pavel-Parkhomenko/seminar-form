import React from 'react'
import styles from './Input.module.scss'

export function Input({ id, name, onChange, value, type, label, placeholder }) {
	return (
		<div className={styles.container}>
			<label htmlFor={name}>{label}</label>
			<input
				required
				id={id}
				name={name}
				onChange={onChange}
				value={value}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	)
}