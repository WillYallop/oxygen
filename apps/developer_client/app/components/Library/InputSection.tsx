interface LibraryInputSectionProps {
    children: React.ReactElement;
    title: string;
    body?: string;
}

const LibraryInputSection: React.FC<LibraryInputSectionProps> = ({
    title,
    body,
    children,
}) => {
    return (
        <section className="lib-input-sect l--f l--bm-t-l">
            <div className="t__textarea lib-input-sect__text">
                <h3>{title}</h3>
                {body ? <p>{body}</p> : null}
            </div>
            <div className="lib-input-sect__children">{children}</div>
        </section>
    );
};

export default LibraryInputSection;
