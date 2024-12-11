/* eslint-disable react/prop-types */
import { useState } from "react";

const AddBulletPoint = ({ allKeyFeatures, setAllKeyFeatures }) => {
    const [feature, setFeature] = useState('');
    const [err, setErr] = useState('')
    const handleStoreFeatures = async () => {
        setErr('');
        if (!feature) {
            return setErr('Please, write a feature!!')
        }
        setAllKeyFeatures([...allKeyFeatures, feature])
        setFeature('')
    }
    const handleDeleteFeature = (item) => {
        const newFeatures = allKeyFeatures?.filter(i => i !== item);
        setAllKeyFeatures(newFeatures)
    }
    return (
        <div className='w-full'>
            <label className="leading-7 text-sm text-gray-600 font-bold">Add Bullet points</label>
            <div className='w-full'>
                <div className="p-2 w-full">
                    <div className="relative space-y-2">
                        <div className=' gap-2'>
                            <div>
                                <label className="leading-7 text-sm text-gray-600 font-medium">Bullet Point</label><br />
                                <input onChange={(e) => setFeature(e.target.value)} value={feature} className="file-input file-input-bordered file-input-md w-full" type="text" />
                            </div>
                        </div>
                        <p className='text-red-500 text-sm'>{err}</p>
                        <p onClick={handleStoreFeatures} className='btn flex flex-col justify-center items-center px-7 py-1 rounded-md bg-primary text-white hover:font-bold transition-all duration-300 hover:bg-orange-700  active:bg-primary focus:outline-none focus:ring focus:ring-red-300 active:scale-90 focus:text-white w-max'>Add</p>
                        <p>Added Bullet Point</p>
                        {allKeyFeatures?.length < 1 && <p>No Point Added!!</p>}

                        <div className="grid">
                            <div className="flex flex-col gap-5 pb-5">
                                {allKeyFeatures.map((item, index) => (
                                    <div key={index} className="gap-2 relative">
                                        <li className='  flex items-center text-primary gap-2'><span>{item}</span></li>
                                        <hr className='border-primary' />
                                        <p onClick={() => handleDeleteFeature(item)} className='text-center bg-primary/30 text-text_color size-6 absolute right-[-16px] top-[-16px] rounded-md ml-auto mb-2 cursor-pointer'>X</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default AddBulletPoint;