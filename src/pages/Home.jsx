import DynamicPitch from '../components/DynamicPitch';
import CaseStudySimulator from '../components/CaseStudySimulator';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillsMatrix from '../components/SkillsMatrix';
import ProjectGallery from '../components/ProjectGallery';
import Testimonials from '../components/Testimonials';
import StatsBanner from '../components/StatsBanner';
import Education from '../components/Education';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <main className="pt-[70px]">
            <SEO
                title="Jithu Abhijith | Digital Transformation Strategist"
                description="Portfolio of Jithu Abhijith — digital transformation strategist, MLOps engineer, and MBA (IIM Udaipur). Explore enterprise case studies, system architecture, and data science projects."
                url="https://abhijithjithu.github.io/Portfolio_Website/"
                image="https://abhijithjithu.github.io/Portfolio_Website/assets/profile.jpg"
            />

            {/* Hero */}
            <section id="pitch">
                <DynamicPitch />
            </section>

            {/* Stats banner — dark break between hero and timeline */}
            <StatsBanner />

            {/* Experience */}
            <section id="experience">
                <ExperienceTimeline />
            </section>

            {/* Education */}
            <section id="education">
                <Education />
            </section>

            {/* Skills */}
            <section id="skills">
                <SkillsMatrix />
            </section>

            {/* Case Study Simulator */}
            <section id="simulator">
                <CaseStudySimulator />
            </section>

            {/* Projects */}
            <section id="gallery">
                <ProjectGallery />
            </section>

            {/* Testimonials */}
            <section id="testimonials">
                <Testimonials />
            </section>
        </main>
    );
};

export default Home;
