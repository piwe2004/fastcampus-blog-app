import { useState } from 'react'

const IMAGE_1_URL =
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const IMAGE_2_URL =
    "https://images.unsplash.com/photo-1606117331085-5760e3b58520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
const IMAGE_3_URL =
    "https://images.unsplash.com/photo-1667971286579-63a5222780ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";

const imgArray = [IMAGE_1_URL, IMAGE_2_URL, IMAGE_3_URL]

export default function Carousel() {
    const [activeImage, setActiveImage] = useState(1);
    const [selectNum, setselectNum] = useState(1)
    console.log(activeImage)
    return (
        <div>
            <div className="carousel">
                <ul className="carousel__slides">
                    {
                        imgArray.map((x, i) => (
                            <li className={`carousel__slide-img ${selectNum === i + 1 ? 'carousel__slide-active' : ''}`} key={i}>
                                <img src={x} alt={`이미지 ${i}`} />
                            </li>
                        ))
                    }
                </ul>
                <div className="carousel__controls">
                    <button
                        onClick={() => setselectNum(selectNum <= 1 ? imgArray.length : selectNum - 1)}
                        className="carousel__slide-prev"
                    >
                        <span>&lsaquo;</span>
                    </button>
                    <button
                        onClick={() => setselectNum(selectNum >= imgArray.length ? 1 : selectNum + 1)}
                        className="carousel__slide-next"
                    >
                        <span>&rsaquo;</span>
                    </button>
                </div>
                <div className="carousel__dots">
                    {
                        imgArray.map((x, i) => (
                            <button onClick={() => setselectNum(i+1)} className={`carousel__dot ${selectNum === i + 1 ? 'carousel__dot-active' : ''}`} key={i} >
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
