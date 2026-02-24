import DynamicPitch from '../components/DynamicPitch';
import CaseStudySimulator from '../components/CaseStudySimulator';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillsMatrix from '../components/SkillsMatrix';
import ProjectGallery from '../components/ProjectGallery';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

const Home = () => {
    return (
        <main className="pt-20">
            <SEO
                title="Home | Portfolio | Digital Strategist"
                description="Explore my portfolio showcasing digital strategy, enterprise automation, high-availability architecture, and product management."
            />
            <section id="pitch">
                <DynamicPitch />
            </section>

            <section id="experience">
                <ExperienceTimeline />
            </section>

            <section id="skills">
                <SkillsMatrix />
            </section>

            <section id="simulator">
                <CaseStudySimulator />
            </section>

            <section id="gallery">
                <ProjectGallery />
            </section>

            <section id="testimonials">
                <Testimonials />
            </section>
        </main>
    );
};

export default Home;
