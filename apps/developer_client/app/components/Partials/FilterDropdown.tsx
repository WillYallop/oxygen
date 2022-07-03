import { useState } from 'react';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { useDetectClickOutside } from 'react-detect-click-outside';
// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SlideDown } from 'react-slidedown';

export interface FilterDropdownCallbackRes {
    order: 'asc' | 'desc';
}

interface FilterDropdownProps {
    filters?: {
        order?: boolean;
    };
    callback: (data: FilterDropdownCallbackRes) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    filters,
    callback,
}) => {
    // toggle state
    const [closed, setClosed] = useState(true);
    // filters state
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');

    // handle close
    const detectOutsideRef = useDetectClickOutside({
        onTriggered: () => setClosed(true),
    });

    // handle callback
    const applyFilter = () => {
        callback({
            order: order,
        });
        setClosed(true);
    };

    return (
        <span className="filter-dropdown-root l--p-r" ref={detectOutsideRef}>
            {/* toggle */}
            <button
                className={`filter-dropdown-root__btn btn-style__main btn-style__main--inverse ${
                    !closed ? 'filter-dropdown-root__btn--open' : ''
                }`}
                aria-label="Filter button"
                aria-expanded={!closed}
                onClick={() => setClosed(!closed)}
            >
                <FontAwesomeIcon icon={faSliders} />
                Filter
            </button>
            {/* dropdown */}
            <SlideDown
                closed={closed}
                className={
                    'filter-dropdown-root__dropdown my-dropdown-slidedown'
                }
            >
                {/* order */}
                {filters?.order ? (
                    <div className="filter-dropdown-root__dropdown__order l--f l--f-j-sb">
                        <button
                            className={`btn-style__main ${
                                order === 'asc'
                                    ? ''
                                    : 'btn-style__main--inverse'
                            }`}
                            onClick={() => setOrder('asc')}
                            aria-label="Filter order by acending"
                        >
                            Ascending
                        </button>
                        <button
                            className={`btn-style__main ${
                                order === 'desc'
                                    ? ''
                                    : 'btn-style__main--inverse'
                            }`}
                            onClick={() => setOrder('desc')}
                            aria-label="Filter order by descending"
                        >
                            Descending
                        </button>
                    </div>
                ) : null}

                {/* submit */}
                <div className="filter-dropdown-root__dropdown__filter">
                    <button
                        className="btn-style__main"
                        aria-label="Apply filter"
                        onClick={applyFilter}
                    >
                        Apply
                    </button>
                </div>
            </SlideDown>
        </span>
    );
};

FilterDropdown.defaultProps = {
    filters: {
        order: false,
    },
};

export default FilterDropdown;
