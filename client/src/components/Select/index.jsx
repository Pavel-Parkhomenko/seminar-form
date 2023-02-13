import React from 'react'
import styles from './Select.module.scss'

export function Select({ id, name, onChange, label, data }) {
	return (
		<div className={styles.container}>
			<label htmlFor={name}>{label}</label>
			<select
				required
				id={id}
				name={name}
				onChange={onChange}
			>
				<option selected value='' disabled>Выбрать</option>
				{data.map(item => <option vlaue={item} key={item}>{item}</option>)}
			</select>
		</div>
	)
}