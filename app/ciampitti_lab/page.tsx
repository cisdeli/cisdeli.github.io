import Header from '@/app/ui/header'
import Footer from '@/app/ui/footer'
import Image from 'next/image'
import cornGrainsImg from '@/app/assets/out2.png'
import sorgArchPoster from '@/app/assets/main.png'
import cdepthThumbnail from '@/app/assets/cdepth_thumbnail.png'
import hackIlHero from '@/app/assets/hackil_hero.png'
import agritilesImg from '@/app/assets/agritiles.png'

const CiampittiLab = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <div className="content page-content" id="ciampitti-lab">

                    {/* ── 2026 ──────────────────────────────────────────── */}

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">Apple Vision Pro</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">Building ag-tech tools for spatial computing</text>
                                <span className="year-badge">2026</span>
                            </div>
                            <p className="item-text">
                                The Ciampitti Lab got its hands on an Apple Vision Pro thanks to Apple and Purdue University. I&apos;ve been exploring how spatial computing can assist with digital plant phenotyping and data collection in the field. So far I got static object detection running on-device using <span className="font-bold">Core ML</span> with my YOLO models. Live camera access is currently enterprise-only on visionOS, so we&apos;re waiting on the entitlement. Check out the full write-up{' '}
                                <span className="gradient"><a href="https://www.ciampittilab.org/news/building-for-apple-vision-pro-1" target="_blank" rel="noreferrer">here</a></span>.
                            </p>
                        </div>
                        <video
                            src="/avp_rec.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="section-img-lg"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">AgriTiles</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">3D agricultural landscape visualization</text>
                                <span className="year-badge">2026</span>
                            </div>
                            <p className="item-text">
                                AgriTiles is a multi-scale <span className="font-bold">3D visualization system</span> built with Three.js for exploring agricultural landscapes through multiple geospatial data layers. You can inspect crop patterns and their relationship to terrain across the <span className="font-bold">U.S. Corn Belt</span> (Iowa, Illinois, Indiana, Nebraska, Missouri, Kansas) with USDA CDL, SRTM terrain, and Sentinel-2 imagery all in a single browser-based WebGL environment. Give it a try{' '}
                                <span className="gradient"><a href="https://agritiles.com" target="_blank" rel="noreferrer">here</a></span>.
                            </p>
                        </div>
                        <Image
                            className="section-img-lg"
                            src={agritilesImg}
                            alt="AgriTiles 3D visualization"
                            width={500}
                            height={500}
                        />
                    </div>

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">N Scout</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">Precision &amp; Digital Agriculture Hackathon, UIUC</text>
                                <span className="year-badge">2026</span>
                            </div>
                            <p className="item-text">
                                This project was built for the <span className="font-bold">Precision &amp; Digital Agriculture Hackathon at UIUC</span> alongside Gustavo Santiago, Leonardo Bosche, and Natalia Volpato. We built N Scout, a tool that detects nitrogen deficiency in corn fields by combining <span className="font-bold">Sentinel-2 multispectral imagery</span> (10m resolution, V6-V10 growth stages), soil nitrate and weather records for agronomic context, and a <span className="font-bold">leaf-image neural classifier</span> for rapid in-field confirmation at the plant level. On average, 50% of applied N is lost to the environment before ever reaching the plant. The goal is simple: apply the right amount, in the right place, at the right time. Give it a try{' '}
                                <span className="gradient"><a href="https://hackil.onrender.com/" target="_blank" rel="noreferrer">here</a></span>.
                            </p>
                        </div>
                        <Image
                            className="section-img-lg"
                            src={hackIlHero}
                            alt="N Scout Hackathon"
                            width={500}
                            height={500}
                        />
                    </div>

                    {/* ── 2025 ──────────────────────────────────────────── */}

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">Corn Depth</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">Maize ear sensing for on-farm yield predictions, CVPR</text>
                                <span className="year-badge">2025</span>
                            </div>
                            <p className="item-text">
                                The Corn Depth project is a follow up from the Corn Grains project, and it got published at <span className="font-bold">CVPR 2025</span>. Crazy right? We introduce the first fully on-field pipeline that estimates maize-ear length, width and volume from a single RGB + depth capture and immediately forecasts grain yield per plant. A <span className="font-bold">YOLOv12n-seg</span> model isolates the ear in unconstrained lighting, a bespoke network we called <span className="font-bold">EVNet</span> regresses volume from the segmented point cloud, and gradient-boosted trees convert morphology into yield.
                                On Kansas field data we reached <span className="font-bold">98.6% mAP@0.5 for segmentation, 28.9 ml RMSE for volume, and 13.9 g RMSE for yield</span>. The whole pipeline runs in ~1s per image, needs no destructive sampling, and the images, code, and trained weights are all open-sourced. Check out the project page{' '}
                                <span className="gradient"><a href="https://www.ciampittilab.org/projects/maize-ear-sensing" target="_blank" rel="noreferrer">here</a></span>.
                            </p>
                        </div>
                        <Image
                            className="section-img-lg"
                            src={cdepthThumbnail}
                            alt="Corn Depth pipeline thumbnail"
                            width={500}
                            height={500}
                        />
                    </div>

                    {/* ── 2024 ──────────────────────────────────────────── */}

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">AVYield</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">Dashboard and database to support real-time decision making</text>
                                <span className="year-badge">2024</span>
                            </div>
                            <p className="item-text">
                                AVYield is a web-based dashboard that allows users to visualize the results of crop variety trials programs. It also serves as a historical database to help organize all this information. The system is capable of handling and storing a large amount of data. Give it a try by clicking{' '}
                                <span className="gradient"><a href="https://www.avyield.com/" target="_blank" rel="noreferrer">here</a></span>
                                {' '}and feel free to provide any feedback.
                            </p>
                        </div>
                    </div>

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">Corn Grains</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">Phenotyping corn cobs with image processing and machine learning</text>
                                <span className="year-badge">2024</span>
                            </div>
                            <p className="item-text">
                                This project consists of two parts: the first is to develop a high-throughput image/video analysis system to determine the quantity of grains in a rotating corn cob. The hardware responsible for rotating the cob was provided by a third-party company. The second part aims to achieve the same results using just a regular smartphone. I&apos;ll update this topic with more information as soon as I can make it publicly available.
                            </p>
                        </div>
                        <Image
                            className="section-img"
                            src={cornGrainsImg}
                            alt="Corn Grains"
                            width={350}
                            height={350}
                        />
                    </div>

                    <div className="section-item">
                        <div className="section-item-text">
                            <text className="item-title">Sorghum Architecture</text>
                            <div className="flex items-center gap-3 flex-wrap">
                                <text className="section-subtitle">Phenotyping sorghum plants with image processing and machine learning</text>
                                <span className="year-badge">2024</span>
                            </div>
                            <p className="item-text">
                                The Sorghum Architecture project aims to facilitate data collection by utilizing image processing and machine learning on images taken from the field. The results were really good, and the developed system is much faster than conventional methods. I&apos;ll update this soon with more information. For now, zoom in and take a look at the poster to know more.
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <Image
                                className="section-img"
                                src={sorgArchPoster}
                                alt="Sorghum Architecture Poster"
                                width={550}
                                height={550}
                            />
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CiampittiLab;
