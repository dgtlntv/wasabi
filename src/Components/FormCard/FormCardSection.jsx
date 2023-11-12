export default function FormCardSection({ title, description, children }) {
    return (
        <div>
            <h4 className="u-no-margin">{title}</h4>
            <p className="p-text--small u-text--muted">{description}</p>
            {children}
        </div>
    )
}
