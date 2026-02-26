import {
    Building2,
    ServerCog,
    Lightbulb,
    Briefcase,
    MonitorPlay,
    Activity,
    ShieldCheck,
    GraduationCap,
    Cloud,
    Bot
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
        description: "Driven by a builder's mindset, I've hands-on experience co-founding ventures like the digital brand PlaySekai. I understand agile product development, user-centric design, and market fit.",
        highlights: ["PlaySekai Co-founder", "Agile Product Dev", "User-Centric Design"],
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
                    'Time Period: Jan 1997 â€“ Jun 1998'
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
            { type: 'formula', equation: 'CLV = (Margin Ã— AvgMonthlyRevenue Ã— Retention) / (1 + DiscountRate - Retention)' },
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
            { type: 'callout', text: 'Frequent buyers generate ~6Ã— more value' },

            { type: 'subtitle', text: 'Retention Drives CLV More Than Margin' },
            {
                type: 'list', items: [
                    'Increasing retention â†’ ~49% CLV increase',
                    'Increasing margin â†’ ~33% CLV increase'
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
            { type: 'callout', text: 'Moving users from 1 â†’ 2 purchases drastically increases CLV' },
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

            { type: 'section_title', text: 'Key Insights & Findings' },
            {
                type: 'list', items: [
                    'The "Survival" Curve: The Kaplan-Meier analysis revealed that the highest risk of attrition occurs within the first 2-3 years of tenure.',
                    'Top Risk Drivers: OverTime: Employees working frequent overtime had a significantly higher Hazard Ratio (HR > 1.5). Job Satisfaction: Low satisfaction scores directly correlated with a steeper decline in the survival curve.',
                    'Parsimony: Through AIC optimization, I reduced the model to its most significant predictors, ensuring the final output was interpretable for HR stakeholders.'
                ]
            },

            { type: 'section_title', text: 'Business Impact' },
            {
                type: 'list', items: [
                    'Proactive Retention: HR can now identify employees entering high-risk tenure "windows."',
                    'Policy Optimization: Quantitative proof that reducing mandatory overtime could extend average employee tenure by an estimated 18%.'
                ]
            }
        ]
    },
    {
        id: "mcp-enterprise-copilot",
        company: "IIM Udaipur × Deloitte",
        role: "AI Systems Engineer",
        title: "Enterprise System Co-Pilot: Secure M365 Automation",
        description: "Architected a secure AI co-pilot using the Model Context Protocol (MCP) to automate end-to-end Microsoft 365 workflows — generating Word reports, PowerPoint decks, and Excel sheets — without exposing proprietary data to external LLMs.",
        tags: ["Python", "FastAPI", "React 19", "MCP", "Google Gemini", "M365", "GenAI"],
        icon: Bot,
        color: "from-violet-600/20 to-blue-600/20",
        border: "border-violet-500/30",
        content: [
            { type: 'section_title', text: 'Executive Summary' },
            { type: 'paragraph', text: 'Business Analysts at enterprise organisations lose significant productive hours to low-value, repetitive administrative tasks — merging Excel data, formatting brand-compliant PowerPoint presentations, and drafting reports. This project solves that problem with a secure, AI-powered co-pilot that automates these workflows end-to-end inside a zero-trust architecture, ensuring no sensitive data ever leaves the organisation.' },
            { type: 'callout', text: 'Built in collaboration with Deloitte as part of the IIM Udaipur MBA programme, this system was designed to meet enterprise-grade security protocols that prohibit exposure of client data to external LLMs.' },

            { type: 'section_title', text: 'The Challenge' },
            { type: 'paragraph', text: 'Two critical constraints had to be simultaneously satisfied:' },
            {
                type: 'list', items: [
                    'Productivity: Analysts were spending hours on repetitive document generation tasks that required no strategic thinking.',
                    'Security: Enterprise protocols strictly prohibited sending sensitive business context or client data to external AI APIs like OpenAI or standard Gemini calls.',
                    'Usability: Any solution needed to be as simple as sending a natural language message — zero technical overhead for the end user.'
                ]
            },

            { type: 'section_title', text: 'Architecture & Solution' },
            { type: 'paragraph', text: 'I architected a three-tiered, zero-trust system using the **Model Context Protocol (MCP)** as a secure orchestration layer — creating a strict separation between the AI model and business data.' },
            { type: 'image', src: '/assets/mcp-architecture.png', alt: 'MCP System Architecture Diagram', caption: 'Three-tiered MCP architecture: React 19 frontend → FastAPI + MCP backend → local Python automation libraries. The AI model never directly accesses business data.' },

            { type: 'subtitle', text: 'How It Works' },
            {
                type: 'list', items: [
                    '1. User submits a natural language request via the React 19 chat interface.',
                    '2. Google Gemini 2.5 Flash performs high-level reasoning and intent detection to select the correct MCP tool.',
                    '3. Instead of sending data to the cloud, the MCP backend maps the AI\'s function call to local Python libraries (python-docx, python-pptx, openpyxl) running within a secure, sandboxed file system.',
                    '4. The generated document is returned to the analyst in real time — sensitive data never leaving the local environment.'
                ]
            },

            { type: 'section_title', text: 'Chat Interface' },
            { type: 'image', src: '/assets/mcp-chat-ui.png', alt: 'Enterprise Co-Pilot Chat Interface', caption: 'Responsive React 19 chat UI — analysts interact in plain English and receive generated M365 documents in seconds.' },

            { type: 'section_title', text: 'Technical Stack' },
            {
                type: 'table',
                headers: ['Layer', 'Technology'],
                rows: [
                    ['Frontend', 'React 19, TypeScript, Tailwind CSS 4, Vite 7'],
                    ['Backend', 'Python, FastAPI, Uvicorn'],
                    ['AI & Orchestration', 'Google Gemini 2.5 Flash, Model Context Protocol (MCP)'],
                    ['Word Automation', 'python-docx'],
                    ['PowerPoint Automation', 'python-pptx'],
                    ['Excel Automation', 'openpyxl, xlsxwriter'],
                ]
            },

            { type: 'section_title', text: 'Key Achievements & Impact' },
            {
                type: 'table',
                headers: ['Metric', 'Result'],
                rows: [
                    ['Workflow Execution Time', '30 – 35 seconds (vs hours manually)'],
                    ['Time Reduction', '95 – 98%'],
                    ['Workflow Success Rate', '100% during end-to-end validation'],
                    ['Analyst Time Saved', '6+ hours per week'],
                    ['Estimated Annual Net Benefit', '₹5.56 Lakhs per analyst'],
                    ['ROI', '28:1'],
                ]
            },
            { type: 'callout', text: 'A 95-98% reduction in task execution time — complex, multi-step document generation workflows completed in 30-35 seconds with zero manual intervention.' },

            { type: 'section_title', text: 'Security Design Principles' },
            {
                type: 'list', items: [
                    'Zero-Trust Architecture: The AI model is structurally prevented from accessing raw business data.',
                    'Local Execution: All file operations run on local Python libraries â€” no data leaves the secure environment.',
                    'Tool-Level Access Control: MCP enforces a strict allowlist of operations the AI can invoke.',
                    'Audit-Ready: Every tool invocation is logged for compliance and traceability.'
                ]
            },

            { type: 'section_title', text: 'Tools & Skills Demonstrated' },
            { type: 'tags', items: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'Model Context Protocol (MCP)', 'Google Gemini 2.5 Flash', 'python-docx', 'python-pptx', 'openpyxl', 'Enterprise Security Design', 'AI Systems Architecture'] },
        ]
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
        domain: "Cloud & DevOps",
        skills: [
            { name: "Linux & Bash Scripting", level: 95 },
            { name: "AWS (Serverless / EC2 / S3)", level: 90 },
            { name: "Docker & Git", level: 85 },
            { name: "GCP / Firebase", level: 80 },
            { name: "Apache Airflow / MinIO", level: 75 },
        ]
    },
    {
        domain: "Data Science & AI",
        skills: [
            { name: "Python & SQL", level: 95 },
            { name: "GenAI / RAG / LLMs", level: 85 },
            { name: "Machine Learning (PyTorch / YOLO)", level: 80 },
            { name: "Data Analytics & Survival Analysis", level: 80 },
            { name: "MLOps & Enterprise Architecture", level: 75 },
        ]
    },
    {
        domain: "Product Strategy & Automation",
        skills: [
            { name: "Agile / Scrum", level: 95 },
            { name: "Product Lifecycle & Roadmapping", level: 90 },
            { name: "RPA (Robocorp) & Process Automation", level: 90 },
            { name: "Stakeholder & Risk Mgmt (BCP / RCA)", level: 90 },
            { name: "Requirements Gathering & UAT Facilitation", level: 85 },
        ]
    }
];

export const testimonialsData = [
    {
        id: 1,
        content: "Abhijith is a highly skilled and dedicated professional. He combines technical expertise with a sharp strategic mind. He is Sure to become an outstanding business leader.",
        author: "Asad Nabi",
        company: "Chief Enterprise Architect | Liberty Latin America",
        initials: "AN"
    },
    {
        id: 2,
        content: "Abhijith is a highly skilled developer and analyst. His work consistently added immense value to our team. He is a tremendous asset to any organization.",
        author: "Munendra Sreerama",
        company: "Associate Director | Prodapt",
        initials: "MS"
    }
];
