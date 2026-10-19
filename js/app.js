// Function to fetch and inject standalone review HTML
async function loadReviewBySlug(slug) {
  const contentPane = document.getElementById('content-pane');
  contentPane.innerHTML = '<div class="loading">🐯 Roaring up the review...</div>';

  try {
    // Fetch the standalone HTML file from your repository's /reviews/ folder
    const response = await fetch(`/reviews/${slug}.html`);

    if (!response.ok) {
      throw new Error(`Review for '${slug}' not found.`);
    }

    // Get the HTML text
    const htmlSnippet = await response.text();

    // Inject directly into the browser pane
    contentPane.innerHTML = htmlSnippet;
  } catch (error) {
    contentPane.innerHTML = `
      <div class="error-box">
        <h2>404 - Review Missing</h2>
        <p>Could not find review snippet: <code>reviews/${slug}.html</code></p>
        <a href="#/">Return Home</a>
      </div>
    `;
  }
}

// Simple Hash Router
function handleRoute() {
  const hash = window.location.hash || '#/';
  
  if (hash.startsWith('#/review/')) {
    // Extract the slug after '#/review/'
    const slug = hash.replace('#/review/', '').trim();
    loadReviewBySlug(slug);
  } else {
    // Default home state
    document.getElementById('content-pane').innerHTML = `
      <h2>Welcome to Tiger-Watch Sandbox</h2>
      <p>Select a movie review to inspect dynamic loading.</p>
    `;
  }
}

// Listen for hash changes and page loads
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);