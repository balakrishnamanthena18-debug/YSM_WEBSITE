import { DetailedCourse } from './types';

export const azureDevopsCourse: DetailedCourse = {
  "slug": "azure-devops",
  "title": "Azure Devops",
  "rating": "4.5",
  "level": "Medium",
  "duration": "12 Weeks",
  "featureBadges": [
    "Expert-led Training",
    "Hands-on Practical Labs",
    "Career Transformation & Guidance",
    "24/7 Support"
  ],
  "accent": "blue",
  "iconType": "azure-devops",
  "overviewParagraphs": [
    "Modern organizations are rapidly adopting Cloud Computing, DevOps, Artificial Intelligence, and Generative AI to accelerate software delivery, automate operations, and build intelligent applications.",
    "This Azure DevOps & AI Engineering Master Program is designed to help learners master Microsoft Azure, DevOps practices, CI/CD pipelines, Infrastructure as Code (IaC), Containers, Kubernetes, MLOps, Generative AI, and AI application deployment.",
    "By combining Azure Cloud, DevOps automation, and modern AI engineering, this course prepares students and professionals for high-demand roles in enterprise IT environments."
  ],
  "highlightsTitle": "Program Highlights:",
  "highlights": [
    "Microsoft Azure Cloud Administration",
    "DevOps Practices & CI/CD Pipelines",
    "Infrastructure as Code (IaC) with Terraform",
    "Docker Containers & Kubernetes (AKS)",
    "Cloud Monitoring, Logging & Security",
    "Artificial Intelligence & Azure AI Services",
    "MLOps & AI Deployment",
    "Agentic AI & AI Automation",
    "Real-Time Enterprise Projects",
    "Comprehensive Placement Preparation"
  ],
  "targetAudience": [
    "Cloud & DevOps Beginners",
    "System Administrators",
    "Software Developers",
    "IT Professionals",
    "Solution Architects",
    "Technical Leads"
  ],
  "prerequisitesNote": "Basic understanding of IT fundamentals is helpful, but the course begins with core concepts.",
  "methodologyPoints": [
    "Instructor-Led Live Training",
    "Practical Assignments",
    "Real-Time Case Studies",
    "Hands-on Tool Practice",
    "Weekly Assessments",
    "Mock Interviews"
  ],
  "certificateText": "Students will receive: Course Completion Certificate accredited by YSM Infotech (ISO 9001:2015 Certified).",
  "careerOpportunitiesTitle": "Job Opportunities",
  "careerRoles": [
    "Azure DevOps Engineer",
    "Cloud Engineer (Azure)",
    "Site Reliability Engineer (SRE)",
    "Build & Release Engineer",
    "CI/CD Automation Specialist",
    "Kubernetes Administrator",
    "Infrastructure Engineer",
    "MLOps Engineer",
    "Azure Cloud Architect",
    "AI Operations Specialist"
  ],
  "tools": [
    {
      "name": "Microsoft Azure",
      "category": "Cloud Platform"
    },
    {
      "name": "Azure DevOps & Pipelines",
      "category": "CI/CD"
    },
    {
      "name": "Git & GitHub",
      "category": "Version Control"
    },
    {
      "name": "Terraform",
      "category": "Infrastructure as Code"
    },
    {
      "name": "Docker",
      "category": "Containers"
    },
    {
      "name": "Kubernetes (AKS)",
      "category": "Orchestration"
    }
  ],
  "modules": [
    {
      "number": "01",
      "title": "Module 1: Introduction to Cloud Computing & Azure",
      "topics": [
        {
          "title": "Cloud Computing Fundamentals",
          "items": [
            "What is Cloud Computing?",
            "IaaS, PaaS, SaaS",
            "Public, Private & Hybrid Cloud"
          ]
        },
        {
          "title": "Microsoft Azure Fundamentals",
          "items": [
            "Azure Architecture",
            "Azure Global Infrastructure",
            "Azure Regions & Availability Zones"
          ]
        },
        {
          "title": "Azure Services Overview",
          "items": [
            "Compute Services",
            "Storage Services",
            "Networking Services",
            "Security Services"
          ]
        },
        {
          "title": "Hands-On Labs",
          "items": [
            "Azure Portal Navigation",
            "Resource Group Creation",
            "Virtual Machine Deployment"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Understand cloud concepts and Azure ecosystem fundamentals."
        }
      ]
    },
    {
      "number": "02",
      "title": "Module 2: Azure Administration Fundamentals",
      "topics": [
        {
          "title": "Azure Compute Services",
          "items": [
            "Virtual Machines",
            "VM Scale Sets",
            "App Services"
          ]
        },
        {
          "title": "Azure Storage",
          "items": [
            "Blob Storage",
            "File Storage",
            "Disk Storage"
          ]
        },
        {
          "title": "Azure Networking",
          "items": [
            "Virtual Networks (VNet)",
            "Subnets",
            "NSG (Network Security Groups)",
            "Load Balancers"
          ]
        },
        {
          "title": "Azure Monitoring",
          "items": [
            "Azure Monitor",
            "Log Analytics"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Manage Azure infrastructure and services effectively."
        }
      ]
    },
    {
      "number": "03",
      "title": "Module 3: Git & Version Control",
      "topics": [
        {
          "title": "Git Fundamentals",
          "items": [
            "Git Architecture",
            "Repository Management"
          ]
        },
        {
          "title": "Git Commands",
          "items": [
            "Clone",
            "Commit",
            "Push",
            "Pull",
            "Merge"
          ]
        },
        {
          "title": "Branching Strategies",
          "items": [
            "Feature Branching",
            "GitFlow",
            "Pull Requests"
          ]
        },
        {
          "title": "GitHub & Azure Repos",
          "items": [
            "Repository Management",
            "Collaboration Workflows"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Manage source code using modern version control practices."
        }
      ]
    },
    {
      "number": "04",
      "title": "Module 4: Azure DevOps Fundamentals",
      "topics": [
        {
          "title": "Introduction to DevOps",
          "items": [
            "DevOps Culture",
            "DevOps Lifecycle"
          ]
        },
        {
          "title": "Azure DevOps Services",
          "items": [
            "Azure Boards",
            "Azure Repos",
            "Azure Pipelines",
            "Azure Artifacts",
            "Azure Test Plans"
          ]
        },
        {
          "title": "Agile & Scrum Basics",
          "items": [
            "Sprint Planning",
            "Work Item Tracking"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Understand DevOps practices and Azure DevOps platform."
        }
      ]
    },
    {
      "number": "05",
      "title": "Module 5: Continuous Integration (CI)",
      "topics": [
        {
          "title": "Build Automation",
          "items": [
            "Build Pipelines",
            "YAML Pipelines"
          ]
        },
        {
          "title": "Automated Testing",
          "items": [
            "Unit Testing",
            "Build Validation"
          ]
        },
        {
          "title": "Code Quality",
          "items": [
            "Static Code Analysis",
            "Security Scanning"
          ]
        },
        {
          "title": "Practical Labs",
          "items": [
            "CI Pipeline Creation",
            "Automated Build Deployment"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Create automated build and validation workflows."
        }
      ]
    },
    {
      "number": "06",
      "title": "Module 6: Continuous Delivery & Deployment (CD)",
      "topics": [
        {
          "title": "Release Management",
          "items": [
            "Release Pipelines",
            "Deployment Strategies"
          ]
        },
        {
          "title": "Deployment Techniques",
          "items": [
            "Blue-Green Deployment",
            "Canary Deployment",
            "Rolling Deployment"
          ]
        },
        {
          "title": "Environment Management",
          "items": [
            "Development",
            "Testing",
            "Production"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Automate software deployment processes."
        }
      ]
    },
    {
      "number": "07",
      "title": "Module 7: Infrastructure as Code (IaC)",
      "topics": [
        {
          "title": "IaC Fundamentals",
          "items": [
            "Benefits of IaC",
            "Automation Concepts"
          ]
        },
        {
          "title": "Terraform",
          "items": [
            "Terraform Architecture",
            "Providers",
            "Resources",
            "Variables"
          ]
        },
        {
          "title": "Azure Resource Manager (ARM)",
          "items": [
            "ARM Templates",
            "Bicep Fundamentals"
          ]
        },
        {
          "title": "Practical Labs",
          "items": [
            "Automated Infrastructure Provisioning"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Automate cloud infrastructure deployment."
        }
      ]
    },
    {
      "number": "08",
      "title": "Module 8: Docker & Containerization",
      "topics": [
        {
          "title": "Docker Fundamentals",
          "items": [
            "Containers vs Virtual Machines",
            "Docker Architecture"
          ]
        },
        {
          "title": "Docker Operations",
          "items": [
            "Docker Images",
            "Docker Containers",
            "Docker Compose"
          ]
        },
        {
          "title": "Container Best Practices",
          "items": [
            "Image Optimization",
            "Security Practices"
          ]
        },
        {
          "title": "Practical Labs",
          "items": [
            "Containerizing Applications"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Build and manage containerized applications."
        }
      ]
    },
    {
      "number": "09",
      "title": "Module 9: Kubernetes & Azure Kubernetes Service (AKS)",
      "topics": [
        {
          "title": "Kubernetes Fundamentals",
          "items": [
            "Cluster Architecture",
            "Pods",
            "Services",
            "Deployments"
          ]
        },
        {
          "title": "AKS",
          "items": [
            "Azure Kubernetes Service",
            "Cluster Management"
          ]
        },
        {
          "title": "Scaling Applications",
          "items": [
            "Horizontal Scaling",
            "Auto Scaling"
          ]
        },
        {
          "title": "Monitoring Kubernetes",
          "items": [
            "Logs",
            "Metrics"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Deploy and manage applications at scale."
        }
      ]
    },
    {
      "number": "10",
      "title": "Module 10: Monitoring, Logging & Security",
      "topics": [
        {
          "title": "Azure Monitoring",
          "items": [
            "Azure Monitor",
            "Application Insights"
          ]
        },
        {
          "title": "Logging",
          "items": [
            "Centralized Logging",
            "Log Analytics"
          ]
        },
        {
          "title": "Security Fundamentals",
          "items": [
            "Identity Management",
            "Azure Active Directory",
            "Role-Based Access Control (RBAC)"
          ]
        },
        {
          "title": "DevSecOps",
          "items": [
            "Security in CI/CD",
            "Vulnerability Management"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Implement monitoring and security best practices."
        }
      ]
    },
    {
      "number": "11",
      "title": "Module 11: Artificial Intelligence Fundamentals",
      "topics": [
        {
          "title": "Introduction to AI",
          "items": [
            "AI Concepts",
            "Machine Learning Overview",
            "Deep Learning Overview"
          ]
        },
        {
          "title": "AI Ecosystem",
          "items": [
            "Data Science",
            "NLP",
            "Computer Vision",
            "Generative AI"
          ]
        },
        {
          "title": "AI Use Cases",
          "items": [
            "Business Automation",
            "Predictive Analytics",
            "AI Assistants"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Understand AI technologies and enterprise applications."
        }
      ]
    },
    {
      "number": "12",
      "title": "Module 12: Generative AI & Azure AI Services",
      "topics": [
        {
          "title": "Generative AI Fundamentals",
          "items": [
            "Large Language Models (LLMs)",
            "AI Assistants"
          ]
        },
        {
          "title": "Azure AI Services",
          "items": [
            "Azure AI Studio",
            "Azure OpenAI Service",
            "Azure Cognitive Services"
          ]
        },
        {
          "title": "Prompt Engineering",
          "items": [
            "Prompt Design",
            "Prompt Optimization"
          ]
        },
        {
          "title": "AI Applications",
          "items": [
            "Content Generation",
            "Chatbots",
            "Knowledge Assistants"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Develop AI-powered applications using Azure services."
        }
      ]
    },
    {
      "number": "13",
      "title": "Module 13: MLOps & AI Deployment",
      "topics": [
        {
          "title": "MLOps Fundamentals",
          "items": [
            "Model Lifecycle",
            "Model Versioning"
          ]
        },
        {
          "title": "Azure Machine Learning",
          "items": [
            "Azure ML Workspace",
            "Model Training",
            "Model Deployment"
          ]
        },
        {
          "title": "CI/CD for AI",
          "items": [
            "Automated Model Deployment",
            "Model Monitoring"
          ]
        },
        {
          "title": "AI Governance",
          "items": [
            "Responsible AI",
            "Model Explainability"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Deploy and manage AI models using MLOps practices"
        }
      ]
    },
    {
      "number": "14",
      "title": "Module 14: Agentic AI & AI Automation",
      "topics": [
        {
          "title": "AI Agents",
          "items": [
            "Agent Architecture",
            "Agent Workflows"
          ]
        },
        {
          "title": "Agentic AI Concepts",
          "items": [
            "Planning",
            "Reasoning",
            "Tool Usage"
          ]
        },
        {
          "title": "AI Automation",
          "items": [
            "Business Process Automation",
            "Intelligent Workflows"
          ]
        },
        {
          "title": "Multi-Agent Systems",
          "items": [
            "Agent Collaboration",
            "Enterprise Use Cases"
          ]
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Build intelligent AI agents and automated business solutions."
        }
      ]
    },
    {
      "number": "15",
      "title": "Module 15: Capstone Projects",
      "topics": [
        {
          "title": "🤖 AI-Powered Customer Support System",
          "items": []
        },
        {
          "title": "📊 Intelligent Business Dashboard",
          "items": []
        },
        {
          "title": "☁️ Azure DevOps CI/CD Platform",
          "items": []
        },
        {
          "title": "🛒 AI Sales Assistant",
          "items": []
        },
        {
          "title": "🚀 AKS Production Deployment",
          "items": []
        },
        {
          "title": "🔄 MLOps Pipeline Project",
          "items": []
        },
        {
          "title": "🏢 Agentic AI Workflow System",
          "items": []
        },
        {
          "title": "Outcome",
          "items": [],
          "outcome": "Gain real-world project experience aligned with enterprise environments."
        }
      ]
    }
  ],
  "projects": [
    {
      "title": "🤖 AI-Powered Customer Support System",
      "description": "Intelligent ticket triage and sentiment monitoring built on Azure AI.",
      "category": "Azure AI"
    },
    {
      "title": "📊 Intelligent Business Dashboard",
      "description": "Centralized observability portal for cloud infrastructure and KPIs.",
      "category": "Cloud Monitoring"
    },
    {
      "title": "☁️ Azure DevOps CI/CD Platform",
      "description": "Multi-stage production build and release pipeline with automated testing.",
      "category": "DevOps & CI/CD"
    },
    {
      "title": "🛒 AI Sales Assistant",
      "description": "Conversational assistant integrated into e-commerce backends.",
      "category": "Cloud Applications"
    },
    {
      "title": "🚀 AKS Production Deployment",
      "description": "Scalable container cluster orchestrated on Azure Kubernetes Service.",
      "category": "Kubernetes"
    },
    {
      "title": "🔄 MLOps Pipeline Project",
      "description": "Automated machine learning model training, tracking, and cloud deployment.",
      "category": "MLOps"
    },
    {
      "title": "🏢 Agentic AI Workflow System",
      "description": "Autonomous cloud operational task executor with self-healing capabilities.",
      "category": "Agentic DevOps"
    }
  ],
  "inquiryMessage": "Hi YSM Infotech, I would like to inquire about the Azure DevOps program.",
  "whatsappUrl": "https://wa.me/917997791456?text=Hi%20YSM%20Infotech%2C%20I%20would%20like%20to%20inquire%20about%20the%20Azure%20DevOps%20program."
};
