// Components
import Header from '~/components/Layout/Header';

const ComponentPage: React.FC = () => {
    return (
        <>
            <Header
                hasSearch={true}
                searchAction={() => alert('search action')}
            />
            <h2>Components Page</h2>
        </>
    );
};

export default ComponentPage;
