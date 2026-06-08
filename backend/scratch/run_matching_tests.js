import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'local_db.json');

const FRONTEND_RESUME = `
Jane Doe - Frontend Engineer
jane.doe@frontend.com | github.com/janedoe-frontend

SUMMARY:
Passionate Frontend Developer with 4 years of experience building beautiful, responsive, and high-performance web user interfaces. Focuses on React, TypeScript, and Tailwind CSS.

SKILLS:
- Frontend: React, Next.js, HTML5, CSS3, Tailwind CSS, SASS, JavaScript (ES6+), TypeScript
- Tools: Git, Webpack, Vite, npm, Chrome DevTools
- Testing: Jest, React Testing Library

EXPERIENCE:
Frontend Developer | UI Creators | 2022 - Present
- Built responsive UI dashboards for clients using React and Tailwind CSS, increasing user engagement by 25%.
- Migrated legacy jQuery applications to modern React functional components.
- Optimized web assets and implemented code-splitting, improving Google Lighthouse scores from 60 to 95.

EDUCATION:
BS in Computer Science | State University
`;

const BACKEND_RESUME = `
Bob Smith - Backend Engineer
bob.smith@backend.com | github.com/bob-backend

SUMMARY:
Backend Software Engineer with 5+ years of experience designing and implementing scalable REST APIs, microservices, and database schemas. Strong expertise in Node.js, Go, and PostgreSQL.

SKILLS:
- Languages: JavaScript, TypeScript, Go (Golang), Python, SQL
- Frameworks/Backend: Node.js, Express.js, NestJS, Gin
- Databases/Caches: PostgreSQL, MongoDB, Redis, MySQL
- DevOps/Cloud: Docker, AWS (EC2, RDS), CI/CD, Linux

EXPERIENCE:
Senior Backend Engineer | DataSystems Inc. | 2021 - Present
- Designed and deployed a distributed microservices architecture in Go, handling 10,000+ requests per second.
- Optimized database queries and schema indexes in PostgreSQL, reducing query latency by 40%.
- Set up CI/CD deployment pipelines using GitHub Actions and Dockerized all services.

EDUCATION:
MS in Software Engineering | Tech University
`;

const FULLSTACK_RESUME = `
Alice Johnson - Full Stack Engineer
alice.j@fullstack.com | github.com/alice-fullstack

SUMMARY:
Full Stack Software Engineer specializing in building modern end-to-end web applications. Expert in Next.js, TypeScript, Node.js, Express.js, PostgreSQL, Prisma, and Supabase. Passionate about product engineering, Authentication, and SaaS projects.

SKILLS:
- Frontend: Next.js, React, TypeScript, Tailwind CSS, HTML/CSS
- Backend: Node.js, Express.js, Prisma ORM, REST APIs, GraphQL
- Infrastructure/Databases: Supabase, PostgreSQL, Redis, Authentication, Git, SaaS Applications

EXPERIENCE:
Product Engineer | SaaS Launchpad | 2023 - Present
- Built and launched a complete SaaS platform using Next.js, TypeScript, and Supabase with custom authentication.
- Integrated Prisma ORM with PostgreSQL database and configured database replication.
- Designed interactive analytics dashboards with real-time updates using WebSockets.

EDUCATION:
BS in Computer Science | Engineering College
`;

const AI_RESUME = `
Charlie Brown - AI Engineer
charlie.b@ai.com | github.com/charlie-ai

SUMMARY:
AI and Machine Learning Engineer with experience designing, training, and deploying deep learning models. Proficient in PyTorch, TensorFlow, and large language model (LLM) fine-tuning.

SKILLS:
- Machine Learning: PyTorch, TensorFlow, Keras, Scikit-Learn, Hugging Face
- Languages: Python, C++, SQL, Bash
- AI/NLP: LLMs, LangChain, Prompt Engineering, RAG (Retrieval-Augmented Generation), Vector Databases (Pinecone, Chroma)
- Deployment: FastAPI, Docker, AWS (SageMaker)

EXPERIENCE:
AI Engineer | Future Intelligence | 2022 - Present
- Fine-tuned open-source LLMs (Llama 3, Mistral) for domain-specific customer support tasks, achieving 90% accuracy.
- Built a production-grade RAG pipeline using LangChain, FastAPI, and Pinecone vector database.
- Implemented computer vision object detection models using PyTorch and deployed them on edge devices.

EDUCATION:
MS in Artificial Intelligence | Science Institute
`;

const DATA_RESUME = `
Dana Scully - Data Scientist
dana.s@data.com | github.com/dana-data

SUMMARY:
Data Scientist and Analyst with 3+ years of experience extracting actionable insights from large datasets. Expert in Python, SQL, Spark, statistical modeling, and data visualization.

SKILLS:
- Data Analysis: Python (Pandas, NumPy, SciPy), SQL, Spark, ETL Pipelines
- Statistics/ML: Regression, Clustering, Decision Trees, A/B Testing, Hypothesis Testing
- Visualization: Tableau, PowerBI, Matplotlib, Seaborn
- Tools: Jupyter, Git, Snowflake, Airflow

EXPERIENCE:
Data Scientist | Analytics Group | 2023 - Present
- Designed and analyzed A/B tests for product feature launches, driving a 5% increase in conversion rate.
- Built ETL data pipelines using Apache Spark and Airflow to aggregate 10M+ daily events into Snowflake.
- Developed interactive Tableau dashboards for executive leadership, tracking key performance metrics.

EDUCATION:
BS in Statistics & Data Science | Analytics University
`;

const resumesToInsert = [
  { id: 'f0000000-0000-0000-0000-000000000001', originalName: 'test-resume-frontend.txt', text: FRONTEND_RESUME },
  { id: 'b0000000-0000-0000-0000-000000000002', originalName: 'test-resume-backend.txt', text: BACKEND_RESUME },
  { id: 'f0000000-0000-0000-0000-000000000003', originalName: 'test-resume-fullstack.txt', text: FULLSTACK_RESUME },
  { id: 'a0000000-0000-0000-0000-000000000004', originalName: 'test-resume-ai.txt', text: AI_RESUME },
  { id: 'd0000000-0000-0000-0000-000000000005', originalName: 'test-resume-data.txt', text: DATA_RESUME },
];

async function setupDatabase() {
  console.log('Inserting test resumes into local database...');
  if (!fs.existsSync(dbPath)) {
    console.error('local_db.json does not exist. Make sure backend was run at least once.');
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  // Ensure a test user exists
  let testUser = db.users.find(u => u.id === 'bde52bb3-d1c8-47f0-9254-08908f2f4255');
  if (!testUser) {
    testUser = {
      id: 'bde52bb3-d1c8-47f0-9254-08908f2f4255',
      createdAt: new Date().toISOString(),
      auth_id: '8d3068f0-4561-42f8-91e4-a4a25a9f5515',
      email: 'john@doe.com',
      name: 'John Doe'
    };
    db.users.push(testUser);
  }

  // Insert or update the resumes
  for (const resItem of resumesToInsert) {
    const existingIdx = db.resumes.findIndex(r => r.id === resItem.id);
    const resumeObj = {
      id: resItem.id,
      createdAt: new Date().toISOString(),
      userId: testUser.id,
      text: resItem.text,
      textHash: 'mock-hash-' + resItem.id,
      originalName: resItem.originalName
    };

    if (existingIdx !== -1) {
      db.resumes[existingIdx] = resumeObj;
    } else {
      db.resumes.push(resumeObj);
    }
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('Test resumes injected successfully!');
}

async function testSuggestions() {
  const backendUrl = 'http://localhost:5000/api/jobs/suggested';
  
  for (const item of resumesToInsert) {
    const url = `${backendUrl}/${item.id}`;
    console.log(`\n==================================================`);
    console.log(`FETCHING RECOMMENDATIONS FOR: ${item.id}`);
    console.log(`URL: ${url}`);
    console.log(`==================================================`);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${await response.text()}`);
      }

      const envelope = await response.json();
      
      // Verification: Envelope success & data wrapper
      if (envelope.success !== true || !Array.isArray(envelope.data)) {
        console.error('❌ FAIL: Response envelope is incorrect!', envelope);
        continue;
      }
      
      const suggestedJobs = envelope.data;
      console.log(`✅ SUCCESS: Envelope format is correct.`);
      console.log(`Found ${suggestedJobs.length} suggestions.`);

      suggestedJobs.forEach((job, idx) => {
        console.log(`\n[Job Recommendation #${idx + 1}]`);
        console.log(`Title:       ${job.title}`);
        console.log(`Company:     ${job.company}`);
        console.log(`Match Score: ${job.matchScore}%`);
        console.log(`Why Recommended: ${job.whyRecommended}`);
        console.log(`Matched Skills:  ${JSON.stringify(job.matchedSkills)}`);
        console.log(`Missing Skills:  ${JSON.stringify(job.missingSkills)}`);
        console.log(`Suggested Path:\n${job.suggestedLearningPath}`);
      });

    } catch (err) {
      console.error(`❌ Error fetching suggestions for ${item.id}:`, err.message);
    }
  }
}

async function run() {
  await setupDatabase();
  await testSuggestions();
}

run();
