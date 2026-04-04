---
layout: default
title: Staging
permalink: /staging/
---

<div class="max-w-4xl mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Staging</h1>
  
  {% assign staging_posts = site.pages | where_exp: "p", "p.path contains 'staging/'" | where: "preview", true %}
  
  {% if staging_posts.size > 0 %}
    <div class="space-y-8">
      {% for post in staging_posts %}
        <article class="border-l-4 border-accent pl-6 py-2">
          <h2 class="text-2xl font-bold mb-2">
            <a href="{{ post.url | relative_url }}" class="hover:text-accent transition-colors">
              {{ post.title }}
            </a>
          </h2>
          {% if post.date %}
            <p class="text-sm opacity-70 mb-3">{{ post.date | date: "%B %-d, %Y" }}</p>
          {% endif %}
          {% if post.excerpt %}
            <div class="prose prose-lg prose-invert">
              {{ post.excerpt }}
            </div>
          {% endif %}
        </article>
      {% endfor %}
    </div>
  {% else %}
    <p class="text-lg opacity-70">No staging posts available for preview.</p>
  {% endif %}
</div>
