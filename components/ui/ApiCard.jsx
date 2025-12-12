import * as React from 'react';
import Rating from '@mui/material/Rating';
import Image from 'next/image';


function ApiCards({ apiName, image, theme, price, author, ratingValue }) {
    const value = ratingValue !== undefined ? ratingValue : 0;


    return (
        <div className='w-44 m-4 rounded-xs overflow-hidden bg-[#050F2A] text-white shadow-lg '>
            <div className='relative h-28 w-full'>
                <Image src={image || '/noImage.jpg'} alt='image' layout='fill' objectFit='cover' />
            </div>
            <div className='flex flex-col h-52 p-3 justify-between'>
                <div id='title' className='flex-grow-0 flex-shrink-0'>
                    <p className='font-semibold text-xl wrap-break-word line-clamp-2'>{apiName || 'API Name (Défaut)'}</p>
                </div>
                <div className='flex flex-col font-light text-xs justify-around gap-2'>
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
    );
}

export default ApiCards;
