export default function FormCardWrapper({ title, children }) {
    return (
        <div className="p-card form-card">
            <h1 className="u-no-margin">{title}</h1>
            {children}
        </div>
    )
}
