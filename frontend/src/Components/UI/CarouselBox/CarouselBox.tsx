import { useState } from 'react'
import { data } from './utils/carousel-data'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'
import cn from 'clsx'

const CarouselBox = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0
		const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1
		setCurrentIndex(newIndex)
	}

	const nextSlide = () => {
		const isLastSlide = currentIndex === data.length - 1
		const newIndex = isLastSlide ? 0 : currentIndex + 1
		setCurrentIndex(newIndex)
	}

	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex)
	}
	return (
		<div>
			<div className='max-w-[1400px] h-[400px] w-full m-auto py-5 px-4 relative group'>
				<div
					style={{ backgroundImage: `url(${data[currentIndex].imgSrc})` }}
					className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
				></div>
				<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
					<BsChevronCompactLeft onClick={prevSlide} size={30} />
				</div>
				<div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
					<BsChevronCompactRight onClick={nextSlide} size={30} />
				</div>
				<div className='flex top-4 justify-center py-2'>
					{data.map((_, slideIndex) => (
						<div
							key={slideIndex}
							onClick={() => goToSlide(slideIndex)}
							className={cn('text-2xl cursor-pointer', {
								'text-black': Number(slideIndex) === Number(currentIndex),
								'text-gray': Number(slideIndex) !== Number(currentIndex)
							})}
						>
							<RxDotFilled />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default CarouselBox
