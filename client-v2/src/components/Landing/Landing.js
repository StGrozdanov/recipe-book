import LandingHeader from "./modules/LandingHeader/LandingHeader";
import LandingNav from "./modules/LandingNav/LandingNav";
import LandingDescription from "./modules/LandingDescription/LandingDescription";
import LandingFeatures from './modules/LandingFeatures/LandingFeatures';

export default function Landing() {
    return (
        <section>
            <LandingNav />
            <LandingHeader />
            <LandingDescription />
            <LandingFeatures />

            <section style={{height: '100vh'}} className="landing-latest-recepies">
                <span className="landing-latest-recepies-span">smh</span>
                <h3 className="landing-heading">Най-новите рецепти</h3>
                <section className="landing-latest-recepies-container">
                </section>
            </section>

            <section className="landing-most-viewed-latest-comments">
                <article className="landing-most-viewed">
                    <span className="landing-most-viewed-recepies-span">smh</span>
                    <h3 className="landing-heading">Най-разглежданите рецепти</h3>
                    <section className="landing-most-viewed">
                    </section>
                </article>

                <article className="landing-latest-comments">
                    <span className="landing-most-viewed-recepies-span">smh</span>
                    <h3 className="landing-heading">Последни коментари</h3>

                    <section className="landing-most-viewed comment-section">
                    </section>
                </article>
            </section>
        </section>
    )
}