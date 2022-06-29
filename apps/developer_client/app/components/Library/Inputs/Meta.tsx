import { useState } from 'react';
// components
import InputSection from '../InputSection';
import { Input, Textarea, InputWrapper } from 'ui';
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
    const [name, setName] = useState(values.name);
    const [description, setDescription] = useState(values.description);
    const [tags, setTags] = useState<Array<string>>([]);

    const NameInput = (
        <Input
            id={'nameInp'}
            name={'name'}
            type={'text'}
            value={name}
            updateValue={val => setName(val)}
            required={true}
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
                {/* Name */}
                <InputWrapper
                    id={NameInput.props.id}
                    label="Name *"
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
