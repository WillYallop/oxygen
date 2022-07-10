import { useState } from 'react';
// components
import InputSection from '../InputSection';
import { Input, Textarea, InputWrapper } from 'frontend-ui';
import { TagsInput } from 'react-tag-input-component';

interface LibraryMetaProps {
    title: string;
    body?: string;
    values: {
        name: string;
        tags: Array<string>;
        description: string;
    };
}

const LibraryMeta: React.FC<LibraryMetaProps> = ({ title, body, values }) => {
    const [displayName, setDisplayName] = useState(values.name);
    const [libraryName, setLibraryName] = useState(values.name);
    const [description, setDescription] = useState(values.description);
    const [tags, setTags] = useState<Array<string>>([]);

    const NameInput = (
        <Input
            id={'displayNameInp'}
            name={'displayName'}
            type={'text'}
            value={displayName}
            updateValue={val => setDisplayName(val)}
            required={true}
        />
    );
    const LibraryNameInput = (
        <Input
            id={'libraryNameInp'}
            name={'libraryName'}
            type={'text'}
            value={libraryName}
            updateValue={val => setLibraryName(val)}
            required={true}
            placeholder={'my-component'}
            pattern={'[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšž∂ð-]+$'}
        />
    );
    const DescriptionTextarea = (
        <Textarea
            id={'descriptionInp'}
            name={'description'}
            value={description}
            updateValue={setDescription}
            required={true}
        />
    );

    const TagsInputEle = (
        <TagsInput
            value={tags}
            onChange={setTags}
            name="addTags"
            placeHolder="Enter tags"
        />
    );

    return (
        <InputSection title={title} body={body}>
            <>
                {/* Library Name */}
                <InputWrapper
                    id={LibraryNameInput.props.id}
                    label={'Library Name *'}
                    error={'There is an error'}
                    input={LibraryNameInput}
                    describedBy={
                        'This should be a unique name that only contains a-z letters and dashes (-).'
                    }
                />
                {/* Name */}
                <InputWrapper
                    id={NameInput.props.id}
                    label="Display Name *"
                    error="There is an issue with this field!"
                    input={NameInput}
                />
                {/* Tags */}
                <InputWrapper
                    id={TagsInputEle.props.id}
                    label="Tags"
                    error="There is an issue with this field!"
                    input={TagsInputEle}
                    describedBy={'Press enter or comma to add a new tag!'}
                />
                <input
                    type="text"
                    name="tags"
                    hidden
                    readOnly={true}
                    value={JSON.stringify(tags)}
                />
                {/* Description */}
                <InputWrapper
                    id={DescriptionTextarea.props.id}
                    label="Description *"
                    error="There is an issue with this field!"
                    input={DescriptionTextarea}
                />
            </>
        </InputSection>
    );
};

export default LibraryMeta;
