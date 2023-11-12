import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div
            style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "128px",
                width: "fit-content",
            }}
        >
            <Link className="p-button" to="shadespalette">
                Shades Palette
            </Link>

            <Link className="p-button" to="datavizpalette">
                Data Viz Palette
            </Link>
        </div>
    )
}
