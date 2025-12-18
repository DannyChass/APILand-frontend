import * as React from 'react';
import Rating from '@mui/material/Rating';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faBookmark as solidBookmark,
  } from "@fortawesome/free-solid-svg-icons";
  import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

function ApiCardV2({ apiName, _id, image, category, description, user, author, price, isFollowed}) {
    const truncate = (text, maxLength = 120) => {
        if (!text) return "";
    
        if (text.length <= maxLength) return text;
    
        return text.slice(0, text.lastIndexOf(" ", maxLength)) + "…";
      };
    const apiDetailUrl = `/apis/${apiName}`

        return (
            <Link key={_id} href={apiDetailUrl}>
                <div className="bg-slate-50 flex flex-col justify-between rounded-xl border border-slate-300 h-80 w-90 shadow p-5 hover:shadow-lg transition cursor-pointer">
                    <div className="flex justify-between items-center gap-3">
                        <div className="flex gap-3 items-center">
                            <img
                                className="h-15 w-15 fa-lg rounded-full"
                                src={image}
                            />
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faStar} size="md" /> (5)
                            </div>
                        </div>
                        <FontAwesomeIcon
                            icon={isFollowed ? solidBookmark : regularBookmark}
                            size="lg"
                        />
                    </div>

                    <div>
                        <div className="flex flex-col justify-between">
                            <h4 className="font-bold text-xl text-slate-500">{apiName}</h4>
                            <p className="text-sm text-blue-500 font-medium mt-1">{category}</p>
                        </div>
                        <p className="text-xs text-slate-500 h-15 mt-2">
                            {truncate(description, 150)}
                        </p>
                    </div>

                    {author && (
                        <div className="flex w-full justify-end items-center gap-2 mt-4">
                            <img
                                src={user.image}
                                alt={author}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs text-slate-600">by {author}</span>
                        </div>
                    )}
                </div>
            </Link>

        );
    };

export default ApiCardV2;
