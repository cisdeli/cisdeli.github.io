import Header from '@/app/ui/header'
import Image from 'next/image'
import cornGrainsImg from '@/app/assets/out2.png'
import sorgArchPoster from '@/app/assets/main.png'

const SecondSection = () => {
    return (
        <div>
            <Header />
            <div className='content' id="secondSection">
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Corn Grains</text>
                            <text className="section-subtitle">Phenotyping corn cobs with image processing and machine learning</text>
                            <p className="item-text">
                                This project consists of two parts: the first is to develop a high-throughput image/video analysis system to determine the quantity of grains in a rotating corn cob. The hardware responsible for rotating the cob was provided by a third-party company. The second part aims to achieve the same results using just a regular smartphone. I'll update this topic with more information as soon as I can make it publicly available.
                            </p>
                        </div>
                    </div>
                    <Image
                        className="pt-14"
                        src={cornGrainsImg}
                        alt="Corn"
                        width={350}
                    />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Corn Depth</text>
                            <text className="section-subtitle">High-throughput, field-level image analysis of corn cobs</text>
                            <p className="item-text">
                                The Corn Depth project if a follow up from the Corn Grains project. The goal is to develop an algorithm that can estimate the quantity of grains on a corn cob with the husk still on. Crazy right? I agree, but I'm trying my best here. Our initial thesis is that we can model how the volume of a corn cob interacts with the number of grains. The algorithm is already done and we are currently waiting for the in-field tests to proceed. I'll update this topic with more information as soon as I can make it publicly available.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Crop Variety Trials</text>
                            <text className="section-subtitle">Dashboard and database to support real-time desicion making</text>
                            <p className="item-text">
                                This project is a web-based dashboard that allows users to visualize the results of the KState Crop Variety Trials program. It also serves as a historical database to help organize all this information. The system is capable of handling and storing a large amount of data. Give it a try by clicking
                                <span className="gradient"><a href="https://croptrials.cisdeli.dev" target="_blank"> here</a></span> and feel free to provide any feedback.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Sorghum Architecture</text>
                            <text className="section-subtitle">Phenotyping sorghum plants with image processing and machine learning</text>
                            <p className="item-text">
                                The Sorghum Architecture project aims to facilitate data collection by utilizing image processing and machine learning on images taken from the field. The results were really good, and the developed system is much faster than conventional methods. I'll update this soon with more information. For now, zoom in and take a look at the poster to know more.
                            </p>
                        </div>
                    </div>
                    <Image
                        className="pt-14"
                        src={sorgArchPoster}
                        alt="Corn"
                        width={550}
                    />
                </div>
            </div>
        </div>
    );
};

export default SecondSection;

