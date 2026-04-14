/* ============================================
   PRANEETH VARMA — PORTFOLIO CHATBOT
   Client-side knowledge base + fuzzy matcher
   ============================================ */

(function () {
    'use strict';

    // ============================
    // KNOWLEDGE BASE
    // ============================
    const KB = {
        name: 'Praneeth Varma',
        title: 'Product Analytics Engineer',
        location: 'Fremont, CA',
        email: 'praneeth.verma@gmail.com',
        linkedin: 'https://linkedin.com/in/praneethvarma',
        github: 'https://github.com/praneethpvp',
        resumeUrl: 'Praneeth_Varma_Resume.pdf',
        yearsExp: '10+',

        education: {
            degree: 'Master of Science in Business Analytics',
            school: 'W. P. Carey School of Business, Arizona State University',
            year: '2016–2017',
            gpa: '3.8/4.0',
            coursework: ['Data Mining', 'Machine Learning', 'Business Analytics', 'Operations Research', 'Marketing Analytics']
        },

        certifications: [
            'Convolutional Neural Networks (Coursera / deeplearning.ai)',
            'Structuring ML Projects (Coursera / deeplearning.ai)',
            'Improving Deep Neural Networks (Coursera / deeplearning.ai)',
            'Neural Networks & Deep Learning (Coursera / deeplearning.ai)'
        ],

        languages: ['English (fluent)', 'Hindi (professional)', 'Telugu (native)'],

        skills: {
            analytics: ['A/B Testing', 'Statistical Analysis', 'KPI Definition', 'Market Trend Analysis', 'Forecasting', 'Experimentation Design'],
            languages: ['SQL (T-SQL / PL-SQL)', 'Python', 'Pandas / PySpark', 'R', 'DAX', 'JavaScript'],
            bi: ['Tableau', 'Power BI', 'QuickSight', 'Looker', 'Excel (Advanced)'],
            cloud: ['AWS (Glue, Athena, S3)', 'Azure Data Studio', 'Snowflake', 'BigQuery', 'Apache Spark'],
            ml: ['Neural Networks', 'CNNs', 'Classification Models', 'NLP', 'Anomaly Detection']
        },

        experience: [
            {
                company: 'Intuit',
                role: 'Reporting Data Analyst IV',
                period: 'Oct 2024 – Present',
                highlights: [
                    'Built 5+ critical dashboards for tracking Fraud Policy KPIs',
                    'Migrated 10+ dashboards to QuickSight, enhancing data quality',
                    'Led cross-functional collaboration for Fast Funding project'
                ],
                tech: ['QuickSight', 'SQL', 'Python', 'ETL']
            },
            {
                company: 'Microsoft',
                role: 'Marketing Data Analyst',
                period: 'Dec 2023 – Sep 2024',
                highlights: [
                    'Drove 25+ global marketing campaigns for Azure and Office',
                    'Increased customer engagement by 20% and acquisition by 25%',
                    'Optimized in-product campaigns with Growth and Data Engineering teams'
                ],
                tech: ['Power BI', 'SQL', 'Azure', 'Growth Analytics']
            },
            {
                company: 'Amazon',
                role: 'Business Intelligence Engineer',
                period: 'Aug 2022 – May 2023',
                highlights: [
                    'Led search optimization for US and India markets',
                    'Achieved 20% engagement lift by refining search ranking with ML scientists',
                    'Built ETL pipelines using AWS Glue and S3 for multi-market data'
                ],
                tech: ['AWS Glue', 'S3', 'A/B Testing', 'ML']
            },
            {
                company: 'Microsoft',
                role: 'Product Analyst',
                period: 'Apr 2020 – Jan 2022',
                highlights: [
                    'Enhanced customer revenue identification by 12% via automated reports',
                    'Achieved 95% reduction in data inconsistencies by revamping ETL',
                    'Streamlined analytical workflows using Azure Data Studio'
                ],
                tech: ['Azure Data Studio', 'T-SQL', 'ETL', 'Power BI']
            },
            {
                company: 'Google',
                role: 'Data Analyst',
                period: 'Feb 2018 – Apr 2020',
                highlights: [
                    '50% improvement in detecting fraudulent profiles using ML models',
                    '60% recall rate in identifying abusive orders on Google Shopping',
                    'Enabled real-time abuse monitoring using Tableau dashboards'
                ],
                tech: ['Python', 'ML', 'Tableau', 'BigQuery']
            }
        ],

        caseStudies: [
            {
                title: 'Fraud Detection System',
                company: 'Google',
                desc: 'Built ML classification models to detect fraud signals on Google Shopping, achieving 50% reduction in fraudulent profiles and 60% recall rate on abusive orders.',
                tech: ['Python', 'ML Classification', 'Tableau', 'BigQuery']
            },
            {
                title: 'Search Optimization',
                company: 'Amazon',
                desc: 'Partnered with ML scientists to optimize search ranking across US and India markets, achieving 20% engagement lift and 10% merchant engagement growth.',
                tech: ['AWS Glue', 'S3', 'A/B Testing', 'SQL']
            },
            {
                title: 'Global Marketing Analytics',
                company: 'Microsoft',
                desc: 'Established KPI frameworks for 25+ global campaigns for Azure and Office, driving 25% new customer acquisition and 20% engagement boost.',
                tech: ['Power BI', 'SQL', 'KPI Design', 'Growth Strategy']
            }
        ],

        ventures: [
            { name: 'AI Life Dashboard', desc: 'Personal AI dashboard pulling together health, tasks, finances into one prioritized view' },
            { name: 'AI Analytics Engine', desc: 'Helping businesses implement AI into existing analytics workflows' },
            { name: 'Health Intelligence', desc: 'Platform analyzing health data for personalized nutrition recommendations' }
        ],

        githubProjects: [
            { name: 'Sleep Data Analysis with ANOVA', desc: 'Statistical modeling of sleep efficiency data from fitness trackers' },
            { name: 'CDiscount Image Classification', desc: 'Deep learning model for product image classification using CNNs' },
            { name: 'Employee Turnover Prediction', desc: 'ML models for predicting employee departures with feature engineering' }
        ]
    };

    // ============================
    // INTENT MATCHING
    // ============================
    const intents = [
        {
            patterns: [/\b(hi|hello|hey|howdy|greetings|yo|sup)\b/i, /^(hi|hello|hey)$/i],
            response: () => `Hey there! I'm Praneeth's virtual assistant. Ask me anything about his experience, skills, projects, or how to get in touch. What would you like to know?`
        },
        {
            patterns: [/who\s*(is|are)\s*(you|praneeth)/i, /about\s*(you|him|praneeth)/i, /tell\s*me\s*about/i, /introduce/i, /what\s*do\s*you\s*do/i],
            response: () => `<strong>${KB.name}</strong> is a ${KB.title} with ${KB.yearsExp} years of experience at <strong>Google, Amazon, Microsoft,</strong> and <strong>Intuit</strong>. He specializes in turning ambiguous data into product strategy — from fraud detection ML models to global marketing analytics frameworks.\n\nHe holds an MS in Business Analytics from ASU (3.8 GPA) and is passionate about building AI-powered products.`
        },
        {
            patterns: [/experience/i, /work\s*history/i, /career/i, /where.*work/i, /companies/i, /jobs?/i, /roles?/i, /positions?/i],
            response: () => {
                const exp = KB.experience.map(e => `<strong>${e.company}</strong> — ${e.role} (${e.period})`).join('\n');
                return `Here's Praneeth's career journey:\n\n${exp}\n\nWant details about any specific role?`;
            }
        },
        {
            patterns: [/google/i],
            response: () => {
                const g = KB.experience.find(e => e.company === 'Google');
                return `At <strong>Google</strong> (${g.period}), Praneeth was a ${g.role}:\n\n${g.highlights.map(h => '• ' + h).join('\n')}\n\n<strong>Tech:</strong> ${g.tech.join(', ')}`;
            }
        },
        {
            patterns: [/amazon/i],
            response: () => {
                const a = KB.experience.find(e => e.company === 'Amazon');
                return `At <strong>Amazon</strong> (${a.period}), Praneeth was a ${a.role}:\n\n${a.highlights.map(h => '• ' + h).join('\n')}\n\n<strong>Tech:</strong> ${a.tech.join(', ')}`;
            }
        },
        {
            patterns: [/microsoft/i],
            response: () => {
                const msRoles = KB.experience.filter(e => e.company === 'Microsoft');
                return msRoles.map(m => `<strong>Microsoft</strong> — ${m.role} (${m.period}):\n${m.highlights.map(h => '• ' + h).join('\n')}\nTech: ${m.tech.join(', ')}`).join('\n\n');
            }
        },
        {
            patterns: [/intuit/i, /current\s*(role|job|position)/i, /currently/i, /right\s*now/i, /present/i],
            response: () => {
                const i = KB.experience[0];
                return `Praneeth currently works at <strong>Intuit</strong> as ${i.role} (${i.period}):\n\n${i.highlights.map(h => '• ' + h).join('\n')}\n\n<strong>Tech:</strong> ${i.tech.join(', ')}`;
            }
        },
        {
            patterns: [/skills?/i, /tech\s*stack/i, /tools?/i, /what.*know/i, /technologies/i, /proficien/i, /toolkit/i],
            response: () => {
                const s = KB.skills;
                return `Here's Praneeth's toolkit:\n\n<strong>Analytics:</strong> ${s.analytics.join(', ')}\n\n<strong>Languages:</strong> ${s.languages.join(', ')}\n\n<strong>BI & Viz:</strong> ${s.bi.join(', ')}\n\n<strong>Cloud:</strong> ${s.cloud.join(', ')}\n\n<strong>AI/ML:</strong> ${s.ml.join(', ')}`;
            }
        },
        {
            patterns: [/sql/i],
            response: () => `Praneeth is highly proficient in <strong>SQL</strong> (T-SQL, PL-SQL) — it's been a core tool across all his roles at Google, Amazon, Microsoft, and Intuit. He uses it for data pipelines, analytics, and A/B testing frameworks.`
        },
        {
            patterns: [/python/i],
            response: () => `<strong>Python</strong> is one of Praneeth's primary languages. He uses it with Pandas, PySpark, and ML libraries. At Google, he built fraud detection ML models in Python. He also has deep learning certifications covering Neural Networks and CNNs.`
        },
        {
            patterns: [/tableau/i, /power\s*bi/i, /quicksight/i, /looker/i, /visualization/i, /dashboard/i, /\bBI\b/],
            response: () => `Praneeth has extensive experience with BI tools:\n\n• <strong>Tableau</strong> — real-time monitoring dashboards at Google\n• <strong>Power BI</strong> — marketing analytics at Microsoft\n• <strong>QuickSight</strong> — fraud policy KPI dashboards at Intuit\n• <strong>Looker</strong> and advanced Excel\n\nHe's built dashboards across every role in his career.`
        },
        {
            patterns: [/a\/?b\s*test/i, /experiment/i, /statistical/i],
            response: () => `A/B testing and experimentation design are core to Praneeth's work. At Amazon, he designed A/B experiments to validate search ranking algorithm changes, achieving a 20% engagement lift. He's skilled in statistical analysis, KPI definition, and forecasting.`
        },
        {
            patterns: [/cloud/i, /aws/i, /azure/i, /snowflake/i, /bigquery/i, /spark/i, /etl/i, /pipeline/i, /data\s*engineer/i],
            response: () => `Praneeth has strong cloud & data engineering skills:\n\n• <strong>AWS</strong> (Glue, Athena, S3) — ETL pipelines at Amazon\n• <strong>Azure Data Studio</strong> — analytics workflows at Microsoft\n• <strong>Snowflake & BigQuery</strong> — data warehousing\n• <strong>Apache Spark / PySpark</strong> — large-scale processing\n\nAt Microsoft, he achieved a 95% reduction in data inconsistencies by revamping ETL procedures.`
        },
        {
            patterns: [/\bml\b|machine\s*learn/i, /\bai\b/i, /deep\s*learn/i, /neural/i, /fraud/i, /classification/i, /nlp/i],
            response: () => `Praneeth has hands-on ML/AI experience:\n\n• Built <strong>fraud detection ML models</strong> at Google (50% improvement, 60% recall)\n• Collaborated with <strong>ML scientists</strong> at Amazon on search ranking\n• <strong>Certifications:</strong> CNNs, Neural Networks, Deep Learning (deeplearning.ai)\n• Skills: Classification, NLP, Anomaly Detection\n\nHe's also building AI-powered products on the side — an AI Life Dashboard and an AI Analytics Engine.`
        },
        {
            patterns: [/education/i, /degree/i, /university/i, /college/i, /school/i, /\basu\b/i, /masters?/i, /study/i, /studied/i],
            response: () => `<strong>${KB.education.degree}</strong>\n${KB.education.school}\n${KB.education.year} | GPA: ${KB.education.gpa}\n\n<strong>Coursework:</strong> ${KB.education.coursework.join(', ')}`
        },
        {
            patterns: [/certif/i, /coursera/i, /deeplearning/i, /course/i],
            response: () => `Praneeth holds these certifications from <strong>deeplearning.ai / Coursera</strong>:\n\n${KB.certifications.map(c => '• ' + c).join('\n')}\n\nHe's currently pursuing additional AI architecture certifications.`
        },
        {
            patterns: [/contact/i, /reach/i, /email/i, /connect/i, /hire/i, /available/i, /open\s*to/i, /opportunit/i],
            response: () => `You can reach Praneeth at:\n\n• <strong>Email:</strong> ${KB.email}\n• <strong>LinkedIn:</strong> linkedin.com/in/praneethvarma\n• <strong>GitHub:</strong> github.com/praneethpvp\n\nHe's open to opportunities in Product Analytics, Data Science, AI, and consulting.`,
            links: [
                { text: 'Email', href: `mailto:${KB.email}` },
                { text: 'LinkedIn', href: KB.linkedin },
                { text: 'GitHub', href: KB.github }
            ]
        },
        {
            patterns: [/resume/i, /\bcv\b/i, /download/i],
            response: () => `You can download Praneeth's resume here:`,
            links: [{ text: 'Download Resume', href: KB.resumeUrl }]
        },
        {
            patterns: [/linkedin/i],
            response: () => `Praneeth's LinkedIn: <strong>linkedin.com/in/praneethvarma</strong>\n\nConnect with him there for the latest updates.`,
            links: [{ text: 'View LinkedIn', href: KB.linkedin }]
        },
        {
            patterns: [/github/i, /repo/i, /open\s*source/i, /project/i, /portfolio/i],
            response: () => {
                const repos = KB.githubProjects.map(r => `• <strong>${r.name}</strong> — ${r.desc}`).join('\n');
                return `Praneeth's GitHub projects:\n\n${repos}`;
            },
            links: [{ text: 'View GitHub', href: KB.github }]
        },
        {
            patterns: [/locat/i, /where.*live/i, /where.*based/i, /city/i, /fremont/i],
            response: () => `Praneeth is based in <strong>Fremont, CA</strong>.`
        },
        {
            patterns: [/language/i, /speak/i, /hindi/i, /telugu/i],
            response: () => `Praneeth speaks:\n\n${KB.languages.map(l => '• ' + l).join('\n')}`
        },
        {
            patterns: [/case\s*stud/i, /work\s*sample/i, /showcase/i, /impact/i, /achievement/i, /accomplishment/i, /result/i],
            response: () => {
                const cs = KB.caseStudies.map(c => `<strong>${c.title}</strong> (${c.company})\n${c.desc}`).join('\n\n');
                return `Key case studies:\n\n${cs}`;
            }
        },
        {
            patterns: [/venture/i, /building/i, /side\s*project/i, /startup/i, /business/i, /entrepreneur/i, /ikigai/i, /vision/i, /next/i, /future/i, /plan/i],
            response: () => {
                const v = KB.ventures.map(v => `• <strong>${v.name}</strong> — ${v.desc}`).join('\n');
                return `Praneeth is exploring these ventures:\n\n${v}\n\nThese sit at the intersection of his analytics expertise and passion for AI + health.`;
            }
        },
        {
            patterns: [/why\s*(should|would).*hire/i, /what\s*makes.*different/i, /strength/i, /stand\s*out/i, /unique/i],
            response: () => `What sets Praneeth apart:\n\n• <strong>Breadth:</strong> 10+ years across 4 tech giants (Google, Amazon, Microsoft, Intuit)\n• <strong>Impact:</strong> Quantified results — 50% fraud reduction, 25% acquisition growth, 95% data quality\n• <strong>Versatility:</strong> Fraud ML, search optimization, marketing analytics, ETL engineering\n• <strong>Product mindset:</strong> Doesn't just analyze — translates data into strategy\n• <strong>Builder:</strong> Actively building AI products outside work\n\nHe's a rare blend of deep technical skill and business acumen.`
        },
        {
            patterns: [/thank/i, /thanks/i, /awesome/i, /great/i, /cool/i, /perfect/i, /helpful/i],
            response: () => {
                const replies = [
                    `Glad I could help! Feel free to ask anything else or reach out directly to Praneeth.`,
                    `You're welcome! Is there anything else you'd like to know?`,
                    `Happy to help! Don't hesitate to ask more or connect with Praneeth directly.`
                ];
                return replies[Math.floor(Math.random() * replies.length)];
            }
        },
        {
            patterns: [/bye|goodbye|see\s*ya|later/i],
            response: () => `Thanks for stopping by! Feel free to come back anytime. You can also reach Praneeth directly at ${KB.email}.`
        }
    ];

    // Fallback
    function fallback(query) {
        return `That's outside what I know about Praneeth. I can answer questions about his:\n\n• <strong>Experience</strong> (Google, Amazon, Microsoft, Intuit)\n• <strong>Skills</strong> (SQL, Python, ML, BI tools, Cloud)\n• <strong>Education</strong> & Certifications\n• <strong>Projects</strong> & Case Studies\n• <strong>Contact</strong> info\n• <strong>Vision</strong> & side ventures\n\nTry asking one of these, or rephrase your question!`;
    }

    function getResponse(query) {
        const trimmed = query.trim();
        if (!trimmed) return { text: 'Could you type a question? I\'m here to help!' };

        for (const intent of intents) {
            for (const pattern of intent.patterns) {
                if (pattern.test(trimmed)) {
                    return { text: intent.response(), links: intent.links || null };
                }
            }
        }
        return { text: fallback(trimmed) };
    }

    // ============================
    // UI LOGIC
    // ============================
    const toggle = document.getElementById('chat-toggle');
    const panel = document.getElementById('chat-panel');
    const closeBtn = document.getElementById('chat-close');
    const messages = document.getElementById('chat-messages');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const suggestions = document.getElementById('chat-suggestions');

    if (!toggle || !panel) return;

    let isOpen = false;
    let welcomed = false;

    function openChat() {
        isOpen = true;
        panel.classList.add('open');
        toggle.classList.add('hidden');
        input.focus();
        if (!welcomed) {
            welcomed = true;
            addBotMessage(`Hey! I'm Praneeth's virtual assistant. Ask me anything about his experience, skills, or projects — or tap a suggestion below.`);
        }
        // Re-init lucide icons in chat
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closeChat() {
        isOpen = false;
        panel.classList.remove('open');
        toggle.classList.remove('hidden');
    }

    toggle.addEventListener('click', openChat);
    closeBtn.addEventListener('click', closeChat);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) closeChat();
    });

    // Suggestion chips
    suggestions.addEventListener('click', (e) => {
        const chip = e.target.closest('.suggestion-chip');
        if (chip) {
            const q = chip.dataset.q;
            addUserMessage(q);
            processQuery(q);
        }
    });

    // Form submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = input.value.trim();
        if (!q) return;
        addUserMessage(q);
        input.value = '';
        processQuery(q);
    });

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'chat-msg user';
        div.textContent = text;
        messages.appendChild(div);
        scrollToBottom();
    }

    function addBotMessage(text, links) {
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        // Convert \n to <br> and render HTML
        div.innerHTML = text.replace(/\n/g, '<br>');
        if (links && links.length) {
            const linksDiv = document.createElement('div');
            linksDiv.className = 'msg-links';
            links.forEach(l => {
                const a = document.createElement('a');
                a.href = l.href;
                a.target = '_blank';
                a.rel = 'noopener';
                a.textContent = l.text;
                linksDiv.appendChild(a);
            });
            div.appendChild(linksDiv);
        }
        messages.appendChild(div);
        scrollToBottom();
    }

    function showTyping() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        messages.appendChild(div);
        scrollToBottom();
    }

    function removeTyping() {
        const el = document.getElementById('typing');
        if (el) el.remove();
    }

    function processQuery(query) {
        showTyping();
        // Simulate brief thinking delay
        const delay = 400 + Math.random() * 600;
        setTimeout(() => {
            removeTyping();
            const { text, links } = getResponse(query);
            addBotMessage(text, links);
        }, delay);
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            messages.scrollTop = messages.scrollHeight;
        });
    }

    // Init lucide for chat icons
    function waitForLucide() {
        if (typeof lucide !== 'undefined') lucide.createIcons();
        else setTimeout(waitForLucide, 200);
    }
    waitForLucide();

})();
