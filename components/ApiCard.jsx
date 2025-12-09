

function ApiCards(props) {

    return (
        <div className='flex flex-col md:flex-row justify-content: flex-start w-56 m-5'>
            <img className='w-56 rounded-tr-sm' src='/backgroundImage.jpg' alt='title' />
            <div className='flex flex-col h-56 m-2.5'>
                <div>
                    <span className='font-semibold'>Titre</span>
                    <p className='font-light text-xs'>Thème</p>
                    <p className='font-light text-xs'>prix</p>
                    <p className='font-light text-xs'>Auteur</p>
                    <p className='font-light text-xs'>Avis</p>
                </div>
            </div>
        </div>
    );
}

export default Movie;
