export default function FallbackImage({ src, alt }) {
    src = src === null ? '' : src;  
    
    return (
        <img
            src={src}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = alt;
            }}
        />
    );
}