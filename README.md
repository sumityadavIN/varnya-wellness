# Varnya Wellness Website

The official website for **Varnya Wellness**, a premium Ayurveda and Panchakarma clinic in Gurugram. This site is built with **Jekyll**, hosted on **GitHub Pages**, and designed with a custom "Dark Gold" editorial aesthetic.

🔗 **Live Site:** [https://YOUR_USERNAME.github.io/varnya-website/](https://YOUR_USERNAME.github.io/varnya-website/)

---

## 🛠️ Tech Stack
* **Core:** Jekyll (Ruby-based Static Site Generator)
* **Hosting:** GitHub Pages
* **Styling:** Custom CSS3 (Variables, Flexbox, Grid)
* **Fonts:** Host Grotesk (Headings) & Plus Jakarta Sans (Body)
* **Forms:** Web3Forms (Serverless)

---

## 🚀 Key Features
* **Dynamic Therapy Listing:** Treatments are managed via a YAML data file (`_data/signature_therapies.yml`) for easy updates without touching HTML.
* **Editorial Blog Layout:** Custom Markdown styling with "Lead Paragraphs," "Wellness Tips," and cinematic image layouts.
* **Glassmorphism UI:** Premium frosted glass effects on cards, navigation, and social trays.
* **SEO Optimized:** Includes `jekyll-seo-tag` and JSON-LD Schema for rich Google search results.
* **Mobile Responsive:** Fully adaptive navigation and grid layouts for phone/tablet users.

---

## 💻 Local Development
Follow these steps to run the website on your computer.

### Prerequisites
* Ruby & Jekyll installed ([Installation Guide](https://jekyllrb.com/docs/installation/))
* Bundler (`gem install bundler`)

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/varnya-website.git](https://github.com/YOUR_USERNAME/varnya-website.git)
cd varnya-website
2. Install Dependencies
This installs all the gems listed in the Gemfile (Jekyll, SEO tags, etc.).

Bash

bundle install
3. Run the Server
This starts a local server at http://127.0.0.1:4000/.

Bash

bundle exec jekyll serve
📂 Project Structure
_config.yml: Main site settings (Title, URL, Plugins).

_data/: YAML files for structured content (e.g., Therapies list).

_posts/: Blog articles in .md format (YYYY-MM-DD-title.md).

_layouts/: HTML templates (default, post, home).

style/: Global and specific CSS files.

assets/: Images and static files.

📝 How to Add a New Blog Post
Create a file in _posts/ with the format: YYYY-MM-DD-your-title.md.

Add the standard Front Matter at the top:

YAML

---
layout: post
title: "Top 5 Benefits of Abhyanga"
date: 2025-12-14
author: dr_ayushi
image: /assets/images/abhyanga-hero.jpg
description: "Discover why oil massage is crucial for winter health."
---
Write your content below using Markdown.

📬 Contact Form
The contact form uses Web3Forms.

Access Key: Located in contact.html.

Security: Domain whitelisting is enabled in the Web3Forms dashboard.

© 2025 Varnya Wellness. All Rights Reserved.
