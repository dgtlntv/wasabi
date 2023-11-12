export default function FormCardInput({ label, wrapperProps, inputProps }) {
    return (
        <div {...wrapperProps}>
            {label && <label htmlFor={inputProps.id}>{label}</label>}
            <input id={label ? inputProps.id : undefined} className="u-no-margin" type="number" {...inputProps} />
        </div>
    )
}
