export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO string
  author?: string;
  tags?: string[];
  coverImage?: string;
  content: string; // simple markdown/paragraph text
};

const author = "Ledger1 Team";

export const posts: BlogPost[] = [
  {
    slug: "integrating-toast-pos-with-ledger1-varuni",
    title: "Integrating Toast POS with Ledger1 (Varuni Edition)",
    description:
      "End-to-end guide to connecting Toast POS to Ledger1 using the Varuni demo: auth, webhooks, and data flows.",
    date: "2025-01-20",
    author,
    tags: ["toast", "pos", "integrations", "restaurants", "varuni"],
    coverImage: "/socialbanner.jpg",
    content: `Integrating your POS is the single highest-leverage move you can make in a restaurant ERP. It unlocks accurate daily sales, cash variance, menu performance, labor cost truth, and predictive ordering—without manual spreadsheets.

## Why POS integration matters with Agentic AI

Agentic AI needs a trustworthy, timely stream of operational data so it can detect issues, reason over context, and act.

- Ground truth: POS is the source for sales, tenders, discounts, voids, taxes, tips, and service charges.
- Autonomous triggers: Agents can watch for anomalies (e.g., negative margin items, cash drawer variance, duplicate voids).
- Action surfaces: When an issue is found, the agent can open a ticket, message a manager, or draft a policy change.
- Prediction and planning: With clean data, the agent can forecast inventory needs and labor requirements per daypart.
- Closed-loop learning: Post-action outcomes (e.g., waste reduction) feed back to the model for continuous improvement.

## Architecture overview

- Ingestion: Webhooks for near-real-time events; periodic polling for reconciliation.
- Backfill: A job fetches historical checks and items to build a consistent baseline.
- Normalization: Map Toast objects to Ledger1 models (checks, menu items, categories, tenders).
- Storage: Persist snapshots with idempotency keys to avoid duplicates.
- Observability: Structured logs and metrics for throughput, latency, and failure reasons.

## Step-by-step integration (Varuni demo)

- Secrets: Add Toast API credentials to the environment store (client id/secret, refresh token, base URL).
- Connectivity test: Run the connection script to validate auth and list a few locations.
- Webhooks: Register event subscriptions for checks/line items; verify signatures on receipt.
- Backfill: Execute the backfill task to hydrate at least 90 days for reporting and baselines.
- Reconciliation: Compare daily POS sales vs. deposits, tax breakdowns, and tender totals.
- Monitoring: Alert on repeated 4xx/5xx errors, webhook gaps, or sudden volume drops.
- Incident playbook: Auto-open a task with context and suggested remediation steps.

## Data model mapping

- Check → Sale with per-item detail, discounts, modifiers, and service charges.
- Menu item → Catalog item with cost and category (pizza, salad, beverage).
- Tender → Payment method (cash, card, gift) with fees when applicable.
- Employee → Labor reference for clock-in/out (if enabled) and comping authority.
- Location → Organization unit with tax jurisdiction and daypart configuration.

## Common pitfalls

- Timezones: Normalize to the store timezone for EOD rolls; store UTC for analytics.
- Idempotency: Use Toast ids + event type as a uniqueness constraint.
- Partial data: Late-arriving events happen—re-run reconciliation per EOD until closed.
- Versioning: Be explicit about Toast API version; guard unknown fields.

## Success metrics

- <1% unreconciled sales by day.
- <5 minutes ingestion-to-dashboard latency.
- Alert MTTD <10 minutes; false positives <5%.
- Ticket auto-triage accuracy >80%.

## What you get on day one

Daily sales truth, reliable item-level margins, anomaly detection, and an Agentic AI that not only explains what went wrong but creates the task, routes it to the right role, and follows up until it is resolved.`,
  },
  {
    slug: "migrating-to-azure-for-erp-reliability",
    title: "Migrating to Azure for ERP Reliability and Scale",
    description:
      "What we optimized while migrating the Varuni demo stack to Azure: environments, containers, and observability.",
    date: "2025-01-14",
    author,
    tags: ["azure", "devops", "kubernetes", "observability", "reliability"],
    coverImage: "/socialbanner.jpg",
    content: `We migrated the Varuni demo to Azure to standardize environments, improve reliability, and simplify support. Here is the blueprint we used and what we learned.

## Goals

- Consistent environments from dev → staging → prod.
- Secure networking and secret management by default.
- Predictable autoscaling and cost controls.
- Observability that shortens time-to-diagnose.

## Baseline architecture

- Containerized services with image promotion via tags.
- Azure Container Apps or AKS depending on scale/ops preferences.
- Azure Key Vault for secrets; Managed Identity for service-to-service auth.
- Azure Monitor + Log Analytics for metrics, traces, and logs.

## Environment strategy

- Immutable builds; environment configured via parameters and secrets.
- Feature flags for risk-managed rollout.
- Staging mirrors production topology (reduced size).

## Networking and security

- Private endpoints for databases and storage.
- Ingress controlled with Web Application Firewall (WAF).
- Egress allow-listing for third-party APIs (e.g., POS providers).

## Observability

- Structured JSON logs with request ids and tenant ids.
- Service-level golden signals: latency, error rate, saturation, traffic.
- Dashboards for ingestion throughput and reconciliation drift.

## Rollout checklist

- Health probes tuned to application cold start.
- Horizontal autoscaling rules (CPU + queue depth).
- Budget alerts; per-service cost attribution tags.
- Disaster recovery drills for config and data restores.

## Results

Reduced Mean Time To Repair (MTTR), faster deploys, and a clear path to scale without re-architecting.`,
  },
  {
    slug: "graphql-and-rest-together-in-ledger1",
    title: "GraphQL and REST Together in Ledger1",
    description:
      "How the Varuni demo uses GraphQL for app queries and REST for integrations without sacrificing clarity.",
    date: "2025-01-05",
    author,
    tags: ["graphql", "rest", "api", "architecture"],
    coverImage: "/socialbanner.jpg",
    content: `Ledger1 pairs GraphQL for product-facing experiences with REST for external system integrations. This keeps the product graph clean while respecting the operational realities of vendors.

## When to use GraphQL

- Product UI that composes data from multiple domains.
- Strong typing and introspection for fast developer iteration.
- Co-located queries with components to avoid over-fetching.

## When to use REST

- Integrations with third-party systems (POS, payroll, inventory) that expose REST.
- Webhooks and idempotent task endpoints.
- Long-running jobs (export/import) with job status polling.

## Patterns that work

- GraphQL behind the app; REST at the boundary for vendors.
- Error shaping: convert vendor-specific errors to stable domain errors.
- Versioning: REST endpoints versioned; GraphQL evolved with deprecation.
- Caching: REST responses cached; GraphQL results memoized on client.

## In the Varuni demo

- Apollo Client with typed operations for dashboard queries.
- REST routes for Toast ingestion, backfill, and reconciliation jobs.
- Shared auth utilities and consistent request tracing across both.

This hybrid approach keeps the developer experience excellent while isolating vendor volatility from the product graph.`,
  },
  {
    slug: "multi-tenant-rbac-in-practice",
    title: "Multi-tenant RBAC in Practice",
    description:
      "Designing roles, permissions, and data access for multi-location operations like Varuni.",
    date: "2024-12-18",
    author,
    tags: ["rbac", "security", "multitenancy", "saas"],
    coverImage: "/socialbanner.jpg",
    content: `Role-based access control (RBAC) has to scale across tenants, brands, and locations—without creating a policy maze.

## Scoping model

- Tenant scope: The organization (brand or company).
- Location scope: One or more stores within a tenant.
- Resource scope: Specific domains (sales, inventory, labor, finance).

## Roles and permissions

- Global Admin: Manage tenants, billing, and compliance.
- Ops Manager: Multi-location oversight; approve reconciliations and anomalies.
- Location Manager: Day-to-day tasks, corrections, staff updates.
- Analyst: Read-only with export privileges.

## Evaluation strategy

- Early deny for missing tenant or location membership.
- Policy evaluation per resource action with clear reasons (for audit).
- Decision logs including who, what, where, when, and why.

## UX considerations

- Surface why an action is disabled and who can grant it.
- Provide a request-access workflow with approvers and SLAs.
- Keep the nav contextual to the current location to reduce errors.

## Performance and safety

- Cache role grants per session with scoped invalidation.
- Enforce row-level filters in queries for tenant/location.
- Run a permission matrix test suite in CI for critical paths.

This approach keeps access safe, auditable, and understandable as the operation grows.`,
  },
  {
    slug: "automation-loops-for-erp-ops",
    title: "Automation Loops for ERP Ops",
    description:
      "Close the loop between ingestion, reconciliation, and alerting to keep operations healthy.",
    date: "2024-12-01",
    author,
    tags: ["automation", "observability", "ops"],
    coverImage: "/socialbanner.jpg",
    content: `ERP excellence comes from reliable control loops: collect data, reconcile deviations, alert intelligently, and verify results.

## The loop

- Ingest data: POS sales, deposits, inventory usage, labor hours.
- Reconcile: Compare expected vs. actual; quantify drift.
- Alert: Notify the right role with context and a suggested action.
- Act: Create a ticket, post a message, or auto-correct when safe.
- Learn: Capture outcomes to improve thresholds and models.

## Signals to watch

- Sales-to-deposit variance by tender.
- Item margin slippage (cost spikes, discount abuse, void patterns).
- Labor vs. sales productivity per daypart.
- Inventory shrink beyond tolerance.

## In the Varuni demo

- Webhooks provide timely sales events; a job reconciles end-of-day.
- Rules flag anomalies and route tasks to managers with templates.
- Dashboards track unresolved items and mean time to resolution.

By closing the loop, teams prevent small issues from becoming costly incidents—and the system keeps getting smarter.`,
  },
];

export function getAllPosts(): BlogPost[] {
  return posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
