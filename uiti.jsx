const navli = (
    <>
        <NavLink to={'/aboutUs'} className={`${navStyle}`}>
            <a>About us</a>
            {stylingComponents}
        </NavLink>
        <NavLink to={'/faculties'} className={`${navStyle}`}>
            <a>Faculties</a>
            {stylingComponents}
        </NavLink>
        <NavLink to={'/representative'} className={`${navStyle}`}>
            <a>Representative</a>
            {stylingComponents}
        </NavLink>

        {/* Gallery dropdown */}
        <div className={`${navStyle} relative`} onMouseEnter={() => setGalleryOpen(true)} onMouseLeave={() => setGalleryOpen(false)}>
            <a className="flex items-center gap-1 cursor-pointer">
                Gallery <FaAngleDown />
            </a>
            {stylingComponents}
            {galleryOpen && (
                <div className="absolute left-0 top-full mt-1 bg-white border rounded-lg shadow-lg">
                    <NavLink to={'/photoGallery'} className={`${navStyle} block px-4 py-2`}>
                        <a>Photo Gallery</a>
                    </NavLink>
                    <NavLink to={'/videoGallery'} className={`${navStyle} block px-4 py-2`}>
                        <a>Video Gallery</a>
                    </NavLink>
                </div>
            )}
        </div>

        <NavLink to={'/feedback'} className={`${navStyle}`}>
            <a>Student's FeedBack</a>
            {stylingComponents}
        </NavLink>
        <NavLink to={'/contact-us'} className={`${navStyle}`}>
            <a>Contact Us</a>
            {stylingComponents}
        </NavLink>

        <div className="block xs:hidden pb-4">
            <Link to="/courses">
                <button className="text-sm sm:text-base bg-primary text-white hover:bg-text_color px-2 py-2 sm:px-4 sm:py-3 flex sm:gap-2 items-center justify-center rounded-lg hover:rounded-xl transition-all duration-300 active:scale-90 font-bold">Browse Courses</button>
            </Link>
        </div>
        <div className='relative block lg:hidden'>
            <input className='pl-10 px-5 py-3 border-[2.5px] border-gray-200 w-full xl:w-[400px] rounded-lg' type="text" placeholder='What do you want to learn?' />
            <FiSearch className='absolute top-4 left-3 text-gray-500 text-lg' />
        </div>
    </>
);