import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import ApiCard from '../components/ui/ApiCard';
import DropDownButton from '../components/ui/DropDownButton';
import Button from '../components/ui/Button';
import ThemeButton from '../components/ui/ThemeButton'


function ApiSearch() {

    const apiData = [
        { apiName: 'mon API', theme: 'Sport', price: '10€', author: 'Matt', ratingValue: 4, },
        { apiName: 'API-2', theme: 'Culture', price: '15€', author: 'Pierre', ratingValue: 3, },
        { apiName: 'API-3', theme: 'Weather', price: '20€', author: 'Marie', ratingValue: 5, },
        { apiName: 'API-4', theme: 'Sport', price: '100€', author: 'Paul', ratingValue: 1, },
        { apiName: 'API-5', theme: 'Culture', price: '150€', author: 'Sophie', ratingValue: 2, },
        { apiName: 'API-6', theme: 'Weather', price: '200€', author: 'Julien', ratingValue: 5, },
    ]

    const category = ['Sport', 'Culture', 'Weather', 'Health']
    const tag = ['#sport', '#life']
    const price = ['free', 'paid']
    const follower = ['matt', 'test']
    const theme = ["Business", "Weather", "Jobs", "Maps"];
    
      const popSearch = theme.map((data, i) => {
        return <ThemeButton key={i} theme={data} />;
      });

    const api = apiData.map(data => {
        return <ApiCard apiName={data.apiName} theme={data.theme} price={data.price} author={data.author} ratingValue={data.ratingValue}></ApiCard>
    });

    return (
        <div>
            <Header />
            <main >
                <div id='search' className='flex h-96 justify-center items-center w-full'>
                    <div className="flex flex-col justify-baseline gap-5 bg-[#050F2A] w-[90%] h-[70%]">
                        <h2 className="text-white text-3xl font-bold mt-10 ml-6">Results for "your search" :</h2>
                        <div className="bg-white relative justify-between items-center flex w-[90%] ml-6 rounded-xl ">
                            <input
                                type="search"
                                placeholder="your search"
                                className="pl-10 w-[70%] h-11 rounded-l-xl text-slate-700"
                            />
                            <Button classname="h-11 w-40 rounded-xl bg-[#B8A9FF] text-white font-bold shadow hover:bg-[#9d90de] cursor-pointer">
                                Connexion
                            </Button>
                        </div>
                        <div className="flex gap-10 ml-6 items-center ">
                            <h5 className="text-white font-bold">similar search :</h5>
                            <div className="flex gap-10">{popSearch}</div>
                        </div>
                    </div>
                </div>
                <div id='dropDownContainer' className='bg-[#050F2A] h-20 flex'>
                    <div id='dropDownButton' className='flex ml-12'>
                        <DropDownButton title='Category' menu={category} className='dropDownButtonWhite'></DropDownButton>
                        <DropDownButton title='Tag' menu={tag} className='dropDownButtonWhite'></DropDownButton>
                        <DropDownButton title='Price' menu={price} className='dropDownButtonWhite'></DropDownButton>
                        <DropDownButton title='Follower' menu={follower} className='dropDownButtonWhite'></DropDownButton>
                    </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                    {api}
                </div>
            </main>
        </div>
    );
}

export default ApiSearch;