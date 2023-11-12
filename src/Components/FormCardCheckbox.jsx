export default function FormCardCheckbox({ label, wrapperProps, onChange, ...props }) {
    return (
        <label className="p-checkbox" {...wrapperProps}>
            <input
                type="checkbox"
                className="p-checkbox__input"
                {...props}
                aria-labelledby={label}
                onChange={onChange}
            />
            <span className="p-checkbox__label" id={label}>
                {label}
            </span>
        </label>
    )
}
