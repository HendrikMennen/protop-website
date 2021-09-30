import React, { useEffect, Suspense } from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { Container, Row, Col, Card } from 'react-bootstrap';
import classnames from "classnames";
import Link from "@docusaurus/Link";
import styles from "../css/index.module.css";

import AOS from "aos";
import "aos/dist/aos.css";

const LazyThreeJSAnimationShader = React.lazy(() => import("../shape/ThreeJSAnimationShader"));

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    const fallback = <canvas style={{
        height: "800px",
        width: "100vh",
        maxHeight: "800px",
        position: "fixed",
        transform: `translateY(60px)`,
        top: 0,
        zIndex: -10
    }} />;

    useEffect(() => {
        if (ExecutionEnvironment.canUseDOM) {
            AOS.init();
            updateDarkModeClass();
        }
    }, [ExecutionEnvironment.canUseDOM]);

    function updateDarkModeClass() {
        if (!document) return;
        if (document.documentElement?.dataset?.theme === "dark" && !document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    useEffect(() => {
        if (!ExecutionEnvironment.canUseDOM) return;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(function (mutation) {
                if (mutation.type == "attributes"
                    && mutation.attributeName === "data-theme") {
                    updateDarkModeClass();
                }
            });
        });
        observer.observe(document.documentElement, {
            attributes: true,
            childList: false,
            subtree: false
        });
        return () => {
            observer.disconnect();
        };
    }, [ExecutionEnvironment.canUseDOM]);


    return (
        <Layout
            title={"Protop Solutions"}
            description="Professional Technology for Ordinary People">

            <BrowserOnly
                fallback={fallback}>
                {() => (
                    <Suspense fallback={fallback}>
                        <LazyThreeJSAnimationShader />
                    </Suspense>
                )}
            </BrowserOnly>

            <header className={classnames("hero", styles.heroBanner)}>
                <Container>
                    <div className={styles.promoSection}>
                        <h1 className={styles.promoTitle}
                            data-aos="zoom-y-out"
                            data-aos-delay="50">Protop</h1>
                        <h1 className={styles.promoTitleTwo}
                            data-aos="zoom-y-out"
                            data-aos-delay="50">Solutions</h1>
                        <p className={styles.promoSubtitle}
                            data-aos="zoom-y-out"
                            data-aos-delay="100">Professional Technology for Ordinary People</p>
                    </div>

                    <Link
                        className={classnames("button button--primary hideMobile button--lg", styles.startButton)}
                        to={"/docs/getstarted#install-vhdplus-ide"}
                        data-aos="zoom-y-out"
                        data-aos-delay="150">
                        Read More
                    </Link>
                    <Link
                        className={classnames("button button--secondary button--lg", styles.startButtonSecondary, styles.startButton)}
                        to={"/docs/getstarted"}
                        data-aos="zoom-y-out"
                        data-aos-delay="200">
                        Contact Us
                    </Link>
                </Container>
            </header>

            <main>
                <section className={styles.part}>
                    <Container data-aos="fade-up" data-aos-delay="100" className={classnames(styles.features)}>
                        <Row className={classnames("justify-content-md-center")}>
                            <Col>
                                <img src="/static/img/company.png" />
                            </Col>
                            <Col>
                                <img src="/static/img/customer_pur.png" />
                            </Col>
                            <Col>
                                <img src="/static/img/university_or.png" />
                            </Col>
                        </Row>
                        <Row className="display-flex padding-vert--md">
                            <Col>
                                <h2 className="text-center">Trusted by Companies, Universities and other creative minds</h2>
                            </Col>
                        </Row>
                    </Container>

                </section>

                <section className={styles.part}>
                    <Container>
                        <Row>
                            <Col data-aos="fade-right" data-aos-delay="100" className="padding--lg">
                                <h2>Development</h2>
                                Lorem ipsum nugget
                            </Col>
                            <Col data-aos="fade-left" data-aos-delay="100">
                                <img src="/static/img/Development.png" />
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>

        </Layout>
    );
}

export default Home;

