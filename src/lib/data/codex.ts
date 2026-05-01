export interface CodexTerm {
    term: string;
    slug: string;
    definition: string;
    longDescription: string;
    category: 'AI Architecture' | 'Security' | 'Infrastructure' | 'Data Engineering' | 'Business Intelligence' | 'Hardware' | 'Compliance' | 'Machine Learning' | 'Operations' | 'Integration';
    relatedSlugs: string[];
}

export const CODEX: CodexTerm[] = [
    {
        term: 'Agentic AI',
        slug: 'agentic-ai',
        definition: 'An AI system that can autonomously plan, execute, and iterate on complex multi-step tasks without continuous human intervention.',
        longDescription: 'Agentic AI represents the next evolution beyond simple chatbots and co-pilots. Where traditional AI systems respond to a single prompt and return a single output, an agentic system receives a high-level objective (e.g., "Reduce customer churn by 15% this quarter") and autonomously decomposes it into sub-tasks, executes them across multiple enterprise systems, evaluates intermediate results, and iterates. BasaltHQ deploys agentic swarms across CRM, ERP, and compliance modules, allowing a single directive to cascade into hundreds of coordinated autonomous actions spanning sales outreach, inventory optimization, and regulatory filing simultaneously.',
        category: 'AI Architecture',
        relatedSlugs: ['swarm-intelligence', 'autonomous-orchestration', 'llm-reasoning-chain']
    },
    {
        term: 'Swarm Intelligence',
        slug: 'swarm-intelligence',
        definition: 'A decentralized coordination model where multiple specialized AI agents collaborate to solve problems no single agent could handle alone.',
        longDescription: 'Inspired by biological systems like ant colonies and bee hives, Swarm Intelligence in the BasaltHQ ecosystem refers to the deployment of dozens of narrowly specialized agents that communicate laterally. A "Legal Agent" in BASALTONYX can flag a contractual risk, which triggers a "Financial Agent" in BASALTERP to model the fiscal impact, which in turn activates a "Communications Agent" in BASALTCRM to draft a client notification. No central controller orchestrates this; the agents negotiate priorities using a shared context bus. This architecture is inherently fault-tolerant—if one agent crashes, the swarm reroutes around it, much like a biological neural network.',
        category: 'AI Architecture',
        relatedSlugs: ['agentic-ai', 'autonomous-orchestration', 'context-window-management']
    },
    {
        term: 'Autonomous Orchestration',
        slug: 'autonomous-orchestration',
        definition: 'The ability of an AI system to coordinate workflows across multiple enterprise platforms without human scheduling or intervention.',
        longDescription: 'Traditional enterprise automation requires a human to define rigid workflows in tools like Zapier or Power Automate. Autonomous Orchestration, as implemented by BasaltHQ, removes the human from the loop entirely for routine operations. The orchestration layer observes the state of all connected systems (CRM pipeline stages, ERP inventory levels, compliance deadlines) and dynamically composes workflows in real-time based on current conditions. If a high-value deal in BASALTCRM moves to "Negotiation," the orchestrator autonomously generates a pricing proposal from BASALTERP, runs it through a compliance check via BASALTONYX, and stages it in the sales rep\'s outbox—all before the rep finishes their morning coffee.',
        category: 'Operations',
        relatedSlugs: ['agentic-ai', 'swarm-intelligence', 'event-driven-architecture']
    },
    {
        term: 'LLM Reasoning Chain',
        slug: 'llm-reasoning-chain',
        definition: 'A structured sequence of logical steps an LLM follows to arrive at a verifiable conclusion, analogous to showing your work in mathematics.',
        longDescription: 'Enterprise AI cannot operate as a black box. When BASALTONYX recommends rejecting a vendor contract, the legal team needs to understand *why*. LLM Reasoning Chains (also called Chain-of-Thought prompting) force the model to externalize its intermediate logic steps. BasaltHQ stores these chains as immutable audit trails, allowing compliance officers to replay the exact reasoning path the AI followed. This transforms AI from an opaque oracle into a transparent, auditable decision engine that satisfies SOC2, HIPAA, and GDPR requirements.',
        category: 'AI Architecture',
        relatedSlugs: ['agentic-ai', 'explainable-ai', 'prompt-engineering']
    },
    {
        term: 'Retrieval-Augmented Generation',
        slug: 'retrieval-augmented-generation',
        definition: 'A technique that grounds LLM responses in factual, enterprise-specific data by retrieving relevant documents before generating an answer.',
        longDescription: 'RAG solves the hallucination problem that plagues vanilla LLMs. When a BasaltHQ agent is asked "What are the payment terms for Client X?", it does not guess. BASALTECHO first queries the enterprise vector database to retrieve the actual signed contract, the latest invoice history, and any relevant email threads. This retrieved context is injected into the LLM prompt, ensuring the response is grounded in verified corporate truth. BasaltHQ implements a multi-stage RAG pipeline: semantic search, re-ranking, and citation verification, ensuring every generated response includes traceable source references.',
        category: 'AI Architecture',
        relatedSlugs: ['vector-database', 'semantic-search', 'context-window-management']
    },
    {
        term: 'Vector Database',
        slug: 'vector-database',
        definition: 'A specialized database optimized for storing and querying high-dimensional mathematical representations of unstructured data like text, images, and audio.',
        longDescription: 'Traditional SQL databases search by exact keyword match. Vector databases search by *meaning*. When BASALTECHO ingests your enterprise documents, each paragraph is converted into a 1,536-dimension vector embedding that captures its semantic meaning. Searching for "payment disputes" will also return documents about "billing conflicts" and "invoice disagreements" even if those exact words never appear. BasaltHQ deploys tenant-isolated vector indices, ensuring absolute data separation between clients while enabling sub-50ms semantic retrieval across millions of enterprise documents.',
        category: 'Data Engineering',
        relatedSlugs: ['retrieval-augmented-generation', 'semantic-search', 'embedding-model']
    },
    {
        term: 'Semantic Search',
        slug: 'semantic-search',
        definition: 'A search methodology that understands the intent and contextual meaning behind a query, rather than matching literal keywords.',
        longDescription: 'Legacy enterprise search is fundamentally broken. An employee searching for "how do we handle returns?" gets zero results because the policy document uses the phrase "merchandise exchange protocol." Semantic Search, powered by the vector infrastructure in BASALTECHO, understands that these concepts are identical. It maps queries and documents into the same mathematical space and retrieves results based on cosine similarity of meaning. This single capability eliminates the most common complaint in every enterprise: "I know that document exists, but I can\'t find it."',
        category: 'Data Engineering',
        relatedSlugs: ['vector-database', 'retrieval-augmented-generation', 'knowledge-graph']
    },
    {
        term: 'Context Window Management',
        slug: 'context-window-management',
        definition: 'The strategic allocation and optimization of the finite amount of text an LLM can process in a single inference call.',
        longDescription: 'Every LLM has a context window limit—the maximum amount of text it can "see" at once. For enterprise applications processing massive contracts or codebases, this is a critical bottleneck. BasaltHQ implements intelligent Context Window Management through hierarchical summarization, sliding window chunking, and priority-based context injection. When an agent in BASALTONYX reviews a 200-page legal document, it does not try to fit the entire document into one call. Instead, it creates a hierarchical summary tree, identifies the most relevant sections via semantic search, and injects only the critical clauses into the active context alongside the user query.',
        category: 'AI Architecture',
        relatedSlugs: ['retrieval-augmented-generation', 'llm-reasoning-chain', 'prompt-engineering']
    },
    {
        term: 'Prompt Engineering',
        slug: 'prompt-engineering',
        definition: 'The discipline of designing, testing, and optimizing the textual instructions given to an LLM to maximize the quality, accuracy, and consistency of its output.',
        longDescription: 'In BasaltHQ, prompts are not ad-hoc strings typed by users. They are rigorously engineered artifacts, version-controlled and A/B tested like production code. Each agentic module (CRM outreach, legal review, ERP forecasting) ships with a library of battle-tested system prompts that define the agent\'s persona, constraints, output format, and error-handling behavior. These prompts incorporate few-shot examples drawn from real enterprise scenarios, ensuring the agent\'s behavior is predictable and aligned with corporate standards. Prompt regression testing is automated—if a model update degrades output quality on any benchmark prompt, the deployment is automatically blocked.',
        category: 'AI Architecture',
        relatedSlugs: ['llm-reasoning-chain', 'context-window-management', 'fine-tuning']
    },
    {
        term: 'Fine-Tuning',
        slug: 'fine-tuning',
        definition: 'The process of further training a pre-trained LLM on a smaller, domain-specific dataset to specialize its behavior for a particular industry or task.',
        longDescription: 'A general-purpose LLM knows a little about everything. A fine-tuned model knows everything about your business. BasaltHQ offers enterprise fine-tuning pipelines that take your historical data—past sales emails that closed deals, legal briefs that won cases, support tickets that achieved high CSAT—and use them to specialize the base model. The result is an agent that doesn\'t just write generic corporate prose; it writes in your company\'s exact voice, using your terminology, referencing your products correctly, and adhering to your style guide. Fine-tuning is performed within the BasaltHQ privacy perimeter, ensuring your training data never leaves your tenant.',
        category: 'Machine Learning',
        relatedSlugs: ['prompt-engineering', 'embedding-model', 'transfer-learning']
    },
    {
        term: 'Embedding Model',
        slug: 'embedding-model',
        definition: 'A neural network that converts raw data (text, images, audio) into dense numerical vectors that capture semantic meaning.',
        longDescription: 'Embedding models are the invisible backbone of every intelligent search, recommendation, and classification system in BasaltHQ. When BASALTECHO processes a new document, the embedding model converts each chunk into a fixed-length vector (typically 768 or 1,536 dimensions). Documents with similar meaning cluster together in this high-dimensional space, enabling instant similarity search. BasaltHQ supports multiple embedding providers and allows enterprises to deploy custom embedding models fine-tuned on their domain vocabulary, ensuring that industry-specific jargon (e.g., medical codes, legal citations) is accurately represented.',
        category: 'Machine Learning',
        relatedSlugs: ['vector-database', 'semantic-search', 'fine-tuning']
    },
    {
        term: 'Zero-Trust Architecture',
        slug: 'zero-trust-architecture',
        definition: 'A security model that requires strict identity verification for every person and device attempting to access resources, regardless of their network location.',
        longDescription: 'BasaltHQ operates on the principle of "never trust, always verify." Every API call between modules—whether from BASALTCRM to BASALTERP, or from an edge kiosk to the cloud—is authenticated with short-lived, scoped JWT tokens. There is no concept of a "trusted internal network." Even if an attacker breaches the perimeter, they cannot move laterally because every micro-service independently validates the caller\'s identity and permissions. This architecture is mandatory for SOC2 Type II compliance and is enforced by BASALTONYX\'s continuous compliance monitoring engine.',
        category: 'Security',
        relatedSlugs: ['context-masking', 'data-sovereignty', 'rbac']
    },
    {
        term: 'Context Masking',
        slug: 'context-masking',
        definition: 'A privacy technique that pseudonymizes sensitive entities in data before sending it to an external AI model for processing.',
        longDescription: 'When BasaltHQ agents need to leverage powerful external LLMs for complex reasoning, Context Masking ensures no proprietary data leaks. Before a prompt leaves the BasaltHQ perimeter, an automated masking layer replaces all sensitive entities: company names become "Entity A," dollar amounts become "Value X," and employee names become "Person 1." The external LLM performs its reasoning on this sanitized data. When the response returns, BasaltHQ\'s reconstruction layer maps the pseudonyms back to the real values inside your secure environment. The external model never sees your actual data.',
        category: 'Security',
        relatedSlugs: ['zero-trust-architecture', 'data-sovereignty', 'homomorphic-encryption']
    },
    {
        term: 'Data Sovereignty',
        slug: 'data-sovereignty',
        definition: 'The principle that data is subject to the laws and governance structures of the nation or organization where it is collected or stored.',
        longDescription: 'For multinational enterprises, data sovereignty is not optional—it is law. GDPR requires EU citizen data to remain within EU borders. China\'s PIPL has similar requirements. BasaltHQ\'s infrastructure is built from the ground up to respect these boundaries. BASALTECHO deploys region-locked data clusters, and the orchestration layer automatically routes data processing to the correct geographic zone based on the data subject\'s jurisdiction. When an agentic workflow spans multiple regions, the system ensures that personally identifiable information never crosses a sovereignty boundary, even during inter-module communication.',
        category: 'Compliance',
        relatedSlugs: ['zero-trust-architecture', 'context-masking', 'gdpr-compliance']
    },
    {
        term: 'GDPR Compliance',
        slug: 'gdpr-compliance',
        definition: 'Adherence to the European Union\'s General Data Protection Regulation, which governs the collection, processing, and storage of personal data.',
        longDescription: 'BASALTONYX automates GDPR compliance across the entire BasaltHQ ecosystem. It maintains a real-time data processing inventory that tracks every piece of personal data: where it is stored, who has accessed it, what legal basis justifies its processing, and when it should be deleted. When a data subject exercises their "Right to be Forgotten," BASALTONYX autonomously locates every instance of their data across CRM records, ERP invoices, email archives, and vector embeddings, executes the deletion, and generates a certified compliance report—all within the 30-day regulatory window, without a human touching a single record.',
        category: 'Compliance',
        relatedSlugs: ['data-sovereignty', 'context-masking', 'audit-trail']
    },
    {
        term: 'Audit Trail',
        slug: 'audit-trail',
        definition: 'An immutable, chronological record of every action, decision, and data access event within an enterprise system.',
        longDescription: 'Every action taken by a BasaltHQ agent is logged with cryptographic integrity. When the BASALTCRM agent sends a pricing proposal, the audit trail records: which agent initiated the action, what data it accessed, what reasoning chain it followed, what the output was, and when it was delivered. These logs are stored in append-only, tamper-evident storage. During a SOC2 audit or regulatory inquiry, BASALTONYX can instantly produce a complete forensic timeline of any AI-driven decision, proving that the system operated within its defined guardrails.',
        category: 'Compliance',
        relatedSlugs: ['gdpr-compliance', 'llm-reasoning-chain', 'explainable-ai']
    },
    {
        term: 'Explainable AI',
        slug: 'explainable-ai',
        definition: 'AI systems designed to provide human-understandable justifications for their outputs, enabling trust, debugging, and regulatory compliance.',
        longDescription: 'A black-box AI that says "reject this loan application" is useless in a regulated industry. Explainable AI (XAI) in BasaltHQ means every decision comes with a structured explanation. When BASALTCRM\'s lead scoring agent ranks a prospect as "High Priority," it provides a breakdown: "This score is driven by 3 factors: (1) the prospect\'s company raised Series B funding 2 weeks ago (40% weight), (2) they visited the pricing page 7 times this month (35% weight), (3) their tech stack includes 3 tools we integrate with (25% weight)." This transparency is not just good practice—it is required by the EU AI Act for high-risk AI systems.',
        category: 'AI Architecture',
        relatedSlugs: ['llm-reasoning-chain', 'audit-trail', 'prompt-engineering']
    },
    {
        term: 'Edge Computing',
        slug: 'edge-computing',
        definition: 'Processing data at or near the physical location where it is generated, rather than transmitting it to a centralized cloud data center.',
        longDescription: 'BASALTSURGE kiosks are edge computing devices. They process transactions, run dynamic pricing algorithms, and execute loyalty logic locally, without waiting for a round-trip to a cloud server. This reduces latency from hundreds of milliseconds to single-digit milliseconds—critical for real-time customer interactions. Edge computing also provides resilience: if the internet connection drops, the kiosk continues operating autonomously using its locally cached models and data, syncing back to the cloud when connectivity is restored.',
        category: 'Hardware',
        relatedSlugs: ['autonomous-orchestration', 'digital-twin', 'iot-telemetry']
    },
    {
        term: 'Digital Twin',
        slug: 'digital-twin',
        definition: 'A high-fidelity virtual replica of a physical asset, process, or system that is continuously updated with real-time data.',
        longDescription: 'BASALTERP creates digital twins of entire business operations. A manufacturing plant\'s digital twin includes every machine, every supply chain route, and every financial covenant. It is continuously fed real-time telemetry from IoT sensors on the factory floor. Executives can run "what-if" simulations on the twin—"What happens if we switch suppliers?" or "What is the impact of a 20% tariff increase?"—without disrupting physical operations. The twin predicts outcomes with high accuracy because it mirrors reality down to individual machine vibration patterns and energy consumption curves.',
        category: 'Infrastructure',
        relatedSlugs: ['edge-computing', 'iot-telemetry', 'predictive-maintenance']
    },
    {
        term: 'IoT Telemetry',
        slug: 'iot-telemetry',
        definition: 'The automated collection and transmission of data from remote sensors and devices to a central system for monitoring and analysis.',
        longDescription: 'BasaltHQ integrates with industrial IoT ecosystems to feed real-time data into its agentic decision engines. Temperature sensors, vibration monitors, flow meters, and power consumption gauges stream telemetry into BASALTECHO, where it is indexed, analyzed, and made available to every module. When a freezer unit in a restaurant begins trending 2°C above its setpoint, the telemetry pipeline triggers an alert in BASALTERP, schedules a maintenance call, and adjusts the inventory forecast for perishable goods—all autonomously.',
        category: 'Hardware',
        relatedSlugs: ['digital-twin', 'edge-computing', 'predictive-maintenance']
    },
    {
        term: 'Predictive Maintenance',
        slug: 'predictive-maintenance',
        definition: 'Using AI and sensor data to predict when equipment will fail, allowing maintenance to be scheduled proactively rather than reactively.',
        longDescription: 'Unplanned downtime costs manufacturers an estimated $50 billion annually. BasaltHQ\'s predictive maintenance engine, powered by BASALTERP telemetry integration, analyzes historical failure patterns and real-time sensor data to predict equipment failures days or weeks before they occur. When a CNC mill\'s spindle bearing begins showing early signs of wear (detectable only through subtle changes in vibration frequency), the system autonomously orders the replacement part, schedules the maintenance during an optimal low-production window, and reroutes active jobs to alternate machines.',
        category: 'Operations',
        relatedSlugs: ['digital-twin', 'iot-telemetry', 'anomaly-detection']
    },
    {
        term: 'Anomaly Detection',
        slug: 'anomaly-detection',
        definition: 'AI-driven identification of data points, events, or observations that deviate significantly from expected patterns.',
        longDescription: 'Across the BasaltHQ ecosystem, anomaly detection serves as an early warning system. In BASALTCRM, it flags unusual spikes in customer complaints. In BASALTERP, it detects inventory discrepancies that might indicate theft or data corruption. In the security layer, it identifies login patterns that suggest credential compromise. The system uses a combination of statistical methods (z-score, isolation forests) and deep learning autoencoders trained on your enterprise\'s specific "normal" behavior, minimizing false positives while catching genuine threats.',
        category: 'Machine Learning',
        relatedSlugs: ['predictive-maintenance', 'iot-telemetry', 'explainable-ai']
    },
    {
        term: 'Knowledge Graph',
        slug: 'knowledge-graph',
        definition: 'A structured representation of real-world entities and the relationships between them, enabling machines to reason about interconnected data.',
        longDescription: 'BASALTECHO constructs enterprise knowledge graphs that map every entity in your organization—employees, clients, products, contracts, invoices—and the relationships between them. Unlike flat databases, a knowledge graph allows agents to traverse connections: "Show me all clients who purchased Product X, whose contracts expire within 90 days, and who have open support tickets." This multi-hop reasoning is impossible with traditional SQL queries but trivial for a graph-native architecture. The knowledge graph becomes the shared memory of the entire agentic swarm.',
        category: 'Data Engineering',
        relatedSlugs: ['semantic-search', 'retrieval-augmented-generation', 'vector-database']
    },
    {
        term: 'Event-Driven Architecture',
        slug: 'event-driven-architecture',
        definition: 'A software design pattern where the flow of the program is determined by events such as user actions, sensor outputs, or messages from other services.',
        longDescription: 'BasaltHQ\'s inter-module communication is entirely event-driven. When a new deal closes in BASALTCRM, it emits a "DealClosed" event. BASALTERP subscribes to this event and automatically provisions the resources needed to fulfill the order. BASALTONYX subscribes to generate the contract. The billing module subscribes to create the invoice. No module directly calls another; they all react to events on a shared bus. This loose coupling means new modules can be added to the ecosystem without modifying existing ones—they simply subscribe to the relevant events.',
        category: 'Infrastructure',
        relatedSlugs: ['autonomous-orchestration', 'microservices', 'api-gateway']
    },
    {
        term: 'Microservices',
        slug: 'microservices',
        definition: 'An architectural style where an application is composed of small, independently deployable services, each running its own process.',
        longDescription: 'Every BasaltHQ module (CRM, ERP, Onyx, Echo, Surge) is a collection of microservices. The "Lead Scoring" service in BASALTCRM can be updated, scaled, or even completely rewritten without affecting the "Email Outreach" service. This isolation means that a bug in one service cannot cascade and crash the entire platform. Each microservice owns its own data store and communicates via well-defined APIs, enabling independent scaling—the invoice processing service can scale to 100 instances during month-end while the reporting service stays at 5.',
        category: 'Infrastructure',
        relatedSlugs: ['event-driven-architecture', 'api-gateway', 'zero-trust-architecture']
    },
    {
        term: 'API Gateway',
        slug: 'api-gateway',
        definition: 'A server that acts as the single entry point for all API requests, handling routing, authentication, rate limiting, and monitoring.',
        longDescription: 'The BasaltHQ API Gateway is the front door to the entire enterprise ecosystem. Every request—whether from a mobile app, a BASALTSURGE kiosk, or an external integration—passes through this gateway. It validates the JWT token, checks rate limits, routes the request to the correct microservice, and logs the interaction for the audit trail. The gateway also handles API versioning, allowing legacy integrations to continue functioning while newer clients access updated endpoints. For enterprises with existing infrastructure, the gateway provides a clean integration surface.',
        category: 'Infrastructure',
        relatedSlugs: ['microservices', 'zero-trust-architecture', 'event-driven-architecture']
    },
    {
        term: 'Transfer Learning',
        slug: 'transfer-learning',
        definition: 'A machine learning technique where a model trained on one task is repurposed as the starting point for a model on a different but related task.',
        longDescription: 'BasaltHQ leverages transfer learning to dramatically reduce the time and data required to deploy industry-specific AI. Rather than training a legal document classifier from scratch (which would require millions of labeled examples), we start with a model pre-trained on general legal corpus and fine-tune it on your specific contract library. The model inherits broad legal reasoning capabilities and quickly learns your company\'s unique terminology, clause structures, and risk factors. This reduces deployment time from months to days.',
        category: 'Machine Learning',
        relatedSlugs: ['fine-tuning', 'embedding-model', 'anomaly-detection']
    },
    {
        term: 'Role-Based Access Control',
        slug: 'rbac',
        definition: 'A security mechanism that restricts system access based on the roles assigned to individual users within an organization.',
        longDescription: 'RBAC in BasaltHQ goes beyond simple "admin/user" distinctions. The system supports hierarchical role inheritance, attribute-based policies, and dynamic permissions that change based on context. A regional sales manager can view all deals in their territory but cannot access HR records. A compliance officer can audit any module\'s logs but cannot modify data. An AI agent inherits the permissions of the user who invoked it, ensuring that automated actions never exceed the authority of their human principal. BASALTONYX continuously monitors role assignments for segregation-of-duty violations.',
        category: 'Security',
        relatedSlugs: ['zero-trust-architecture', 'audit-trail', 'data-sovereignty']
    },
    {
        term: 'Homomorphic Encryption',
        slug: 'homomorphic-encryption',
        definition: 'A form of encryption that permits computations to be performed on ciphertext, producing an encrypted result that matches the result of operations performed on plaintext.',
        longDescription: 'Homomorphic encryption is the mathematical holy grail for privacy-preserving AI. It allows BasaltHQ agents to perform calculations on encrypted data without ever decrypting it. A healthcare provider can run diagnostic AI on encrypted patient records—the AI produces accurate results, but never "sees" a single patient name, diagnosis, or social security number. While fully homomorphic encryption remains computationally expensive, BasaltHQ uses partially homomorphic schemes for specific high-sensitivity operations like aggregate financial reporting and anonymized population health analytics.',
        category: 'Security',
        relatedSlugs: ['context-masking', 'zero-trust-architecture', 'data-sovereignty']
    },
    {
        term: 'Incremental Static Regeneration',
        slug: 'incremental-static-regeneration',
        definition: 'A web architecture pattern that allows static pages to be updated after deployment without rebuilding the entire site.',
        longDescription: 'BasaltHQ uses ISR extensively across its public-facing surfaces to serve 15,000+ programmatic location and industry pages at edge-network speeds. When Googlebot crawls basalthq.com/locations/tokyo for the first time, the server renders the page, caches it at the edge, and serves it as static HTML to all subsequent visitors for a configurable period (typically 7 days). This achieves Time-To-First-Byte (TTFB) under 50ms globally while keeping content fresh. ISR is the key to scaling programmatic SEO without sacrificing Core Web Vitals performance.',
        category: 'Infrastructure',
        relatedSlugs: ['edge-computing', 'api-gateway', 'microservices']
    },
];

export function getAllCodexTerms(): CodexTerm[] {
    return CODEX;
}

export function getCodexTermBySlug(slug: string): CodexTerm | undefined {
    return CODEX.find(t => t.slug === slug);
}
