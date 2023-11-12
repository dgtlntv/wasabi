export default function FormCardRadio({ name, label, wrapperProps, onChange, ...props }) {
    return (
        <label className="p-radio" {...wrapperProps}>
            <input
                type="radio"
                className="p-radio__input"
                {...props}
                name={name}
                aria-labelledby={label}
                onChange={onChange}
            />
            <span className="p-radio__label" id={label}>
                {label}
            </span>
        </label>
    )
}
