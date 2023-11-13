export default function SkeletonSquare({ count }) {
    return (
        <>
            {Array.from({ length: count }, (_, index) => (
                <div key={index} className="skeleton-square" />
            ))}
        </>
    )
}
