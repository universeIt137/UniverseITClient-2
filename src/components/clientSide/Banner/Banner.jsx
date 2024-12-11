/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import ButtonLight from '../../../Shared/Button/ButtonLight';
import ButtonStrong from '../../../Shared/Button/ButtonStrong';
const Banner = ({ bannerImg = '', data = {} }) => {
    const [FirstTitleArray, SecondTitleArray] = data.title.split(' ').reduce(
        (acc, word, index, array) => {
            index < array.length - 2 ? acc[0].push(word) : acc[1].push(word);
            return acc;
        },
        [[], []]
    );

    const firstTitle = FirstTitleArray?.join(' ');
    const secondTitle = SecondTitleArray?.join(' ');
    return (
        <div className='bg-[#fefaee]'>
            <div className="px-5 lg:px-16 xl:px-20 flex gap-10 min-h-[40vh] md:min-h-[73vh] max-w-7xl mx-auto">
                <div className="lg:min-h-[73vh] flex justify-center items-center">
                    <div className="lg:max-w-[532px] space-y-6 mx-auto">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-text_color">
                            {firstTitle} <span className="text-primary">{secondTitle}</span>
                        </h1>
                        <p className='font-medium'>{data?.subtitle}</p>
                        <div className="flex gap-5 items-center">


                            <div className="">
                                <Link to={'/courses'}><ButtonStrong text={'Get Started'} /></Link>
                            </div>
                            <div className="">
                                <Link to={'/freeSeminar'}><ButtonLight text={'Join Free Seminar'} /></Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <img className="w-full h-full object-cover" src={bannerImg} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;