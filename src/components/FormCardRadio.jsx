export default function FormCardRadio({ name, label, wrapperProps, ...props }) {
    return (
        <label className="p-radio" {...wrapperProps}>
            <input type="radio" className="p-radio__input" {...props} name={name} aria-labelledby={label} />
            <span className="p-radio__label" id={label}>
                {label}
            </span>
        </label>
    )
}
