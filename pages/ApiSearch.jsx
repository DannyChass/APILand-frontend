import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import ApiCard from '../components/ui/ApiCard';
import ApiCardV2 from '../components/ui/ApiCardV2';
import DropDownButton from '../components/ui/DropDownButton';
import Button from '../components/ui/Button';
import Footer from '../components/Footer.jsx';
import ThemeButton from '../components/ui/ThemeButton'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PaginationApiHub from '../components/ui/PaginationApiHub.jsx';
import { useSelector } from "react-redux";

function ApiSearch() {
    const [filterData, setFilterData] = useState({ categories: [], prices: [], tags: [], follower: [] })
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('query');
    const searchCat = searchParams.get('category')
    console.log('search Cat:', searchCat)
    console.log("Search Term:", searchTerm);
    const [searchState, setSearchState] = useState(searchTerm || '');
    const [newSearchState, setNewSearchState] = useState(searchTerm || '')
    const [filters, setFilters] = useState({ category: searchCat || '', price: '', tag: '' });
    const [apiCards, setApiCards] = useState([]);
    const [resultCount, setResultCount] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [tagSearchTerm, setTagSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const user = useSelector((state) => state.user.data);
    const [userFollow, setUserFollow] = useState([]);



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


    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");

        if (!user?._id) return;

        (async () => {
            const response = await fetch(
                `http://localhost:3000/users/follow/${user._id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await response.json();
            console.log(data.data);
            setUserFollow(data.data);
        })();
    }, [user]);


    const handleInputChange = async (text) => {
        setSearchState(text);

        if (text.length >= 3) {
            try {
                const response = await fetch(
                    `http://localhost:3000/apis/allApi/${text}`
                );
                const data = await response.json();

                const result = data.map((api) => api.name);
                console.log(data);
                setSuggestions(result);
            } catch (error) {
                console.log(error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (name) => {
        setSearchState(name);
        setSuggestions([]);
    }

    const suggests = suggestions.map((data, i) => {
        return (
            <li
                key={i}
                className="p-2 text-sm   hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectSuggestion(data)}
            >
                {data}
            </li>
        );
    });

    const ApiSearchResults = async (pageNumber) => {

        const limit = 18;

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
        if (filters.tag) {
            params.append('tag', filters.tag)
        }
        console.log(filters)
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
                setResultCount(paginationInfo.totalCount)
            setApiCards(apiData.map(api => (

                <ApiCardV2
                    {...api} isFollowed={userFollow.some(f => f.api?._id === api._id)}


                />
            )));
            setNewSearchState(searchState)
        } catch (error) {
            console.error('Error fetching API search results:', error);
        }
    };

    useEffect(() => {
        ApiSearchResults(1)
    }, [filters])

    useEffect(() => {
        if (searchState === '') {
            ApiSearchResults(1)
        }
    }, [searchState])


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

    const handleSearch = (() => {
        ApiSearchResults(1)

    })


    const categories = filterData.categories
    const prices = filterData.prices;
    // Convertir le tableau d'objets tags en tableau de noms pour l'affichage
    const tags = filterData.tags.map(t => t.name).filter(t => t.toLocaleLowerCase().startsWith(tagSearchTerm.toLocaleLowerCase()));

    const handleCategorySelect = (value) => handleFilterChange('category', value);
    const handlePriceSelect = (value) => handleFilterChange('price', value);
    const handleTagSelect = (value) => handleFilterChange('tag', value);

    const theme = ["Business", "Weather", "Jobs", "Maps"];

    const popSearch = theme.map((data, i) => {
        return <ThemeButton key={i} theme={data} />;
    });

    const handleTagSearch = ((text) => {
        if (text.length >= 3) {
            setTagSearchTerm(text);
        };
    })

    const handleDeleteTerm = (() => {
        setTagSearchTerm('')
    })

    const handleResetAllFilters = (() => {
        setFilters({ category: '', price: '', tagId: '' })
    })

    const resetCategoryFilter = (() => {
        setFilters({ category: '', price: filters.price, tag: filters.tag })
    })
    const resetTagFilter = (() => {
        setFilters({ category: filters.category, price: filters.price, tag: '' })
    })
    const resetPriceFilter = (() => {
        setFilters({ category: filters.category, price: '', tag: filters.tag })
    })

    // const api = apiData.map(data => {
    //     return <ApiCard apiName={data.apiName} theme={data.theme} price={data.price} author={data.author} ratingValue={data.ratingValue}></ApiCard>
    // });

    return (
        <div>
            <Header />
            <main >
                <div id='search' className='flex h-40 justify-center items-center w-full'>
                    <div className="flex flex-col justify-around gap-5 py-5 bg-[#050F2A] w-[90%] h-[90%]">
                        {searchState ? <h2 className="text-white text-2xl ml-6">Results for {newSearchState} : {resultCount}</h2> : <h2 className="text-white text-2xl ml-6">Results for all : {resultCount}</h2>}
                        <div className="bg-white relative flex items-center 
                                        w-full sm:w-[80%] md:w-[60%] lg:w-[96%]
                                        rounded-xl px-3 py-2 ml-6">
                            <input
                                onSearch={(e) => { if (e.target.value === '') console.log('salut') }}
                                type="search"
                                placeholder="your search"
                                value={searchState}
                                className="pl-10 w-full h-11 rounded-l-xl text-slate-700
                                text-sm sm:text-base"
                                onChange={(e) => handleInputChange(e.target.value)}
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute left-0 right-0  top-11 text-slate-500 z-10 border rounded shadow bg-white">
                                    {suggests}
                                </ul>
                            )}

                            <Button onClick={handleSearch} className="h-11 px-5 sm:px-8 rounded-xl bg-[#B8A9FF] text-white font-bold 
        shadow hover:bg-[#9d90de] cursor-pointer flex items-center justify-center
        ml-2 whitespace-nowrap">
                                Search
                            </Button>
                        </div>
                        {/* <div className="flex gap-10 ml-6 items-center ">
                            <h5 className="text-white font-bold">similar search :</h5>
                            <div className="flex gap-10 p-0">{popSearch}</div>
                        </div> */}
                    </div>
                </div>
                <div id='dropDownContainer' className='bg-[#050F2A] h-10 flex justify-between'>
                    <div id='dropDownButton' className='flex h-10 ml-12'>
                        <DropDownButton title='Category' menu={categories} className='dropDownButtonWhite' onSelect={handleCategorySelect} ></DropDownButton>
                        <DropDownButton title='Tag' menu={tags} handleSearch={handleTagSearch} handleDelete={handleDeleteTerm} className='dropDownButtonWhite' onSelect={handleTagSelect} searchValue={tagSearchTerm}></DropDownButton>
                        <DropDownButton title='Price' menu={prices} className='dropDownButtonWhite' onSelect={handlePriceSelect}></DropDownButton>
                        <div id='filterContainer' className='flex items-center'>
                            {(filters.category || filters.price || filters.tag) &&
                                <p onClick={handleResetAllFilters} className='text-[#9d90de] text-xs w-30 cursor-pointer'>Reset all filters</p>}
                            {filters.category &&
                                <div className="bg-[#B8A9FF] text-white text-[10px] px-2 py-1 rounded flex items-center gap-2 m-1">
                                    {filters.category}
                                    <span onClick={resetCategoryFilter} className="cursor-pointer font-bold hover:text-[#050F2A]">✕</span>
                                </div>}
                            {filters.tag &&
                                <div className="bg-[#B8A9FF] text-white text-[10px] px-2 py-1 rounded flex items-center gap-2 m-1">
                                    {filters.tag}
                                    <span onClick={resetTagFilter} className="cursor-pointer font-bold hover:text-[#050F2A]">✕</span>
                                </div>}
                            {filters.price &&
                                <div className="bg-[#B8A9FF] text-white text-[10px] px-2 py-1 rounded flex items-center gap-2 m-1">
                                    {filters.price}
                                    <span onClick={resetPriceFilter} className="cursor-pointer font-bold hover:text-[#050F2A]">✕</span>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[95%] mx-auto flex flex-col gap-6 mt-10">
<div className='flex flex-wrap gap-6 sm:gap-8 md:gap-10 
      justify-start items-start 
      px-0.1 sm:px-6 sm:ml-30 md:px-10 md:ml-25 mt-10'>
                    {apiCards}
                </div>
                </div>
                
                <div id='pagination' className='flex justify-center'>
                    <PaginationApiHub
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    /></div>
            </main>
            <Footer />
        </div>
    );
}

export default ApiSearch;