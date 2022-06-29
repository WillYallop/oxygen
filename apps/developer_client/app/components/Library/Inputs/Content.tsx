// components
import InputSection from '../InputSection';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

interface LibraryPageContentProps {
    title: string;
    body?: string;

    value: string;
    setValue: (s: string) => void;
}

const mdParser = new MarkdownIt();

const LibraryPageContent: React.FC<LibraryPageContentProps> = ({
    title,
    body,
    value,
    setValue,
}) => {
    return (
        <InputSection title={title} body={body}>
            <MdEditor
                style={{ height: '500px' }}
                value={value}
                renderHTML={text => mdParser.render(text)}
                onChange={d => setValue(d.text)}
                name={'content'}
            />
        </InputSection>
    );
};

export default LibraryPageContent;
