// CMS Data Storage - In-memory storage for demo purposes
// In production, this would be replaced with a database

import { HelpArticle, Documentation, Video, CMSUser, Career } from './types';

// FAQ Data
export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How do I get started with Ledger1?',
    answer: 'Getting started is easy! First, create your account at ledger1.ai. Then, add your business details, invite your team members, and connect your first integration (like your POS system). Our onboarding wizard will guide you through each step.',
    category: 'Getting Started',
    order: 1,
  },
  {
    id: 'faq-2',
    question: 'What integrations does Ledger1 support?',
    answer: 'Ledger1 integrates with major POS systems (Toast, Square, Clover, Lightspeed), accounting software (QuickBooks, Xero), payroll providers, and inventory management systems. New integrations are added regularly based on customer requests.',
    category: 'Integrations',
    order: 2,
  },
  {
    id: 'faq-3',
    question: 'How secure is my data?',
    answer: 'We take security seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We maintain SOC 2 Type II compliance, perform regular security audits, and follow industry best practices. Your data is backed up daily and stored in multiple geographic locations.',
    category: 'Security',
    order: 3,
  },
  {
    id: 'faq-4',
    question: 'Can I manage multiple locations?',
    answer: 'Yes! Ledger1 is designed for multi-location operations. You can manage unlimited locations from a single account, view consolidated reports, or drill down into location-specific data. Set up different permissions for each location as needed.',
    category: 'Features',
    order: 4,
  },
  {
    id: 'faq-5',
    question: 'What kind of support do you offer?',
    answer: 'We offer email support for all plans, with response times of 24 hours or less. Premium plans include priority support with 4-hour response times, phone support, and a dedicated account manager. Our help center and documentation are available 24/7.',
    category: 'Support',
    order: 5,
  },
  {
    id: 'faq-6',
    question: 'How does pricing work?',
    answer: 'Pricing is based on the number of locations and users. We offer monthly and annual billing (with a discount for annual). All plans include core features, with premium plans offering advanced analytics, custom integrations, and priority support. Visit our pricing page for detailed information.',
    category: 'Billing',
    order: 6,
  },
  {
    id: 'faq-7',
    question: 'Can I export my data?',
    answer: 'Absolutely! You own your data. Export reports to CSV, Excel, or PDF at any time. We also provide API access for custom integrations and data exports. If you ever decide to leave, we\'ll help you export all your historical data.',
    category: 'Data',
    order: 7,
  },
  {
    id: 'faq-8',
    question: 'How often is data synced from my POS?',
    answer: 'Data syncs in near real-time via webhooks. Most transactions appear in Ledger1 within 1-2 minutes. We also run a reconciliation process every 15 minutes to ensure nothing is missed. You can trigger manual syncs at any time.',
    category: 'Integrations',
    order: 8,
  },
];

// Initial Help Articles with videos
export const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with Ledger1',
    description: 'Learn the basics of setting up and using Ledger1 for your business operations.',
    category: 'Getting Started',
    content: `# Getting Started with Ledger1

Welcome to Ledger1! This guide will help you set up your account and start managing your business operations effectively.

## Initial Setup

1. **Create Your Account**: Sign up at ledger1.ai and verify your email
2. **Configure Your Business**: Add your company details, locations, and team members
3. **Connect Integrations**: Link your POS, accounting, and other business systems
4. **Customize Settings**: Set up your preferences, notifications, and workflows

## Quick Start Checklist

- [ ] Complete your business profile
- [ ] Add team members and assign roles
- [ ] Connect your first integration
- [ ] Create your first report
- [ ] Set up automated alerts

## Next Steps

Once you've completed the initial setup, explore our advanced features like:
- Multi-location management
- Real-time analytics
- Automated reconciliation
- Custom workflows

Watch the video tutorial above for a step-by-step walkthrough.`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoThumbnail: '/socialbanner.jpg',
    tags: ['setup', 'basics', 'tutorial'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'pos-integration',
    title: 'Integrating Your POS System',
    description: 'Step-by-step guide to connect your Point of Sale system with Ledger1.',
    category: 'Integrations',
    content: `# Integrating Your POS System

Connect your POS to unlock real-time sales data, inventory tracking, and automated reconciliation.

## Supported POS Systems

- Toast POS
- Square
- Clover
- Lightspeed
- And many more...

## Integration Steps

### 1. Navigate to Integrations
Go to Settings > Integrations and select your POS provider.

### 2. Authenticate
Enter your POS credentials or use OAuth to securely connect.

### 3. Configure Settings
- Select which locations to sync
- Choose data sync frequency
- Set up webhook endpoints

### 4. Test Connection
Run a test sync to verify data flow.

### 5. Enable Auto-Sync
Turn on automatic data synchronization.

## Troubleshooting

**Connection Issues**: Verify your credentials and network settings.
**Data Sync Delays**: Check webhook configurations and retry policies.
**Missing Data**: Ensure proper permissions are granted in your POS system.

For detailed troubleshooting, contact our support team.`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoThumbnail: '/socialbanner.jpg',
    tags: ['pos', 'integration', 'setup'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'troubleshoot-sync',
    title: 'Troubleshooting Sync Issues',
    description: 'Solutions for common POS sync problems and data discrepancies.',
    category: 'Troubleshooting',
    content: `# Troubleshooting Sync Issues

If you're experiencing sync problems, follow these steps to resolve them quickly.

## Common Sync Issues

### 1. Data Not Appearing

**Symptoms**: Transactions from your POS aren't showing up in Ledger1.

**Solutions**:
- Check your internet connection
- Verify POS system is online and operational
- Check integration status in Settings > Integrations
- Look for error messages in the sync log
- Try triggering a manual sync

### 2. Delayed Sync

**Symptoms**: Data is appearing but with significant delays (> 5 minutes).

**Solutions**:
- Check webhook configuration in your POS system
- Verify firewall isn't blocking webhook calls
- Review webhook logs for failed attempts
- Ensure POS system clock is accurate

### 3. Missing Transactions

**Symptoms**: Some transactions are syncing but others are missing.

**Solutions**:
- Run reconciliation report to identify gaps
- Check if missing transactions have specific patterns (time, tender type, etc.)
- Verify user permissions in POS system
- Review transaction filters in sync settings

### 4. Duplicate Transactions

**Symptoms**: Same transaction appearing multiple times.

**Solutions**:
- This is usually temporary during sync retry
- Wait 15 minutes for automatic deduplication
- If persists, contact support with transaction IDs
- Check for multiple webhook configurations

## Manual Sync Steps

1. Go to Settings > Integrations
2. Find your POS integration
3. Click "Sync Now" button
4. Wait for confirmation message
5. Refresh your dashboard

## When to Contact Support

Contact us if you experience:
- Sync issues lasting more than 30 minutes
- Recurring missing transactions
- Data corruption or incorrect amounts
- Integration showing offline repeatedly

## Prevention Best Practices

- Keep POS software updated
- Test sync after any POS updates
- Monitor sync health dashboard daily
- Set up sync failure alerts`,
    tags: ['sync', 'troubleshooting', 'pos', 'technical'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'user-management-guide',
    title: 'User Management Guide',
    description: 'Complete guide to adding users, setting permissions, and managing team access.',
    category: 'Guides',
    content: `# User Management Guide

Manage your team effectively with Ledger1's flexible user and permission system.

## Adding Users

### Step 1: Navigate to Users
1. Click Settings in the main navigation
2. Select "Users & Permissions"
3. Click "Add New User" button

### Step 2: Enter User Information
- Full name
- Email address (used for login)
- Phone number (optional)
- Job title

### Step 3: Assign Role
Choose from predefined roles:
- **Admin**: Full access to all features
- **Manager**: Manage operations, view reports
- **Staff**: Limited access to assigned tasks
- **Viewer**: Read-only access to reports

### Step 4: Set Location Access
- Grant access to specific locations
- Or allow access to all locations
- Users can only see data for their assigned locations

## Managing Permissions

### Role-Based Permissions

**Admin Role Can:**
- Manage users and permissions
- Access all locations and data
- Configure integrations
- Manage billing
- Export all data

**Manager Role Can:**
- View and edit operational data
- Run reports for assigned locations
- Manage inventory and staff schedules
- Cannot change billing or add users

**Staff Role Can:**
- Clock in/out
- View assigned tasks
- Access specific modules only
- Cannot view financial reports

**Viewer Role Can:**
- View reports only
- No editing capabilities
- Useful for accountants or consultants

### Custom Permissions

For enterprise plans, create custom roles with granular permissions:
- Sales data access
- Inventory management
- Report viewing
- User management
- Integration configuration

## Best Practices

1. **Principle of Least Privilege**: Give users only the access they need
2. **Review Regularly**: Audit user access quarterly
3. **Offboarding**: Remove access immediately when employees leave
4. **Two-Factor Authentication**: Enable for all admin users
5. **Activity Logging**: Review user activity logs regularly

## Bulk User Management

Import multiple users at once:
1. Download CSV template
2. Fill in user details
3. Upload to Users section
4. Review and confirm

## User Audit Trail

Track user activities:
- Login times and locations
- Data modifications
- Report exports
- Permission changes
- Integration access`,
    tags: ['users', 'permissions', 'team', 'guide', 'security'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'reporting-guide',
    title: 'Custom Reporting Guide',
    description: 'Learn how to create, customize, and schedule reports for your business needs.',
    category: 'Guides',
    content: `# Custom Reporting Guide

Create powerful custom reports to analyze your business data exactly how you need it.

## Report Types

### Financial Reports
- Profit & Loss statements
- Balance sheets
- Cash flow analysis
- Revenue by category
- Expense tracking

### Operational Reports
- Sales by hour/day/week
- Labor cost analysis
- Inventory turnover
- Vendor performance
- Customer analytics

### Compliance Reports
- Tax reports
- Audit trails
- Transaction logs
- Time tracking
- Tip reporting

## Creating Custom Reports

### Step 1: Start New Report
1. Navigate to Reports section
2. Click "Create Custom Report"
3. Choose report type or start from scratch

### Step 2: Select Data Sources
Choose which data to include:
- Sales transactions
- Inventory movements
- Labor hours
- Customer data
- Vendor information

### Step 3: Add Filters
Narrow down your data:
- Date ranges
- Locations
- Categories
- Payment types
- Employee/customer/vendor

### Step 4: Choose Metrics
Select what to measure:
- Sum, average, count
- Percentages and ratios
- Growth rates
- Comparisons

### Step 5: Format Output
- Tables, charts, or graphs
- Sort and group options
- Column selection
- Summary rows
- Conditional formatting

## Report Scheduling

Automate report delivery:
1. Open saved report
2. Click "Schedule"
3. Choose frequency (daily, weekly, monthly)
4. Set time and time zone
5. Add email recipients
6. Select format (PDF, Excel, CSV)

## Advanced Features

### Comparison Reports
Compare periods side-by-side:
- This year vs last year
- This month vs last month
- Location A vs Location B
- Actual vs budget

### Drill-Down Capability
Click any metric to see underlying transactions

### Export Options
- PDF for sharing
- Excel for analysis
- CSV for data processing
- API access for custom integrations

## Report Templates

Start with pre-built templates:
- Daily sales summary
- Weekly labor report
- Monthly P&L
- Quarterly trends
- Annual review

## Tips for Better Reports

1. **Start Simple**: Add complexity gradually
2. **Use Consistent Dates**: Compare same periods
3. **Add Context**: Include notes and annotations
4. **Visual**: Use charts for trends
5. **Automate**: Schedule regular reports
6. **Share**: Distribute to stakeholders

## Common Report Recipes

**Daily Manager Report**:
- Yesterday's sales vs target
- Labor cost percentage
- Top selling items
- Cash variance

**Weekly Owner Report**:
- 7-day sales trend
- Prime cost analysis
- Customer count
- Inventory alerts

**Monthly Financial Report**:
- Full P&L statement
- Category performance
- Year-to-date comparison
- Variance analysis`,
    tags: ['reports', 'analytics', 'guide', 'data'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'daily-reconciliation',
    title: 'Daily Reconciliation Process',
    description: 'Learn how to perform daily reconciliation to ensure accurate financial records.',
    category: 'Operations',
    content: `# Daily Reconciliation Process

Daily reconciliation ensures your financial records match your actual transactions.

## Why Reconciliation Matters

- Catch errors early
- Prevent fraud
- Maintain accurate books
- Meet compliance requirements

## Step-by-Step Process

### 1. Review Sales Data
Check that all sales from your POS have been imported.

### 2. Verify Deposits
Match bank deposits with expected amounts.

### 3. Check Variances
Investigate any discrepancies between expected and actual amounts.

### 4. Document Exceptions
Record explanations for any variances.

### 5. Approve & Close
Once everything balances, approve the day and close it.

## Best Practices

- Reconcile daily, not weekly or monthly
- Set variance thresholds for alerts
- Document all adjustments
- Review trends monthly

## Common Issues

**Missing Transactions**: Check POS sync status and retry if needed.
**Cash Variance**: Review cash handling procedures and drawer counts.
**Tender Mismatch**: Verify credit card batch settlements.

Watch the tutorial video for a visual walkthrough of the reconciliation process.`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoThumbnail: '/socialbanner.jpg',
    tags: ['reconciliation', 'finance', 'operations'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
];

// Initial Documentation
export const documentation: Documentation[] = [
  {
    id: 'api-overview',
    title: 'API Overview',
    description: 'Introduction to the Ledger1 API and authentication methods.',
    section: 'api',
    content: `# API Overview

The Ledger1 API provides programmatic access to your business data and operations.

## Base URL

\`\`\`
https://api.ledger1.ai/v1
\`\`\`

## Authentication

All API requests require authentication using an API key:

\`\`\`bash
curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.ledger1.ai/v1/sales
\`\`\`

## Rate Limits

- Standard: 1000 requests/hour
- Enterprise: 10000 requests/hour

## Response Format

All responses are in JSON format:

\`\`\`json
{
  "data": { ... },
  "meta": {
    "timestamp": "2025-01-14T12:00:00Z",
    "version": "v1"
  }
}
\`\`\`

## Error Handling

Errors include descriptive messages and appropriate HTTP status codes.`,
    order: 1,
    tags: ['api', 'authentication', 'getting-started'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'graphql-schema',
    title: 'GraphQL Schema',
    description: 'Complete GraphQL schema reference for querying your data.',
    section: 'api',
    content: `# GraphQL Schema

Query your data using GraphQL for flexible, efficient data retrieval.

## Endpoint

\`\`\`
https://api.ledger1.ai/graphql
\`\`\`

## Example Query

\`\`\`graphql
query GetSales {
  sales(filter: { date: "2025-01-14" }) {
    id
    amount
    location {
      name
    }
    items {
      name
      quantity
      price
    }
  }
}
\`\`\`

## Available Queries

- \`sales\`: Query sales transactions
- \`inventory\`: Check inventory levels
- \`employees\`: List team members
- \`reports\`: Generate custom reports

## Mutations

Create, update, and delete data using mutations.

See the interactive schema explorer for complete documentation.`,
    order: 2,
    tags: ['api', 'graphql', 'schema'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    description: 'Set up webhooks to receive real-time notifications of events.',
    section: 'api',
    content: `# Webhooks

Receive real-time notifications when events occur in your account.

## Supported Events

- \`sale.created\`: New sale recorded
- \`inventory.low\`: Inventory below threshold
- \`reconciliation.complete\`: Daily reconciliation finished
- \`alert.triggered\`: System alert activated

## Setting Up Webhooks

1. Navigate to Settings > Webhooks
2. Click "Add Webhook"
3. Enter your endpoint URL
4. Select events to subscribe to
5. Save and test

## Webhook Payload

\`\`\`json
{
  "event": "sale.created",
  "timestamp": "2025-01-14T12:00:00Z",
  "data": {
    "saleId": "sale_123",
    "amount": 45.99,
    "locationId": "loc_456"
  }
}
\`\`\`

## Security

All webhooks include a signature header for verification.`,
    order: 3,
    tags: ['api', 'webhooks', 'events'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
];

// Initial Videos
export const videos: Video[] = [
  {
    id: 'platform-overview',
    title: 'Ledger1 Platform Overview',
    description: 'A comprehensive tour of the Ledger1 platform and its key features.',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/socialbanner.jpg',
    duration: '5:32',
    category: 'Getting Started',
    tags: ['overview', 'tutorial', 'introduction'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'pos-integration-demo',
    title: 'POS Integration Demo',
    description: 'Watch how to connect your POS system in under 5 minutes.',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/socialbanner.jpg',
    duration: '4:45',
    category: 'Integrations',
    tags: ['pos', 'integration', 'tutorial'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'reporting-dashboard',
    title: 'Using the Reporting Dashboard',
    description: 'Learn to create custom reports and analyze your business data.',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: '/socialbanner.jpg',
    duration: '6:15',
    category: 'Analytics',
    tags: ['reports', 'analytics', 'dashboard'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
];

// Initial Careers
export const careers: Career[] = [
  {
    id: 'senior-backend-engineer',
    title: 'Senior Backend Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Join our founding engineering team to build the next generation of AI-assisted ERP systems. You\'ll work on core platform services, integrations, and scalability.',
    responsibilities: `## Key Responsibilities

- Design and implement scalable backend services using Node.js, Python, or Go
- Build and maintain integrations with major POS, accounting, and business systems
- Develop real-time data synchronization and processing pipelines
- Implement AI/ML features for automated reconciliation and insights
- Ensure high availability, security, and performance across the platform
- Collaborate with product and design teams to deliver exceptional user experiences
- Mentor junior engineers and contribute to engineering best practices`,
    qualifications: `## Required Qualifications

- 5+ years of backend engineering experience with production systems
- Expert-level knowledge of at least one backend language (Node.js, Python, Go)
- Strong understanding of distributed systems, microservices, and API design
- Experience with PostgreSQL, Redis, and message queues (RabbitMQ, Kafka)
- Proficiency with cloud platforms (AWS, GCP, or Azure)
- Experience building and maintaining third-party integrations
- Strong problem-solving skills and attention to detail

## Preferred Qualifications

- Experience with AI/ML systems or data pipelines
- Background in fintech, ERP, or accounting software
- Contributions to open-source projects
- Experience with GraphQL and REST API design
- Familiarity with infrastructure as code (Terraform, Pulumi)`,
    benefits: `## What We Offer

- Competitive salary with significant equity
- Comprehensive health, dental, and vision insurance
- 401(k) with company match
- Flexible PTO and remote work
- Home office stipend
- Learning and development budget
- Latest equipment and tools`,
    salaryRange: '$150,000 - $200,000 + equity',
    applyUrl: 'mailto:careers@ledger1.ai?subject=Senior Backend Engineer Application',
    tags: ['engineering', 'backend', 'remote', 'senior'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'senior-frontend-engineer',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Build beautiful, intuitive interfaces for our AI-assisted ERP platform. You\'ll create responsive, accessible experiences that delight users and handle complex data visualization.',
    responsibilities: `## Key Responsibilities

- Build modern web applications using React, Next.js, and TypeScript
- Create reusable component libraries and design systems
- Implement complex data visualizations and interactive dashboards
- Ensure excellent performance, accessibility, and mobile responsiveness
- Collaborate with designers to implement pixel-perfect UIs
- Write comprehensive tests and documentation
- Optimize application performance and bundle sizes`,
    qualifications: `## Required Qualifications

- 5+ years of frontend development experience
- Expert knowledge of React, TypeScript, and modern JavaScript
- Strong CSS skills and experience with Tailwind or similar frameworks
- Experience with state management (Redux, Zustand, or Context API)
- Proficiency in testing frameworks (Jest, React Testing Library)
- Understanding of web performance optimization techniques
- Portfolio demonstrating high-quality UI work

## Preferred Qualifications

- Experience with Next.js and server-side rendering
- Background in data visualization (D3.js, Chart.js, or similar)
- Experience with design systems and component libraries
- Contributions to open-source UI projects
- Understanding of web accessibility (WCAG) standards`,
    benefits: `## What We Offer

- Competitive salary with significant equity
- Comprehensive health, dental, and vision insurance
- 401(k) with company match
- Flexible PTO and remote work
- Home office stipend
- Learning and development budget
- Latest equipment and tools`,
    salaryRange: '$140,000 - $190,000 + equity',
    applyUrl: 'mailto:careers@ledger1.ai?subject=Senior Frontend Engineer Application',
    tags: ['engineering', 'frontend', 'react', 'remote', 'senior'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Shape the future of business operations software. Design intuitive experiences that make complex workflows simple and delightful for restaurant and retail operators.',
    responsibilities: `## Key Responsibilities

- Lead end-to-end design process from research to high-fidelity prototypes
- Conduct user research and usability testing with restaurant/retail operators
- Create user flows, wireframes, and interactive prototypes
- Design and maintain the design system and component library
- Collaborate closely with engineering to ensure design quality
- Present design decisions and rationale to stakeholders
- Champion user-centered design principles across the organization`,
    qualifications: `## Required Qualifications

- 4+ years of product design experience, preferably in B2B SaaS
- Portfolio demonstrating strong UI/UX and problem-solving skills
- Proficiency in Figma (or similar design tools)
- Experience designing complex data-heavy interfaces
- Strong understanding of responsive design and mobile-first principles
- Excellent communication and presentation skills
- Ability to balance user needs with business requirements

## Preferred Qualifications

- Experience designing for restaurants, retail, or operations software
- Background in design systems and component libraries
- Understanding of accessibility standards and inclusive design
- Experience with user research methodologies
- Familiarity with HTML/CSS basics`,
    benefits: `## What We Offer

- Competitive salary with significant equity
- Comprehensive health, dental, and vision insurance
- 401(k) with company match
- Flexible PTO and remote work
- Home office stipend
- Learning and development budget
- Latest design tools and resources`,
    salaryRange: '$120,000 - $160,000 + equity',
    applyUrl: 'mailto:careers@ledger1.ai?subject=Product Designer Application',
    tags: ['design', 'product', 'ux', 'remote'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
  {
    id: 'customer-success-manager',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Help restaurant and retail operators succeed with Ledger1. Build relationships, drive adoption, and ensure customers achieve their business goals.',
    responsibilities: `## Key Responsibilities

- Onboard new customers and ensure successful platform adoption
- Build strong relationships with key stakeholders and decision-makers
- Conduct regular check-ins and business reviews with customers
- Identify expansion opportunities and drive account growth
- Gather customer feedback and advocate for product improvements
- Create training materials and conduct customer workshops
- Monitor customer health metrics and proactively address concerns`,
    qualifications: `## Required Qualifications

- 3+ years of customer success or account management experience
- Strong understanding of B2B SaaS and customer lifecycle management
- Excellent communication and relationship-building skills
- Experience with CRM tools (Salesforce, HubSpot, or similar)
- Analytical mindset with ability to interpret data and metrics
- Problem-solving skills and customer-first mentality
- Ability to manage multiple accounts simultaneously

## Preferred Qualifications

- Experience in restaurant, retail, or operations software
- Background in accounting or finance operations
- Technical aptitude and ability to learn complex systems quickly
- Experience creating customer training materials
- Knowledge of change management principles`,
    benefits: `## What We Offer

- Competitive salary with performance bonuses
- Comprehensive health, dental, and vision insurance
- 401(k) with company match
- Flexible PTO and remote work
- Home office stipend
- Professional development opportunities`,
    salaryRange: '$80,000 - $110,000 + bonus',
    applyUrl: 'mailto:careers@ledger1.ai?subject=Customer Success Manager Application',
    tags: ['customer-success', 'remote', 'saas'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    published: true,
  },
];

// CMS Users - Default admin user (password: admin123)
// In production, use proper password hashing
export const cmsUsers: CMSUser[] = [
  {
    id: 'admin-1',
    username: 'admin',
    passwordHash: '$2a$10$rGqhK9dDC2p7RLqN9Ib3P.VB4nXuQZLfPqXZH0ViEzF5iFwQ8XJ3K', // admin123
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
];

// In-memory sessions storage
export const sessions = new Map<string, { userId: string; expiresAt: string }>();
