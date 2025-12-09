import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import ApiCard from '../components/ui/ApiCard';

function ApiSearch() {

    const apiData = [
        { apiName: 'mon API', theme: 'Sport', price: '10€', author: 'Matt', ratingValue: 4, },
        { apiName: 'API-2', theme: 'Culture', price: '15€', author: 'Pierre', ratingValue: 3, },
        { apiName: 'API-3', theme: 'Weather', price: '20€', author: 'Marie', ratingValue: 5, },
        { apiName: 'API-4', theme: 'Sport', price: '100€', author: 'Paul', ratingValue: 1, },
        { apiName: 'API-5', theme: 'Culture', price: '150€', author: 'Sophie', ratingValue: 2, },
        { apiName: 'API-6', theme: 'Weather', price: '200€', author: 'Julien', ratingValue: 5, },
    ]

    const api = apiData.map(data => {
        return <ApiCard apiName={data.apiName} theme={data.theme} price={data.price} author={data.author} ratingValue={data.ratingValue}></ApiCard>
    });

    return (
        <div>
            <Header />
            <main >
                <div>
                    
                </div>
                <div className='flex flex-wrap'>
                    {api}
                </div>

            </main>
        </div>
    );
}

export default ApiSearch;