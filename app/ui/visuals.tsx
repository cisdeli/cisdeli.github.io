import WaveSVG from '@/app/assets/wave.svg';
import PeaksSVG from '@/app/assets/peaks.svg';
import Image from 'next/image';

const Separator = ({ type }: { type: string }) => {
    if (type === 'wave') {
        return (
            <div className="mb-10 mt-10">
                <Image
                    priority
                    src={WaveSVG}
                    alt="Wave Separator"
                />
            </div>
        );
    } else if (type === 'peaks') {
        return (
            <div className="mb-10 mt-10">
                <Image
                    priority
                    src={PeaksSVG}
                    alt="Peaks Separator"
                />
            </div>
        );
    } else {
        return null; // Handle other types or remove this else block if not needed
    }
};

export default Separator;

