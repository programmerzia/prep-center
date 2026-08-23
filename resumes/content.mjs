/** Facts only — no invented metrics. Source: prior CVs + Zeo's own briefing. */

export const CONTACT = {
  name: "MD. ZIAUR RAHMAN",
  email: "programmerzia@gmail.com",
  phone: "+880 1718-424859",
  location: "Bangladesh (Remote)",
  linkedin: "linkedin.com/in/zia91",
  github: "github.com/programmerzia",
  web: "programmerzia.com",
};

const earlier = [
  {
    company: "QAHHAR LIMITED",
    title: "Software Developer (Full Stack)",
    dates: "Jan 2018 – Jul 2018",
    loc: "Dhaka, Bangladesh",
    one: "Built, tested, and deployed PHP client applications; upgraded legacy systems.",
  },
  {
    company: "ICON IT SOLUTION",
    title: "Senior Web Developer (Full Stack)",
    dates: "Jan 2016 – Dec 2017",
    loc: "Dhaka, Bangladesh",
    one: "Built client web applications and customized CMS/e-commerce features; worked with clients on delivery and QA.",
  },
];

const education = {
  school: "Pabna University of Science & Technology, Bangladesh",
  degree: "B.Sc. in Computer Science & Engineering",
  dates: "2011 – 2015",
};

export const VARIANTS = {
  php: {
    filename: "Ziaur_Rahman_Resume_PHP_Laravel",
    headline: "Senior Software Engineer  |  PHP · Laravel · Vue.js",
    summary:
      "Senior software engineer, 10 years of production web systems. Eight years PHP — Laravel and Symfony with Vue — booking platforms, multi-vendor marketplaces, and CRMs. Last year: remote contract with a Norwegian startup (Osilion AS), owning an AI recruitment product and a lead-generation platform on C# / ASP.NET Core, React / Next.js, and Azure — same problems as Laravel (container, ORM, auth, queues, API boundaries), different syntax. I also operate CoreBari (corebari.com), a live multi-tenant SaaS suite with SSO, offline-first sync, and bKash/Nagad. I own features end to end. I use AI to implement faster; I design the architecture and I do not ship what I cannot explain.",
    skills: [
      ["Backend", "PHP 8.x, Laravel, Symfony, REST APIs, Eloquent, Doctrine, queues/jobs, Sanctum, JWT"],
      ["Frontend", "Vue.js 3, Nuxt, React, Next.js, TypeScript, JavaScript, Tailwind CSS"],
      ["Databases", "MySQL, PostgreSQL, SQL Server / Azure SQL, query optimization, migrations"],
      ["DevOps", "Docker, Git, GitHub Actions, CI/CD, Linux, Composer"],
      ["Also this year", "C#, ASP.NET Core, Entity Framework Core, Node.js, Python, Azure, Supabase"],
      ["Practices", "API design, payment-gateway integration, legacy modernization, unit testing, code review, mentoring"],
    ],
    jobs: [
      {
        company: "OSILION AS",
        title: "Senior Full-Stack Engineer (Contract)",
        dates: "Sep 2025 – Present",
        loc: "Remote — Norway (osilion.no)",
        bullets: [
          "Owned the AI recruitment product end to end (postings, intake, CV processing, AI interviews, scoring). C# / ASP.NET Core / EF Core / Azure SQL and React / Next.js. Layered the same way I do in Laravel — domain rules stay in from HTTP and persistence. Candidate filters were composable query rules (Specification) so the repository did not grow duplicate methods.",
          "Shipped a lead-generation platform (Python, Supabase, Next.js on Render): ingest, store, bulk email. Sends ran off the request; a retry had to be safe to run twice.",
          "JWT, Azure SQL + Key Vault, GitHub Actions on Azure and Render. Backend work on a sales CRM on the same small team.",
        ],
      },
      {
        company: "DEVVOYAGE",
        title: "Senior Software Engineer",
        dates: "Jul 2023 – Aug 2025",
        loc: "Remote",
        bullets: [
          "Built travel, e-commerce, and CRM systems in Laravel / Symfony and Vue, including booking flows with availability, pricing, reservation, and checkout.",
          "Designed REST APIs and integrated payment gateways and other third-party services for booking and checkout.",
          "Extracted reusable Laravel / Symfony packages, backend services, and Vue components reused across client projects.",
          "Tuned MySQL schemas and queries on production booking data. Set up CI/CD. Mentored juniors through code review.",
        ],
      },
      {
        company: "L2N SOFTWARE LIMITED",
        title: "Software Engineer (Full Stack)",
        dates: "Aug 2018 – Jun 2023",
        loc: "Dhaka, Bangladesh",
        bullets: [
          "Five years of Laravel, Symfony, Vue, and MySQL / PostgreSQL for travel and property clients.",
          "REST APIs and third-party integrations for booking, payments, and business workflows.",
          "Refactored legacy PHP into Laravel / Symfony and improved query efficiency on the modules we modernized.",
          "Delivered full-stack features from schema and Eloquent / Doctrine models through APIs to Vue UI. Introduced unit testing practice; mentored juniors on framework conventions.",
        ],
      },
      ...earlier,
    ],
    projects: [
      {
        name: "CoreBari (corebari.com) — independent SaaS, live",
        text: "Multi-tenant suite (POS, diagnostics lab, attendance/payroll, invoicing) with SSO across apps, offline-first PWA sync, and bKash/Nagad payments.",
        stack: "Next.js · Node.js · TypeScript · PostgreSQL",
      },
      {
        name: "Travel management system",
        text: "End-to-end booking platform that replaced manual booking and customer-management workflows.",
        stack: "PHP / Symfony · Vue.js · MySQL · REST APIs",
      },
      {
        name: "Multi-vendor tour marketplace",
        text: "Vendor management, availability, checkout, and payment-gateway integration, run in production for real customer traffic.",
        stack: "PHP · Vue.js · MySQL",
      },
      {
        name: "CRM platform",
        text: "Customer records, sales workflows, and reporting for business clients.",
        stack: "PHP · Laravel / Symfony · MySQL / PostgreSQL",
      },
    ],
    education,
  },

  js: {
    filename: "Ziaur_Rahman_Resume_FullStack_JS",
    headline: "Senior Full-Stack Engineer  |  Vue · React · Next.js · TypeScript",
    summary:
      "Senior full-stack engineer, 10 years of production SaaS and business systems. Deepest frontend is Vue.js 3 / Nuxt. This past year I shipped React and Next.js (App Router) in production for a Norwegian client — recruitment and lead-generation products — with TypeScript, plus C# / ASP.NET Core and Python. Before that, eight years of Vue on Laravel / Symfony APIs. I also build CoreBari (corebari.com) in Next.js / Node / PostgreSQL: multi-tenant apps, SSO, offline-first PWA sync. I own UI through deploy. I use AI to implement faster; I do not ship frontend I cannot debug.",
    skills: [
      ["Frontend", "Vue.js 3, Nuxt, React, Next.js (App Router, SSR, Server Components), TypeScript, JavaScript (ES6+), Tailwind CSS"],
      ["Backend", "Node.js, REST APIs, PHP, Laravel, Symfony, C#, ASP.NET Core, EF Core, Python"],
      ["Databases", "PostgreSQL, MySQL, SQL Server / Azure SQL, Supabase, Eloquent, EF Core"],
      ["Cloud & DevOps", "Azure (Azure SQL, Key Vault, Static Web Apps), Render, Docker, GitHub Actions, CI/CD, Linux"],
      ["Practices", "API design, JWT auth, payment integrations, layered / DDD structure, unit testing, code review, mentoring"],
    ],
    jobs: [
      {
        company: "OSILION AS",
        title: "Senior Full-Stack Engineer (Contract)",
        dates: "Sep 2025 – Present",
        loc: "Remote — Norway (osilion.no)",
        bullets: [
          "Owned the AI recruitment product end to end — React / Next.js UI and C# / ASP.NET Core API — covering job postings, candidate intake, CV processing, AI interviews, scoring, and feedback.",
          "Built and shipped a lead-generation platform in Next.js, TypeScript, Python, and Supabase (Render): data pipeline through campaign delivery.",
          "Backend on a layered / DDD structure with Repository and Specification patterns, EF Core, and Azure SQL so candidate filters stayed composable as features grew.",
          "JWT auth, migrations, third-party integrations. Deployed on Azure (Azure SQL, Key Vault, Static Web Apps) and Render with GitHub Actions. Also contributed features to a sales CRM on the same team.",
        ],
      },
      {
        company: "DEVVOYAGE",
        title: "Senior Software Engineer",
        dates: "Jul 2023 – Aug 2025",
        loc: "Remote",
        bullets: [
          "Built Vue.js frontends and PHP (Laravel, Symfony) backends for travel, e-commerce, and CRM, including booking engines with availability, pricing, and reservation.",
          "Created reusable Vue component libraries and backend services reused across client projects.",
          "REST APIs plus payment-gateway and third-party integrations for checkout.",
          "CI/CD for builds and deploys. Mentored juniors through code review.",
        ],
      },
      {
        company: "L2N SOFTWARE LIMITED",
        title: "Software Engineer (Full Stack)",
        dates: "Aug 2018 – Jun 2023",
        loc: "Dhaka, Bangladesh",
        bullets: [
          "Five years of Vue.js with Laravel / Symfony and MySQL / PostgreSQL for travel and property clients.",
          "Delivered features from schema and APIs to responsive Vue UI for booking, payment, and business workflows.",
          "Modernized legacy modules and improved query efficiency on the code we touched. Established unit testing practice; mentored juniors.",
        ],
      },
      ...earlier,
    ],
    projects: [
      {
        name: "CoreBari (corebari.com) — independent SaaS, live",
        text: "Multi-tenant suite (POS, lab, attendance/payroll, invoicing) with SSO, offline-first PWA sync, and bKash/Nagad payments.",
        stack: "Next.js · Node.js · TypeScript · PostgreSQL",
      },
      {
        name: "AI recruitment platform",
        text: "Full-stack SaaS: AI interviews, CV processing, candidate scoring.",
        stack: "React / Next.js · C# · ASP.NET Core · EF Core · Azure SQL",
      },
      {
        name: "Lead-generation platform",
        text: "Lead ingest and automated email campaign delivery.",
        stack: "Next.js · TypeScript · Python · Supabase · Render",
      },
      {
        name: "Multi-vendor tour marketplace",
        text: "Vendor management, availability, checkout, payment gateways — production traffic.",
        stack: "Vue.js · PHP · MySQL",
      },
    ],
    education,
  },

  master: {
    filename: "Ziaur_Rahman_Master_Resume",
    headline: "Senior Software Engineer  |  Full-Stack",
    summary:
      "Senior software engineer, 10 years of production web and SaaS. Last year: remote contract with a Norwegian client (Osilion AS) — owned an AI recruitment platform and a lead-generation platform (C#, ASP.NET Core, EF Core, Azure, Python, React, Next.js). Before that, eight years PHP (Laravel, Symfony), Vue / Nuxt, MySQL / PostgreSQL: booking, marketplaces, CRMs. I operate CoreBari (corebari.com): live multi-tenant suite, SSO, offline-first sync, local payments. Deepest backend is still PHP; I am productive in .NET from a year of production work I architected. I use AI as an accelerator and I review everything I ship.",
    skills: [
      ["Languages", "PHP, TypeScript, JavaScript, C#, SQL, Python"],
      ["Backend", "Laravel, Symfony, ASP.NET Core, EF Core, Node.js, REST APIs"],
      ["Frontend", "Vue.js, Nuxt, React, Next.js, Tailwind CSS"],
      ["Databases", "MySQL, PostgreSQL, SQL Server / Azure SQL, Eloquent, Doctrine, EF Core"],
      ["Cloud & DevOps", "Azure (Azure SQL, Key Vault, Static Web Apps), Render, Docker, GitHub Actions, CI/CD, Linux"],
      ["Practices", "Layered / DDD structure, Repository & Specification, JWT, payment integrations, unit testing, code review"],
    ],
    jobs: [
      {
        company: "OSILION AS",
        title: "Senior Full-Stack Engineer (Contract)",
        dates: "Sep 2025 – Present",
        loc: "Remote — Norway (osilion.no)",
        bullets: [
          "Owned the AI recruitment product end to end — postings, candidates, CV processing, AI interviews, scoring — C# / ASP.NET Core / EF Core / Azure SQL and React / Next.js.",
          "Layered backend (Domain, Application, Infrastructure, Web API) with Repository / Specification so candidate filters stayed composable.",
          "Shipped a lead-generation platform (Python, Supabase, Next.js on Render) from ingest to bulk email.",
          "JWT, migrations, Azure (Azure SQL, Key Vault, Static Web Apps) and Render, GitHub Actions. Backend contributions to a sales CRM on a small multi-product team.",
        ],
      },
      {
        company: "DEVVOYAGE",
        title: "Senior Software Engineer",
        dates: "Jul 2023 – Aug 2025",
        loc: "Remote",
        bullets: [
          "Travel, e-commerce, and CRM systems with Laravel / Symfony, Vue, and MySQL, including custom booking engines.",
          "REST APIs and payment-gateway integrations for booking and checkout. Reusable backend services and Vue components across clients.",
          "CI/CD for faster releases. Mentored juniors through code review.",
        ],
      },
      {
        company: "L2N SOFTWARE LIMITED",
        title: "Software Engineer (Full Stack)",
        dates: "Aug 2018 – Jun 2023",
        loc: "Dhaka, Bangladesh",
        bullets: [
          "Five years of Laravel, Symfony, Vue, MySQL / PostgreSQL for travel and property clients.",
          "REST APIs and third-party integrations for booking, payments, and business workflows.",
          "Modernized legacy PHP modules and improved query efficiency on that work. Unit testing practice; mentored juniors.",
        ],
      },
      ...earlier,
    ],
    projects: [
      {
        name: "CoreBari (corebari.com) — independent SaaS, live",
        text: "Multi-tenant POS, lab, attendance/payroll, invoicing; SSO; offline-first PWA sync; bKash/Nagad.",
        stack: "Next.js · Node.js · TypeScript · PostgreSQL",
      },
      {
        name: "AI recruitment platform",
        text: "AI interviews, CV processing, candidate scoring.",
        stack: "C# · ASP.NET Core · EF Core · Azure SQL · React / Next.js",
      },
      {
        name: "Lead-generation platform",
        text: "Lead ingest and automated email campaigns.",
        stack: "Python · Supabase · Next.js · Render",
      },
      {
        name: "Travel booking + multi-vendor marketplace",
        text: "Availability, checkout, payment gateways, production customer traffic.",
        stack: "PHP / Symfony · Vue.js · MySQL",
      },
    ],
    education,
  },
};
