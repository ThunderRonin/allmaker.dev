import os
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Define custom styles
    name_style = ParagraphStyle(
        'Name',
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor('#0f172a')
    )

    subtitle_style = ParagraphStyle(
        'Subtitle',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor('#be123c')
    )

    contact_style = ParagraphStyle(
        'Contact',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155')
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'Body',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#1e293b')
    )

    job_title_style = ParagraphStyle(
        'JobTitle',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#0f172a')
    )

    meta_style = ParagraphStyle(
        'Meta',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#475569')
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        fontName='Helvetica',
        fontSize=8.2,
        leading=11.2,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("Amirali Daliri", name_style))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Full-Stack Software Engineer · Systems &amp; AI Infrastructure", subtitle_style))
    story.append(Spacer(1, 4))

    contacts = (
        '<a href="mailto:amirali@allmaker.dev"><b>amirali@allmaker.dev</b></a> · '
        '<a href="https://linkedin.com/in/amiralidaliri">linkedin.com/in/amiralidaliri</a> · '
        '<a href="https://github.com/ThunderRonin">github.com/ThunderRonin</a> · '
        '<a href="https://allmaker.dev">allmaker.dev</a><br/>'
        '+98 912 838 7669 · Tehran, Iran · Remote · Open to Relocation'
    )
    story.append(Paragraph(contacts, contact_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#cbd5e1'), spaceBefore=2, spaceAfter=6))

    # Summary
    story.append(Paragraph("SUMMARY", section_heading))
    summary_text = (
        "Full-stack and systems engineer with 3+ years shipping real-time backends, multi-tenant SaaS platforms, "
        "distributed systems, and AI/RAG pipelines to production. Deep technical command across <b>.NET 10 (C#)</b>, "
        "<b>Flutter</b>, <b>Go</b>, and <b>TypeScript</b>. At <b>Kasb Platform</b>, engineered core financial ledger "
        "services in .NET 10 and spearheaded the Linux/Docker Swarm infrastructure migration. At <b>PetaProc</b>, "
        "engineered WebRTC media relay infrastructure (Go/pion), Elasticsearch search, and LanceDB AI orchestration."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#e2e8f0'), spaceBefore=2, spaceAfter=5))

    # Technical Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    skills = [
        ("Languages:", "TypeScript, C#, Go, Dart, JavaScript, Python, SQL (PostgreSQL, SQL Server), Shell"),
        ("Backend & Systems:", ".NET 10 / ASP.NET Core (EF Core, Kestrel), Node.js, NestJS, Elysia (Bun), Gin (Go), Microservices"),
        ("Mobile & Frontend:", "Flutter + Riverpod (iOS, Android, Desktop), React Native, Next.js 15, SvelteKit (Svelte 5), Astro, React 19, Tailwind CSS"),
        ("AI / ML & Vector:", "LanceDB, Qdrant, OpenRouter, LangChain, @xenova/transformers, Model Context Protocol (MCP), RAG"),
        ("Cloud, Edge & DevOps:", "Cloudflare Workers, Docker, Docker Swarm, Linux, Caddy, NGINX, CI/CD, Asynq (Redis queue)"),
        ("Databases & Cache:", "PostgreSQL + Prisma, SQL Server, Redis, SQLite, MinIO, AWS S3"),
        ("Observability & Testing:", "OpenTelemetry (OTLP/gRPC), Sentry, Serilog + Grafana Loki, Jest, Vitest, Playwright")
    ]
    for cat, items in skills:
        p = Paragraph(f"<b>{cat}</b> {items}", body_style)
        story.append(p)
        story.append(Spacer(1, 1.5))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#e2e8f0'), spaceBefore=2, spaceAfter=5))

    # Work Experience
    story.append(Paragraph("WORK EXPERIENCE", section_heading))

    # 1. Kasb Platform
    kasb_header = [
        [Paragraph("<b>Kasb Platform</b> — Backend &amp; Systems Infrastructure Engineer", job_title_style),
         Paragraph("Tehran, Iran · 2025 – Present", meta_style)]
    ]
    t = Table(kasb_header, colWidths=[380, 160])
    t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('ALIGN', (1,0), (1,0), 'RIGHT')]))
    story.append(t)
    story.append(Paragraph("<i>.NET 10 · C# 14 · ASP.NET Core · EF Core · SQL Server · PostgreSQL · Docker Swarm · Linux · Caddy · Syncfusion</i>", meta_style))
    story.append(Spacer(1, 2))

    kasb_bullets = [
        "Architected core financial ledger and B2B commerce services in <b>.NET 10 / C# 14</b> with Entity Framework Core, resolving double-entry balance reconciliation discrepancies and enforcing transactional invariants.",
        "Spearheaded the Linux &amp; containerization migration from legacy Windows/IIS to containerized <b>Docker Swarm</b> clusters, establishing isolated overlay networks (<code>kasbNet</code>), automated self-hosted CI runners, and zero-downtime Caddy edge SSL termination.",
        "Engineered a high-fidelity headless invoice and financial document rendering engine using Syncfusion Blink runtime on Linux containers, achieving 100% font rendering parity for RTL Persian financial invoices.",
        "Planned and established database modernization pathways from SQL Server to PostgreSQL, introducing EF Core multi-provider abstractions and migration validation test suites.",
        "Integrated backend APIs with cross-platform mobile client flows (Flutter / mobile APIs) for real-time inventory and checkout sync."
    ]
    for b in kasb_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # 2. PetaProc
    petaproc_header = [
        [Paragraph("<b>PetaProc</b> — Full-Stack Engineer (Backend Focus)", job_title_style),
         Paragraph("Tehran, Iran · Sep 2024 – Present", meta_style)]
    ]
    t = Table(petaproc_header, colWidths=[380, 160])
    t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('ALIGN', (1,0), (1,0), 'RIGHT')]))
    story.append(t)
    story.append(Paragraph("<i>Go · Gin · Flutter (Riverpod) · WebRTC (pion) · NestJS · PostgreSQL · Redis · Elasticsearch · OpenTelemetry</i>", meta_style))
    story.append(Spacer(1, 2))

    peta_bullets = [
        "Developed a real-time voice/video backend in Go with WebRTC media relay (RTP/RTCP via pion) and WebSocket signaling; utilized Socket.io with Redis pub/sub adapter to support horizontal scaling across server instances.",
        "Instrumented distributed tracing with OpenTelemetry (OTLP/gRPC) and Sentry error monitoring, cutting mean time to identify production incidents by ~50%.",
        "Integrated async media processing with Asynq (Redis job queue) and MinIO object storage, processing media jobs with &lt;2s queue-to-worker pickup at p95 under sustained load.",
        "Delivered cross-platform Flutter client (iOS/Android/Desktop) with Riverpod state management covering call UI, threaded replies, and file uploads; widget tests reached ~65% coverage.",
        "Maintained dual REST APIs (NestJS and Go/Gin) for collaboration platform; replaced PostgreSQL full-text search with Elasticsearch, cutting p95 search latency by ~70%."
    ]
    for b in peta_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))

    # 3. Dorj Wallet
    dorj_header = [
        [Paragraph("<b>Dorj Wallet</b> — Back-End Developer", job_title_style),
         Paragraph("Tehran, Iran · Apr 2024 – Aug 2024", meta_style)]
    ]
    t = Table(dorj_header, colWidths=[380, 160])
    t.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('ALIGN', (1,0), (1,0), 'RIGHT')]))
    story.append(t)
    story.append(Paragraph("<i>NestJS · TypeScript · Ethers.js · Ledger SDK · Web3 · PostgreSQL · Prisma</i>", meta_style))
    story.append(Spacer(1, 2))

    dorj_bullets = [
        "Built NestJS REST APIs for cryptocurrency platform using Ethers.js for on-chain interactions: wallet connection, transaction signing, and smart contract execution.",
        "Integrated Ledger hardware wallet SDK from scratch, enabling secure hardware-based transaction signing for end users."
    ]
    for b in dorj_bullets:
        story.append(Paragraph(f"• {b}", bullet_style))
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#e2e8f0'), spaceBefore=2, spaceAfter=5))

    # Featured Projects
    story.append(Paragraph("FEATURED PROJECTS", section_heading))

    projects = [
        ("AllCodex Ecosystem &amp; AllKnower", "https://github.com/ThunderRonin/allknower", "Bun, Elysia, LanceDB, OpenRouter, Next.js 15, MCP",
         "Shipped AllKnower AI orchestration service on Bun/Elysia with RAG vector retrieval (LanceDB, local embeddings), multi-model LLM routing via OpenRouter, and MCP server integration; assembled AllCodex Portal with Next.js 15 App Router and SvelteKit."),
        ("AllTracker — Cross-Platform Telemetry Tracker", "https://github.com/ThunderRonin/AllTracker", "Flutter, Riverpod, SQLite, Mobile SDK",
         "Released a Flutter desktop and mobile habit and telemetry tracking app with system tray integration, Riverpod state management, and local offline-first SQLite storage."),
        ("AryaMehr Calendar — Zepp OS Smartwatch Engine", "https://github.com/ThunderRonin/aryamehr-calendar", "TypeScript, Zepp OS Embedded SDK",
         "Native Persian &amp; Zoroastrian astronomical calendar, traditional Gahs, and solar prayer computation engine for Amazfit GTR 4 running Zepp OS.")
    ]
    for name, url, stack, desc in projects:
        p_head = Paragraph(f'<b><a href="{url}">{name}</a></b> — <i>{stack}</i>', job_title_style)
        story.append(p_head)
        story.append(Paragraph(f"• {desc}", bullet_style))
        story.append(Spacer(1, 2))

    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#e2e8f0'), spaceBefore=2, spaceAfter=5))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    edu_table = [
        [Paragraph("<b>Bachelor's in Computer Engineering</b> — Iran University of Industries, Tehran", body_style),
         Paragraph("2023 – Present", meta_style)],
        [Paragraph("<b>Diploma in Mathematics &amp; Physics</b> — Allameh Helli High School, Tehran · GPA: 17.86/20", body_style),
         Paragraph("2020 – 2023", meta_style)]
    ]
    t_edu = Table(edu_table, colWidths=[400, 140])
    t_edu.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('ALIGN', (1,0), (1,0), 'RIGHT')]))
    story.append(t_edu)

    doc.build(story)
    print(f"Generated {filename} successfully.")

if __name__ == '__main__':
    target_web = "/home/allmaker/projects/portfolio/public/resume.pdf"
    build_pdf(target_web)
    
    # Also update the user's local Windows Telegram download path
    target_win = "/mnt/c/Users/Amirali/Downloads/Telegram Desktop/amirali_daliri_resume (4).pdf"
    try:
        shutil.copyfile(target_web, target_win)
        print(f"Copied updated resume to {target_win}")
    except Exception as e:
        print(f"Could not copy to Windows path: {e}")
