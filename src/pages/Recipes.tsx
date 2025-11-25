import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Recipes.css';

interface RecipeIndex {
  filename: string;
  title: string;
  description: string;
  tags: string[];
  dateAdded: string;
}

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeIndex[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeIndex[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        // Load the recipe index (no need to load markdown content for cards)
        const indexResponse = await fetch('/assets/recipes/index.json');
        if (!indexResponse.ok) {
          throw new Error('Failed to load recipe index');
        }
        const recipeIndex: RecipeIndex[] = await indexResponse.json();

        setRecipes(recipeIndex);
        setFilteredRecipes(recipeIndex);
        setLoading(false);
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Failed to load recipes');
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // Filter recipes based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  if (loading) {
    return (
      <main>
        <div className="recipes-header">
          <h1>Recipes</h1>
          <p>Loading recipes...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="recipes-header">
          <h1>Recipes</h1>
          <p>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="recipes-header">
        <h1>Recipes</h1>
        <p>
          A collection of favorite recipes from my kitchen adventures. From New Mexican comfort food
          to quick weeknight meals, these are dishes I love to make and share.
        </p>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search recipes by name, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => {
          const slug = recipe.filename.replace('.md', '');
          return (
            <Link
              key={recipe.filename}
              to={`/recipes/${slug}`}
              className="recipe-card-link"
            >
              <div className="recipe-card">
                <div className="recipe-card-header">
                  <h3>{recipe.title}</h3>
                </div>

                <p className="recipe-card-description">{recipe.description}</p>

                <div className="recipe-card-footer">
                  <div className="recipe-card-tags">
                    {recipe.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="tag-more">+{recipe.tags.length - 3}</span>
                    )}
                  </div>
                  <div className="date-added">
                    {new Date(recipe.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No recipes found matching "{searchTerm}"</p>
        </div>
      )}
    </main>
  );
};

export default Recipes;
