import { Link } from '@remix-run/react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BackBarProps {
    link: string;
    text: string;
}

const BackBar: React.FC<BackBarProps> = ({ link, text }) => {
    return (
        <Link to={link} className="back-bar-root l--sp-h l--f l--f-a-c">
            <FontAwesomeIcon icon={faChevronLeft} />
            {text}
        </Link>
    );
};

export default BackBar;
