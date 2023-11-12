export default function PlusButton(props) {
    const { style, className, ...otherProps } = props

    return (
        <button
            {...otherProps}
            style={{ padding: 0, ...style }}
            className={`has-icon u-no-margin ${className || ""}`.trim()}>
            <i style={{ color: "#000" }} className="p-icon--plus"></i>
        </button>
    )
}
