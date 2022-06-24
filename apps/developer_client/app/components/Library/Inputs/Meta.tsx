// components
import InputSection from '../InputSection';

interface LibraryMetaProps {
    title: string;
    body?: string;
}

const LibraryMeta: React.FC<LibraryMetaProps> = ({ title, body }) => {
    return (
        <InputSection title={title} body={body}>
            <></>
        </InputSection>
    );
};

export default LibraryMeta;
