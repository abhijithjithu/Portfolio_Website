import DynamicPitch from '../components/DynamicPitch';

import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillsMatrix from '../components/SkillsMatrix';
import ProjectGallery from '../components/ProjectGallery';
import Testimonials from '../components/Testimonials';
import StatsBanner from '../components/StatsBanner';
import Education from '../components/Education';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

// ── SVG wave divider ─────────────────────────────────────────
// flip=true makes it point the other direction
const WaveDivider = ({ fromColor = 'fill-slate-100', toColor = 'fill-blue-50', flip = false }) => (
    <div className={`relative overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} style={{ marginBottom: '-1px' }}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full block"
            style={{ height: '48px' }}
            aria-hidden="true"
        >
            <path
                d="M0,30 C150,60 350,0 600,30 C850,60 1050,0 1200,30 L1200,60 L0,60 Z"
                className={toColor}
            />
        </svg>
    </div>
);

const Home = () => {
    return (
        <main className="pt-[70px]">
            <SEO
                title="Abhijith P | Digital Transformation Strategist"
                description="Portfolio of Abhijith P — digital transformation strategist, MLOps engineer, and MBA (IIM Udaipur). Explore enterprise case studies, system architecture, and data science projects."
                url="https://abhijithjithu.github.io/Portfolio_Website/"
                image="https://abhijithjithu.github.io/Portfolio_Website/assets/profile.jpg"
            />

            {/* Hero */}
            <section id="pitch" className="bg-slate-50 dark:bg-slate-950">
                <DynamicPitch />
            </section>

            {/* Stats banner */}
            <StatsBanner />

            {/* Wave into Experience */}
            <div className="bg-blue-50 dark:bg-slate-900">
                <WaveDivider fromColor="fill-blue-50" toColor="fill-slate-50 dark:fill-slate-950" flip />
            </div>

            {/* Experience */}
            <section id="experience" className="bg-slate-50 dark:bg-slate-950">
                <ExperienceTimeline />
            </section>

            {/* Education */}
            <section id="education" className="bg-slate-50 dark:bg-slate-950">
                <Education />
            </section>

            {/* Wave into Skills */}
            <div className="bg-slate-100 dark:bg-slate-900">
                <WaveDivider fromColor="fill-slate-100 dark:fill-slate-900" toColor="fill-slate-50 dark:fill-slate-950" flip />
            </div>

            {/* Skills */}
            <section id="skills" className="bg-slate-50 dark:bg-slate-950">
                <SkillsMatrix />
            </section>



            {/* Wave into Projects */}
            <div className="bg-slate-100 dark:bg-slate-900">
                <WaveDivider fromColor="fill-slate-50 dark:fill-slate-950" toColor="fill-slate-100 dark:fill-slate-900" />
            </div>

            {/* Projects */}
            <section id="gallery" className="bg-slate-100 dark:bg-slate-900">
                <ProjectGallery />
            </section>

            {/* Wave out of Projects */}
            <div className="bg-slate-100 dark:bg-slate-900">
                <WaveDivider fromColor="fill-slate-100 dark:fill-slate-900" toColor="fill-slate-50 dark:fill-slate-950" />
            </div>

            {/* Testimonials */}
            <section id="testimonials" className="bg-slate-50 dark:bg-slate-950">
                <Testimonials />
            </section>

            {/* Contact Form */}
            <section id="contact" className="bg-slate-50 dark:bg-slate-950">
                <ContactForm />
            </section>
        </main>
    );
};

export default Home;
