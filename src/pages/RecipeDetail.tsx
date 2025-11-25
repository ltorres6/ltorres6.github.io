import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import '../styles/RecipeDetail.css';

interface RecipeIndex {
  filename: string;
  title: string;
  description: string;
  tags: string[];
  dateAdded: string;
}

interface Recipe extends RecipeIndex {
  content: string;
}

const RecipeDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!slug) {
        setError('Recipe not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Load the recipe index to get metadata
        const indexResponse = await fetch('/assets/recipes/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to load recipe index');
        }
        const recipeIndex: RecipeIndex[] = await indexResponse.json();

        // Find the recipe by slug (filename without .md extension)
        const recipeInfo = recipeIndex.find(r => 
          r.filename.replace('.md', '') === slug
        );

        if (!recipeInfo) {
          throw new Error('Recipe not found');
        }

        // Load the recipe's markdown content
        const markdownResponse = await fetch(`/assets/recipes/${recipeInfo.filename}`);
        if (!markdownResponse.ok) {
          throw new Error(`Failed to load recipe: ${recipeInfo.filename}`);
        }
        const markdownContent = await markdownResponse.text();

        setRecipe({
          ...recipeInfo,
          content: markdownContent
        });
        setLoading(false);
      } catch (err) {
        console.error('Error loading recipe:', err);
        setError(err instanceof Error ? err.message : 'Failed to load recipe');
        setLoading(false);
      }
    };

    loadRecipe();
  }, [slug]);

  if (loading) {
    return (
      <main>
        <div className="recipe-detail-header">
          <Link to="/recipes" className="back-link">← Back to Recipes</Link>
          <h1>Loading recipe...</h1>
        </div>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main>
        <div className="recipe-detail-header">
          <Link to="/recipes" className="back-link">← Back to Recipes</Link>
          <h1>Recipe Not Found</h1>
          <p>Sorry, the recipe you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="recipe-detail-header">
        <Link to="/recipes" className="back-link">← Back to Recipes</Link>
        <div className="recipe-meta-info">
          <h1>{recipe.title}</h1>
          <p className="recipe-description">{recipe.description}</p>
          <div className="recipe-tags">
            {recipe.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="date-added">
            Added: {new Date(recipe.dateAdded).toLocaleDateString()}
          </div>
        </div>
      </div>
      
      <div className="recipe-detail-content">
        <div 
          className="markdown-content"
          dangerouslySetInnerHTML={{ 
            __html: marked(recipe.content) 
          }}
        />
      </div>
    </main>
  );
};

export default RecipeDetail;
