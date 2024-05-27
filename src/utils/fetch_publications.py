from scholarly import scholarly, ProxyGenerator
import json

def fetch_scholar_data(user_id):
    # Setting up a ProxyGenerator
    pg = ProxyGenerator()
    pg.FreeProxies()
    scholarly.use_proxy(pg)

    # Fetch the author using the user_id
    author = scholarly.search_author_id(user_id)
    author = scholarly.fill(author, sections=['publications'])

    # Get the publications and sort them by citation count
    publications = author['publications']
    sorted_publications = sorted(publications, key=lambda x: x['num_citations'], reverse=True)

    result = []
    for pub in sorted_publications:
        pub_filled = scholarly.fill(pub)
        title = pub_filled['bib'].get('title', 'No title')
        authors = ', '.join(pub_filled['bib'].get('author', []))
        journal = pub_filled['bib'].get('journal', 'No journal')
        year = pub_filled['bib'].get('pub_year', 'N/A')
        citations = pub_filled['num_citations']
        url = pub_filled.get('pub_url', 'No URL')

        result.append({
            'title': title,
            'authors': authors if authors else 'No authors',
            'journal': journal,
            'year': year,
            'citations': citations,
            'url': url 
        })

    # Save the result to a JSON file
    with open('src/assets/publications.json', 'w') as f:
        json.dump(result, f, indent=2)

if __name__ == "__main__":
    user_id = 'EfaQZA8AAAAJ'
    fetch_scholar_data(user_id)
