import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ArticleCard = () => {
    return (
        <div>
            <div className="grid grid-cols-4 gap-4">
                <div className="shadow h-20">
                   <Image 
                        src="/images/village.png"
                        alt="photo"
                        width={50}
                        height={50}
                   />
                   <p>Title</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard
