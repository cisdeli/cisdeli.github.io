import Header from '@/app/ui/header'
import Image from 'next/image'

import mriImg from '@/app/assets/mri_example.jpeg'
import geoImg from '@/app/assets/geodata.png'
import smartDotsGIF from '@/app/assets/smartDots.gif'

const FirstSection = () => {
    return (
        <div>
            <Header />
            <div className='content' id="firstSection">
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Machine Learning</text>
                            <text className="section-subtitle">Predicting levels of Alzheimer Disease with MRI images</text>
                            <p className="item-text">
                                The objective of this project is to evaluate the performance of different machine learning classification algorithms paired with image processing techniques. Additionally, we will use the trained models to predict the level of dementia based on the MRI images.
                                This project was developed for a Machine Learning class at the University of São Paulo (USP) in 2021. Because of this, most of the reports are in Portuguese. I will try to translate them to English as soon as possible. For now use the markdown file on this
                                <span className="gradient"><a href="https://github.com/cisdeli/mri_img_classification" target="_blank"> github repository </a></span>
                                as a guide to the project.
                            </p>
                        </div>
                    </div>
                    <Image
                        className="pt-14"
                        src={mriImg}
                        alt="MRI Image"
                        width={350}
                    />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Image Processing</text>
                            <text className="section-subtitle">NDVI, NDWI and classifying image data</text>
                            <p className="item-text">
                                The main objective is to classify the landscape of an satellite image to provide information for environmental al studies. The datasets used are from the satellite
                                <span className="gradient"><a href="https://sentiwiki.copernicus.eu/web/s2-mission" target="_blank"> Sentinel-2 </a></span>
                                and Google Earth. The input images are rasters formed by eight bands that will be processed with the intention of providing indexes and other usefull statistics. The landscape and forest classification is determined by a machine learning method called Naive Bayes.
                                Access the source code by following this
                                <span className="gradient"><a href="https://github.com/cisdeli/SatellitesImgProcessing" target="_blank"> link.</a></span>
                            </p>
                        </div>
                    </div>
                    <Image
                        className="pt-14"
                        src={geoImg}
                        alt="Geo Data image"
                        width={350}
                    />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="relative isolate px-6 pt-14 lg:px-8">
                        <div className="text-left flex flex-col">
                            <text className="item-title">Genetic Algorithms</text>
                            <text className="section-subtitle">Smart Dots</text>
                            <p className="item-text">
                                This project was developed for a Evolutionary Systems Applied to Robotics class at the University of São Paulo (USP). The objective was to develop a genetic algorithm that could reach a goal avoiding obstacles.
                                Check the source code by following this
                                <span className="gradient"><a href="https://github.com/cisdeli/smartDots" target="_blank"> link.</a></span>
                            </p>
                        </div>
                    </div>
                    <Image
                        className="pt-14"
                        src={smartDotsGIF}
                        alt="Smart Dots GIF"
                        width={400}
                    />
                </div>
            </div>
        </div>
    );
};

export default FirstSection;

