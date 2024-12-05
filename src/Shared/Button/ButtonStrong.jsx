/* eslint-disable react/prop-types */

const ButtonStrong = ({ text,isWidthFull=false }) => {
    return ( 
        <button className={`bg-primary/95 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-md  text-white my-5 font-bold flex justify-center items-center hover:bg-text_color hover:text-white transition-all duration-300 active:scale-90  ${isWidthFull ? 'w-full' : 'w-max'}`}>{text}</button>
    ); 
};

export default ButtonStrong;