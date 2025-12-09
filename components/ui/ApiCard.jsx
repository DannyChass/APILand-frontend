import * as React from 'react';
import Rating from '@mui/material/Rating';


function ApiCards({ apiName, theme, price, author, ratingValue }) {
    const value = ratingValue !== undefined ? ratingValue : 2;


    return (
        <div className='w-56 m-5 rounded-xs overflow-hidden bg-[#050F2A] text-white shadow-lg '>
            <img className='w-full object-cover h-auto' src='/noImage.jpg' alt='title' />
            <div className='flex flex-col h-56 p-3 justify-between'>
                <div>
                    <p className='font-semibold mb-3.5 mt-2 text-xl'>{apiName || 'API Name (Défaut)'}</p>
                    <div className='flex flex-col font-light text-xs justify-between mt-5 gap-y-5'>
                        <p>Theme : {theme}</p>
                        <p>Prix : {price}</p>
                        <p>Auteur : {author}</p>
                        <div className='flex flex-row justify-between'>
                            <p>Avis </p>
                            <Rating name="read-only" value={value} readOnly size='small' sx={{
                                color: '#B8A9FF',
                                '& .MuiRating-iconEmpty': {
                                    fill: 'white',
                                    stroke: 'white',
                                    strokeWidth: '0.5px',
                                    color: 'transparent',
                                },
                                '& .MuiRating-icon': {
                                    opacity: 1,
                                },
                            }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApiCards;
