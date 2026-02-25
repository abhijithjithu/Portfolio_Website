import {
    Building2,
    ServerCog,
    Lightbulb,
    Briefcase,
    MonitorPlay,
    Activity,
    ShieldCheck,
    GraduationCap,
    Cloud
} from 'lucide-react';

export const pitchData = {
    "Digital Strategy & Enterprise Management": {
        title: "Bridging Business and Code",
        description: "Leveraging my MBA from IIM Udaipur, I transform complex enterprise challenges into streamlined, automated processes. I specialize in aligning digital strategy with organizational goals, ensuring that every deployment delivers measurable business impact.",
        highlights: ["IIM Udaipur MBA", "Process Automation", "Enterprise Strategy"],
        icon: Building2
    },
    "MLOps & System Architecture": {
        title: "Architecting Scalable Intelligence",
        description: "With over 3.3 years of hands-on technical experience, I build resilient cloud infrastructures and robust Python-based MLOps pipelines. I design systems that guarantee high availability, optimize sever uptime, and scale seamlessly under load.",
        highlights: ["3.3+ Years Exp", "Python & MLOps", "Cloud Infrastructure"],
        icon: ServerCog
    },
    "Entrepreneurship & Product": {
        title: "Building from Zero to One",
        description: "Driven by a builder's mindset, I've hands-on experience co-founding ventures like the digital brand PlaySekai and navigating the complexities of a health-tech startup. I understand agile product development, user-centric design, and market fit.",
        highlights: ["PlaySekai Co-founder", "Health-Tech Startup", "Agile Product Dev"],
        icon: Lightbulb
    }
};

export const projectData = [
    {
        id: "clv-analysis",
        company: "Personal Project",
        role: "Data Scientist",
        title: "Customer Lifetime Value (CLV) Analysis",
        description: "Analyzed a real-world transaction dataset (CDNow) to estimate Customer Lifetime Value (CLV), identifying that frequent buyers generate ~6x more value and proving retention drives CLV significantly more than margin.",
        tags: ["Python", "Customer Analytics", "CLV Modeling", "Cohort Analysis"],
        icon: Activity,
        color: "from-blue-600/20 to-purple-600/20",
        border: "border-blue-500/30",
        content: [
            { type: 'section_title', text: 'Problem Statement' },
            { type: 'paragraph', text: 'A key challenge in retail analytics is understanding which customers drive long-term profitability. While acquisition brings in new users, businesses often struggle to quantify:' },
            {
                type: 'list', items: [
                    'How valuable a customer is over time',
                    'Whether retention or margin improvements matter more',
                    'Which customer segments deserve priority'
                ]
            },
            { type: 'paragraph', text: 'This project analyzes a real-world transaction dataset to estimate Customer Lifetime Value (CLV) and derive actionable business insights.' },

            { type: 'section_title', text: 'Dataset' },
            {
                type: 'list', items: [
                    'Source: CDNow dataset (single acquisition cohort)',
                    'Transactions: 69,659',
                    'Customers: 23,570',
                    'Time Period: Jan 1997 – Jun 1998'
                ]
            },
            { type: 'paragraph', text: '**Key Fields:** Customer ID, Transaction Date, Purchase Quantity, Revenue' },

            { type: 'section_title', text: 'Approach' },
            { type: 'subtitle', text: '1. Retention Estimation' },
            {
                type: 'list', items: [
                    'Defined retention as repeat purchase behavior',
                    'Estimated probability of a customer returning after first purchase'
                ]
            },
            { type: 'subtitle', text: '2. CLV Modeling' },
            { type: 'paragraph', text: 'Used a retention-based infinite horizon model:' },
            { type: 'formula', equation: 'CLV = (Margin × AvgMonthlyRevenue × Retention) / (1 + DiscountRate - Retention)' },
            {
                type: 'list', items: [
                    'Contribution margin: 30%',
                    'Discount rate: 1% (monthly)',
                    'Constant retention probability'
                ]
            },
            { type: 'subtitle', text: '3. Customer Segmentation' },
            {
                type: 'list', items: [
                    'Segmented customers into: Frequent Buyers, Infrequent Buyers'
                ]
            },
            { type: 'subtitle', text: '4. Sensitivity Analysis' },
            {
                type: 'list', items: [
                    'Tested how CLV changes with: Retention variations, Margin variations'
                ]
            },

            { type: 'section_title', text: 'Key Insights' },
            { type: 'subtitle', text: 'Retention is Moderate' },
            {
                type: 'list', items: [
                    '~49.5% of customers make repeat purchases',
                    'Indicates significant churn opportunity'
                ]
            },
            { type: 'subtitle', text: 'Customer Value is Highly Skewed' },
            {
                type: 'table', headers: ['Segment', 'CLV'], rows: [
                    ['Frequent Buyers', '2.94'],
                    ['Infrequent Buyers', '0.48']
                ]
            },
            { type: 'callout', text: 'Frequent buyers generate ~6× more value' },

            { type: 'subtitle', text: 'Retention Drives CLV More Than Margin' },
            {
                type: 'list', items: [
                    'Increasing retention → ~49% CLV increase',
                    'Increasing margin → ~33% CLV increase'
                ]
            },
            { type: 'callout', text: 'Retention has a compounding effect, making it the most powerful growth lever' },

            { type: 'section_title', text: 'Visualization (Sensitivity Analysis)' },
            { type: 'image', src: '/assets/clv-chart.png', alt: 'CLV Sensitivity Analysis Chart', caption: 'Sensitivity Analysis showing CLV changes with retention and margin' },

            { type: 'section_title', text: 'Business Recommendations' },
            { type: 'subtitle', text: '1. Focus on Second Purchase Conversion' },
            {
                type: 'list', items: [
                    'Trigger email campaigns after first purchase',
                    'Offer personalized recommendations'
                ]
            },
            { type: 'callout', text: 'Moving users from 1 → 2 purchases drastically increases CLV' },
            { type: 'subtitle', text: '2. Invest in Loyalty Programs for High-Value Customers' },
            {
                type: 'list', items: [
                    'Rewards, exclusive offers, early access',
                    'Target frequent buyers'
                ]
            },
            { type: 'callout', text: 'Protects the segment generating most revenue' },
            { type: 'subtitle', text: '3. Prioritize Retention Over Aggressive Acquisition' },
            {
                type: 'list', items: [
                    'Retention improvements yield higher ROI than margin optimization',
                    'Sustainable long-term profitability depends on repeat behavior'
                ]
            },

            { type: 'section_title', text: 'Tools & Skills Demonstrated' },
            { type: 'tags', items: ['Python (Pandas, NumPy, Matplotlib)', 'Customer Analytics', 'CLV Modeling', 'Cohort Analysis', 'Business Interpretation & Strategy'] },

            { type: 'section_title', text: 'Outcome' },
            { type: 'paragraph', text: 'This project demonstrates how simple analytical models can generate high-impact business insights, helping firms:' },
            {
                type: 'list', items: [
                    'Identify high-value customers',
                    'Optimize retention strategies',
                    'Improve long-term profitability'
                ]
            }
        ]
    },
    {
        id: "attrition-survival-analysis",
        company: "Personal Project",
        role: "Data Scientist",
        title: "Predicting Employee Attrition using Survival Analysis",
        description: "Implemented an advanced Survival Analysis (CoxPH) model to predict when employees are likely to leave and what factors influence that timeline, moving beyond simple binary classification.",
        tags: ["Python", "Survival Analysis", "CoxPH", "Decision Trees", "HR Analytics"],
        icon: Activity,
        color: "from-blue-600/20 to-teal-600/20",
        border: "border-teal-500/30",
        content: [
            { type: 'section_title', text: 'Executive Summary' },
            { type: 'paragraph', text: 'Employee turnover (attrition) is a significant cost for modern organizations, impacting both culture and the bottom line. Traditional "churn" models only predict if an employee will leave. This project goes a step further by using Survival Analysis to predict when they are likely to leave, providing actionable timelines for HR intervention.' },

            { type: 'section_title', text: 'The Challenge' },
            { type: 'paragraph', text: 'The goal was to move beyond binary classification (Yes/No) to understand the "Hazard Rate" of employees. By analyzing the IBM HR Analytics dataset, I aimed to identify the critical "danger zones" in an employee\'s tenure and the specific drivers that accelerate attrition risk.' },

            { type: 'section_title', text: 'Methodology & Technical Stack' },
            { type: 'paragraph', text: 'I implemented a dual-modeling approach to compare traditional predictive analytics with advanced survival techniques:' },
            { type: 'subtitle', text: 'Primary Model: Cox Proportional-Hazards (CoxPH)' },
            {
                type: 'list', items: [
                    'Why: To model the risk (hazard) of attrition over time while handling "censored" data (employees who haven\'t left yet).'
                ]
            },
            { type: 'subtitle', text: 'Comparative Model: Parsimonious Logistic Regression' },
            {
                type: 'list', items: [
                    'Why: To provide a baseline classification and use AIC-based Backward Elimination for feature selection.'
                ]
            },
            { type: 'paragraph', text: '**Tools:** Python (lifelines, statsmodels, scikit-learn, pandas).' },

            { type: 'section_title', text: 'Model Insights & Visualizations' },
            { type: 'paragraph', text: 'The following visualizations represent the core findings of the analysis and the predictive capabilities of the models.' },

            { type: 'subtitle', text: 'Hazard Ratios (Cox Proportional-Hazards Model)' },
            { type: 'image', src: '/assets/hazard-ratio-plot.png', alt: 'Hazard Ratios Plot', caption: 'Analysis: This visualization displays the exponential coefficients (Hazard Ratios) for each feature. A Hazard Ratio greater than 1 indicates an increased risk of attrition, while a ratio less than 1 suggests a protective effect. This allows HR to pinpoint exactly which variables—such as overtime or low job satisfaction—are driving employees to leave.' },

            { type: 'subtitle', text: 'Decision Tree Analysis' },
            { type: 'image', src: '/assets/decision-tree-diagram.png', alt: 'Decision Tree Diagram', caption: 'Analysis: To complement the statistical models, I utilized a Decision Tree to map out the logical hierarchy of attrition factors. This provides a transparent, easy-to-read flowchart of employee behavior, identifying specific "profiles" of at-risk staff based on their tenure and role.' },

            { type: 'subtitle', text: 'Predicted Survival Curves' },
            { type: 'image', src: '/assets/survival-curves-graph.png', alt: 'Predicted Survival Curves graph', caption: 'Analysis: This graph demonstrates the model\'s ability to forecast the future. By plotting the survival probability over time for specific employee profiles, we can visualize how the likelihood of staying changes month-over-month, allowing for personalized retention strategies.' },

            { type: 'section_title', text: '💡 Key Insights & Findings' },
            {
                type: 'list', items: [
                    'The "Survival" Curve: The Kaplan-Meier analysis revealed that the highest risk of attrition occurs within the first 2-3 years of tenure.',
                    'Top Risk Drivers: OverTime: Employees working frequent overtime had a significantly higher Hazard Ratio (HR > 1.5). Job Satisfaction: Low satisfaction scores directly correlated with a steeper decline in the survival curve.',
                    'Parsimony: Through AIC optimization, I reduced the model to its most significant predictors, ensuring the final output was interpretable for HR stakeholders.'
                ]
            },

            { type: 'section_title', text: '🚀 Business Impact' },
            {
                type: 'list', items: [
                    'Proactive Retention: HR can now identify employees entering high-risk tenure "windows."',
                    'Policy Optimization: Quantitative proof that reducing mandatory overtime could extend average employee tenure by an estimated 18%.'
                ]
            }
        ]
    },
    {
        id: "deloitte-copilot",
        company: "Deloitte",
        role: "Digital Consultant",
        title: "System Co-Pilot Integration",
        description: "Designed and integrated a specialized 'System Co-Pilot' for suite of Microsoft applications, enhancing user productivity and streamlining enterprise workflows across departments.",
        tags: ["Microsoft Ecosystem", "Enterprise Automation", "AI Integration"],
        icon: Briefcase,
        color: "from-blue-600/20 to-indigo-600/20",
        border: "border-blue-500/30",
    },


    {
        id: "playsekai",
        company: "PlaySekai",
        role: "Co-Founder",
        title: "Digital Brand Architect",
        description: "Co-founded and scaled PlaySekai, an emerging digital brand. Orchestrated the go-to-market strategy, product design, and brand identity, fostering a dedicated online community.",
        tags: ["Brand Building", "Growth Strategy", "Product Design"],
        icon: MonitorPlay,
        color: "from-purple-600/20 to-pink-600/20",
        border: "border-purple-500/30",
    }
];

export const experienceData = [
    {
        id: "iim",
        role: "MBA in Digital Enterprise Management",
        company: "IIM Udaipur",
        duration: "Expected April 2026",
        description: "Maintained a 3.5 GPA, ranking in the top 5% of the cohort. Member of the Technalytics Club. During the MBA, engineered a secure MCP-based Enterprise Co-pilot — a project in collaboration with Deloitte — to automate M365 workflows without exposing sensitive data to LLMs.",
        technologies: ["Digital Enterprise Management", "MCP", "AI Security", "M365 Workflows"],
        icon: GraduationCap
    },
    {
        id: "prodapt",
        role: "Business Analyst, AI & Cloud Solutions",
        company: "Prodapt",
        duration: "Dec 2022 - Mar 2025",
        description: "Managed the end-to-end product lifecycle for 20+ automation initiatives using Agile/Scrum, reducing turnaround time by 60-95%. Architected scalable AWS-native solutions (Lambda, API Gateway, EC2, S3) supporting 3x user growth. Launched a RAG GenAI module improving SLA compliance by 50%, and engineered reusable Python/SQL libraries cutting dev cycle time significantly.",
        technologies: ["AWS", "RAG GenAI", "Python", "SQL", "Agile/Scrum"],
        icon: Cloud
    },
    {
        id: "tcs",
        role: "IT Risk & Systems Analyst",
        company: "Tata Consultancy Services (TCS)",
        duration: "Nov 2021 - Dec 2022",
        description: "Safeguarded NSE trading systems handling $65B in daily volume through 30+ BCP drills and root cause analyses on critical incidents. Led a 5-member team resolving 100+ technical incidents with zero downtime. Maintained 100% uptime across 50+ RHEL servers and automated manual data workflows via Bash scripting for an 80% efficiency gain.",
        technologies: ["RHEL Administration", "Bash Scripting", "Risk Management", "High Availability"],
        icon: ShieldCheck
    }
];

export const skillsData = [
    {
        domain: "Cloud & Infrastructure",
        skills: [
            { name: "AWS", level: 90 },
            { name: "Azure", level: 85 },
            { name: "Docker & Kubernetes", level: 80 },
            { name: "Linux Administration", level: 95 }
        ]
    },
    {
        domain: "Backend & MLOps",
        skills: [
            { name: "Python", level: 95 },
            { name: "Django / FastAPI", level: 85 },
            { name: "PostgreSQL", level: 80 },
            { name: "MLflow", level: 75 }
        ]
    },
    {
        domain: "Strategy & Automation",
        skills: [
            { name: "Enterprise Architecture", level: 90 },
            { name: "Process Automation", level: 95 },
            { name: "Agile/Scrum", level: 85 },
            { name: "Go-To-Market Strategy", level: 80 }
        ]
    }
];

export const testimonialsData = [
    {
        id: 1,
        content: "An exceptional blend of technical acumen and business strategy. Instrumental in delivering our enterprise automation goals well ahead of schedule.",
        author: "Director of Digital Transformation",
        company: "Fortune 500 Client (Deloitte engagement)",
        initials: "DT"
    },
    {
        id: 2,
        content: "The system architectures designed for our core trading infrastructure handled peak loads flawlessly. A true expert in high-availability and risk mitigation.",
        author: "Senior Technical Manager",
        company: "National Stock Exchange (TCS engagement)",
        initials: "SM"
    },
    {
        id: 3,
        content: "Brought clarity, vision, and rapid execution to our product lifecycle. The ability to abstract complex technical requirements into user-friendly design is unmatched.",
        author: "Co-Founder",
        company: "PlaySekai",
        initials: "CF"
    }
];
