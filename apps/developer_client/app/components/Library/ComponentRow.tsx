import { Link } from '@remix-run/react';
import { D_Library_GetMultipleLibraryResBodyData } from 'oxygen-types';
import moment from 'moment';
import {
    faFloppyDisk,
    faEye,
    faEyeSlash,
    faBox,
} from '@fortawesome/free-solid-svg-icons';
// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Picture } from 'frontend-ui';

interface LibraryComponentRowProps {
    component: D_Library_GetMultipleLibraryResBodyData;
}

const LibraryComponentRow: React.FC<LibraryComponentRowProps> = ({
    component,
}) => {
    return (
        <li className="library-row library-row--component">
            {/* image */}
            <div className="library-row__image">
                <div className="library-row__image__inner">
                    {component.attributes.images.preview[0] ? (
                        <Picture
                            data={component.attributes.images.preview[0]}
                        />
                    ) : (
                        <div className="library-row__image__inner__blank">
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faBox} />
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {/* textarea */}
            <div className="library-row__textarea">
                <p className="t__title">{component.attributes.name}</p>
                <p className="t__body">{component.attributes.description}</p>
                <div className="library-row__textarea__icons l--f">
                    <span>
                        {component.attributes.public ? (
                            <>
                                <FontAwesomeIcon icon={faEye} />
                                public
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faEyeSlash} />
                                private
                            </>
                        )}
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        {moment(component.attributes.modified)
                            .startOf('hour')
                            .fromNow()}
                    </span>
                </div>
                <div className="library-row__textarea__btn-row l--f">
                    <Link
                        to={`/components/edit/${component.id}`}
                        className="btn-style__main"
                    >
                        Edit
                    </Link>
                    <Link
                        to={`/components/preview/${component.id}`}
                        className="btn-style__main btn-style__main--inverse"
                    >
                        Preview
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default LibraryComponentRow;
