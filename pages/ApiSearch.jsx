import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import ApiCard from '../components/ui/ApiCard';
import DropDownButton from '../components/ui/DropDownButton';
import Button from '../components/ui/Button';
import ThemeButton from '../components/ui/ThemeButton'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PaginationApiHub from '../components/ui/PaginationApiHub.jsx';

function ApiSearch() {
    const [filterData, setFilterData] = useState({ categories: [], prices: [], tags: [], follower: [] })
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('query');
    console.log("Search Term:", searchTerm);
    const [searchState, setSearchState] = useState(searchTerm || '');
    const [filters, setFilters] = useState({ category: '', price: '', tagId: '' });
    const [apiCards, setApiCards] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchFilterData = async () => {
            try {
                const response = await fetch('http://localhost:3000/apis/filters');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data.result) {
                    setFilterData(data.filters);
                }
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };
        fetchFilterData();
    }, []);

    const ApiSearchResults = async (pageNumber) => {
        const limit = 6;

        // --- Construction des Query Parameters ---
        const params = new URLSearchParams();
        params.append('page', pageNumber);
        params.append('limit', limit);

        // Ajouter le terme de recherche (si présent)
        if (searchState) {
            params.append('search', searchState);
        }

        // Ajouter les filtres structurés (si présents)
        if (filters.category) {
            params.append('category', filters.category);
        }
        if (filters.price) {
            params.append('price', filters.price);
        }
        console.log(filters)
        if (filters.tag) {
            params.append('tag', filters.tag)
        }

        const apiUrl = `http://localhost:3000/apis/allApi?${params.toString()}`;
        console.log("API URL:", apiUrl);

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json();
            const apiData = responseData.allAPI;
            const paginationInfo = responseData.pagination
            setResultCount(paginationInfo.totalCount || apiData.length)
            setTotalPages(paginationInfo.totalPages || 1)
            setCurrentPage(pageNumber)

            console.log(apiData);
            if (Array.isArray(apiData))
                setResultCount(apiData.length)
            setApiCards(apiData.map(api => (
                <ApiCard
                    key={api._id}
                    apiId={api._id}
                    image={api.image || '/noImage.jpg'}
                    apiName={api.name}
                    theme={api.category}
                    price={api.price}
                    author={api.author}
                    ratingValue={api.ratingValue}
                />
            )));
        } catch (error) {
            console.error('Error fetching API search results:', error);
        }
    };

    useEffect(() => {
        ApiSearchResults(currentPage)
    }, [searchState, filters])



    const handlePageChange = (event, newPage) => {
        ApiSearchResults(newPage);
    };

    // Fonction de gestion du changement de filtre
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => {
            const newValue = (prevFilters[filterName] === value) ? '' : value;
            return {
                ...prevFilters,
                [filterName]: newValue
            };
        })
    };

    const categories = filterData.categories;
    const prices = filterData.prices;
    // Convertir le tableau d'objets tags en tableau de noms pour l'affichage
    const tags = filterData.tags.map(t => t.name);

    const handleCategorySelect = (value) => handleFilterChange('category', value);
    const handlePriceSelect = (value) => handleFilterChange('price', value);
    const handleTagSelect = (value) => handleFilterChange('tag', value);

    const category = ['sport', 'culture', 'weather', 'health']
    const tag = ['#sport', '#life']
    const price = ['free', 'paid']
    const follower = ['matt', 'test']
    const theme = ["Business", "Weather", "Jobs", "Maps"];

    const popSearch = theme.map((data, i) => {
        return <ThemeButton key={i} theme={data} />;
    });

    // const api = apiData.map(data => {
    //     return <ApiCard apiName={data.apiName} theme={data.theme} price={data.price} author={data.author} ratingValue={data.ratingValue}></ApiCard>
    // });

    return (
        <div>
            <Header />
            <main >
                <div id='search' className='flex h-60 justify-center items-center w-full'>
                    <div className="flex flex-col justify-around gap-5 py-5 bg-[#050F2A] w-[90%] h-[90%]">
                        {searchState ? <h2 className="text-white text-3xl font-bold ml-6">Results for {searchState} : {resultCount}</h2> : <h2 className="text-white text-3xl font-bold ml-6">Results for all : {resultCount}</h2>}
                        <div className="bg-white relative justify-between items-center flex w-[90%] ml-6 rounded-xl ">
                            <input
                                type="search"
                                placeholder="your search"
                                className="pl-10 w-[70%] h-11 rounded-l-xl text-slate-700"
                                value={searchState}
                                onChange={(e) => setSearchState(e.target.value)}
                            />
                            <Button classname="h-12 w-40 rounded-xl bg-[#B8A9FF] text-white font-bold shadow hover:bg-[#9d90de] cursor-pointer">
                                Search
                            </Button>
                        </div>
                        <div className="flex gap-10 ml-6 items-center ">
                            <h5 className="text-white font-bold">similar search :</h5>
                            <div className="flex gap-10 p-0">{popSearch}</div>
                        </div>
                    </div>
                </div>
                <div id='dropDownContainer' className='bg-[#050F2A] h-10 flex'>
                    <div id='dropDownButton' className='flex h-10 ml-12'>
                        <DropDownButton title='Category' menu={categories} className='dropDownButtonWhite' onSelect={handleCategorySelect}></DropDownButton>
                        <DropDownButton title='Tag' menu={tags} className='dropDownButtonWhite' onSelect={handleTagSelect}></DropDownButton>
                        <DropDownButton title='Price' menu={prices} className='dropDownButtonWhite' onSelect={handlePriceSelect}></DropDownButton>
                        <DropDownButton title='Follower' menu={follower} className='dropDownButtonWhite'></DropDownButton>
                    </div>
                </div>
                <div className='flex flex-wrap ml-6'>
                    {apiCards}
                </div>
                <div id='pagination' className='flex justify-center'>
                    <PaginationApiHub
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    /></div>
            </main>
        </div>
    );
}

export default ApiSearch;