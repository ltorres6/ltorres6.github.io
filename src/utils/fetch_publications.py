from scholarly import scholarly, ProxyGenerator
import json
import asyncio
import aiohttp
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


def setup_proxy():
    pg = ProxyGenerator()
    pg.FreeProxies()
    scholarly.use_proxy(pg)


async def fetch_publication_details(publication, session):
    retries = 3
    for attempt in range(retries):
        try:
            pub_filled = scholarly.fill(publication)
            title = pub_filled["bib"].get("title", "No title")
            authors = pub_filled["bib"].get("author", [])
            journal = pub_filled["bib"].get("journal", "No journal")
            year = pub_filled["bib"].get("pub_year", "N/A")
            citations = pub_filled["num_citations"]
            url = pub_filled.get("pub_url", "No URL")

            return {
                "title": title,
                "authors": authors if authors else "No authors",
                "journal": journal,
                "year": year,
                "citations": citations,
                "url": url,
            }
        except Exception as e:
            logging.warning(
                f"Attempt {attempt + 1} failed for publication: {publication}. Error: {e}"
            )
            await asyncio.sleep(1)
    logging.error(
        f"Failed to fetch details for publication after {retries} attempts: {publication}"
    )
    return None


async def fetch_scholar_data(user_id):
    setup_proxy()

    # Fetch the author using the user_id
    author = scholarly.search_author_id(user_id)
    author = scholarly.fill(author, sections=["publications"])

    # Get the publications and sort them by citation count
    publications = author["publications"]
    sorted_publications = sorted(
        publications, key=lambda x: x["num_citations"], reverse=True
    )

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_publication_details(pub, session) for pub in sorted_publications]
        results = await asyncio.gather(*tasks)

    # Filter out None results
    results = [res for res in results if res]

    # Save the result to a JSON file
    with open("public/assets/publications.json", "w") as f:
        json.dump(results, f, indent=2)


if __name__ == "__main__":
    user_id = "EfaQZA8AAAAJ"
    asyncio.run(fetch_scholar_data(user_id))
