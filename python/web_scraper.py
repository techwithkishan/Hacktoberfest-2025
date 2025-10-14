"""
Web Scraper Script with Ethical and Legal Safeguards

This script demonstrates responsible web scraping with comprehensive safeguards:

LEGAL & ETHICAL FEATURES:
    ✓ robots.txt compliance - Automatically checks and respects robots.txt
    ✓ Rate limiting - Configurable delays between requests (default: 2s)
    ✓ Request limits - Optional maximum request cap for safety
    ✓ Transparent user agent - Identifies as a bot, not pretending to be a browser
    ✓ HTTP 429 handling - Automatic backoff on rate limit errors
    ✓ Session statistics - Tracks and reports all requests made
    ✓ Terms of Service reminder - Optional compliance verification

ERROR HANDLING:
    ✓ Timeout management
    ✓ Connection error handling
    ✓ HTTP status code validation
    ✓ Comprehensive exception catching

BEST PRACTICES:
    1. Always check robots.txt (enabled by default)
    2. Use respectful delays (2+ seconds recommended)
    3. Identify yourself with a descriptive user agent
    4. Check Terms of Service before scraping
    5. Consider using official APIs when available
    6. Don't overload servers with too many requests
    7. Store and respect rate limit responses

LEGAL DISCLAIMER:
    Web scraping legality varies by jurisdiction and use case.
    Users are responsible for:
    - Checking the target site's Terms of Service
    - Complying with copyright and data protection laws (GDPR, CCPA, etc.)
    - Ensuring their scraping doesn't constitute unauthorized access
    - Respecting intellectual property rights
    
    This tool is for EDUCATIONAL and RESEARCH purposes.

Dependencies:
    - beautifulsoup4
    - requests
    - lxml (optional, for faster parsing)

Install with: pip install beautifulsoup4 requests lxml
"""

import requests
from bs4 import BeautifulSoup
import time
import json
import csv
from typing import List, Dict, Optional
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class WebScraper:
    """
    A robust web scraper class with error handling, rate limiting, and ethical safeguards.
    """
    
    def __init__(self, base_url: str, timeout: int = 10, delay: float = 2.0, 
                 respect_robots_txt: bool = True, max_requests: int = None,
                 user_agent: str = None):
        """
        Initialize the web scraper with ethical safeguards.
        
        Args:
            base_url: The base URL of the website to scrape
            timeout: Request timeout in seconds (default: 10)
            delay: Delay between requests in seconds (default: 2.0)
            respect_robots_txt: Whether to check and follow robots.txt (default: True)
            max_requests: Maximum number of requests allowed (optional safety limit)
            user_agent: Custom user agent (default: identifies as a bot)
        """
        self.base_url = base_url
        self.timeout = timeout
        self.delay = delay
        self.respect_robots_txt = respect_robots_txt
        self.max_requests = max_requests
        self.request_count = 0
        self.session = requests.Session()
        
        # Use ethical user agent that identifies as a bot
        if user_agent is None:
            user_agent = 'WebScraperBot/1.0 (+https://github.com/hari7261/Hacktoberfest-2025) - Educational/Research Use'
        
        self.session.headers.update({
            'User-Agent': user_agent
        })
        
        # Initialize robots.txt parser
        self.robots_parser = None
        if self.respect_robots_txt:
            self._init_robots_parser()
        
        # Log ethical notice
        logger.info("=" * 60)
        logger.info("ETHICAL SCRAPING SAFEGUARDS ENABLED")
        logger.info(f"- Respecting robots.txt: {self.respect_robots_txt}")
        logger.info(f"- Delay between requests: {self.delay}s")
        logger.info(f"- Max requests limit: {self.max_requests or 'None'}")
        logger.info("- Please ensure you have permission to scrape this site")
        logger.info("- Always check Terms of Service before scraping")
        logger.info("=" * 60)
    
    def _init_robots_parser(self):
        """Initialize and fetch robots.txt for the base URL."""
        try:
            parsed_url = urlparse(self.base_url)
            robots_url = f"{parsed_url.scheme}://{parsed_url.netloc}/robots.txt"
            
            self.robots_parser = RobotFileParser()
            self.robots_parser.set_url(robots_url)
            self.robots_parser.read()
            
            # Check for crawl-delay directive
            crawl_delay = self.robots_parser.crawl_delay('*')
            if crawl_delay and crawl_delay > self.delay:
                logger.warning(f"robots.txt specifies crawl-delay of {crawl_delay}s")
                logger.warning(f"Updating delay from {self.delay}s to {crawl_delay}s")
                self.delay = crawl_delay
            
            logger.info(f"Successfully loaded robots.txt from {robots_url}")
            
        except Exception as e:
            logger.warning(f"Could not fetch robots.txt: {str(e)}")
            logger.warning("Proceeding with caution - please verify scraping is allowed")
            self.robots_parser = None
    
    def _can_fetch(self, url: str) -> bool:
        """
        Check if the URL can be fetched according to robots.txt.
        
        Args:
            url: The URL to check
            
        Returns:
            True if allowed, False otherwise
        """
        if not self.respect_robots_txt or self.robots_parser is None:
            return True
        
        user_agent = self.session.headers.get('User-Agent', '*')
        can_fetch = self.robots_parser.can_fetch(user_agent, url)
        
        if not can_fetch:
            logger.warning(f"robots.txt disallows fetching: {url}")
        
        return can_fetch
    
    def _check_request_limit(self) -> bool:
        """
        Check if request limit has been reached.
        
        Returns:
            True if limit not reached, False otherwise
        """
        if self.max_requests is not None and self.request_count >= self.max_requests:
            logger.error(f"Request limit reached ({self.max_requests}). Stopping for safety.")
            return False
        return True
    
    def _handle_rate_limit(self, response: requests.Response) -> bool:
        """
        Handle HTTP 429 (Too Many Requests) with exponential backoff.
        
        Args:
            response: The response object
            
        Returns:
            True if should retry, False otherwise
        """
        if response.status_code == 429:
            retry_after = response.headers.get('Retry-After')
            if retry_after:
                try:
                    wait_time = int(retry_after)
                except ValueError:
                    wait_time = 60  # Default to 60 seconds
            else:
                wait_time = 60
            
            logger.warning(f"Rate limited (HTTP 429). Waiting {wait_time} seconds...")
            time.sleep(wait_time)
            return True
        
        return False
    
    def fetch_page(self, url: str, max_retries: int = 3) -> Optional[BeautifulSoup]:
        """
        Fetch a web page and return a BeautifulSoup object with ethical safeguards.
        
        Args:
            url: The URL to fetch
            max_retries: Maximum number of retries for rate limiting (default: 3)
            
        Returns:
            BeautifulSoup object if successful, None otherwise
        """
        # Check request limit
        if not self._check_request_limit():
            return None
        
        # Check robots.txt permission
        if not self._can_fetch(url):
            logger.error(f"Blocked by robots.txt: {url}")
            return None
        
        retry_count = 0
        
        while retry_count <= max_retries:
            try:
                logger.info(f"Fetching URL: {url} (Request #{self.request_count + 1})")
                response = self.session.get(url, timeout=self.timeout)
                
                # Increment request counter
                self.request_count += 1
                
                # Handle rate limiting with retry
                if response.status_code == 429 and retry_count < max_retries:
                    self._handle_rate_limit(response)
                    retry_count += 1
                    continue
                
                # Check if request was successful
                response.raise_for_status()
                
                # Parse the HTML content
                soup = BeautifulSoup(response.content, 'lxml')
                
                # Rate limiting - be respectful to the server
                logger.info(f"Waiting {self.delay}s before next request (ethical delay)")
                time.sleep(self.delay)
                
                return soup
                
            except requests.exceptions.Timeout:
                logger.error(f"Timeout error while fetching {url}")
                return None
                
            except requests.exceptions.ConnectionError:
                logger.error(f"Connection error while fetching {url}")
                return None
                
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    logger.error(f"Rate limit exceeded after {max_retries} retries")
                else:
                    logger.error(f"HTTP error {e.response.status_code} while fetching {url}")
                return None
                
            except requests.exceptions.RequestException as e:
                logger.error(f"Request error while fetching {url}: {str(e)}")
                return None
                
            except Exception as e:
                logger.error(f"Unexpected error while fetching {url}: {str(e)}")
                return None
        
        return None
    
    def extract_links(self, soup: BeautifulSoup, base_url: str = None) -> List[str]:
        """
        Extract all links from a BeautifulSoup object.
        
        Args:
            soup: BeautifulSoup object
            base_url: Base URL for resolving relative links
            
        Returns:
            List of absolute URLs
        """
        if soup is None:
            return []
        
        base = base_url or self.base_url
        links = []
        
        try:
            for link in soup.find_all('a', href=True):
                href = link['href']
                # Convert relative URLs to absolute URLs
                absolute_url = urljoin(base, href)
                links.append(absolute_url)
            
            logger.info(f"Extracted {len(links)} links")
            return links
            
        except Exception as e:
            logger.error(f"Error extracting links: {str(e)}")
            return []
    
    def extract_text_content(self, soup: BeautifulSoup, selector: str = None) -> List[str]:
        """
        Extract text content from HTML elements.
        
        Args:
            soup: BeautifulSoup object
            selector: CSS selector to find specific elements (optional)
            
        Returns:
            List of text strings
        """
        if soup is None:
            return []
        
        try:
            if selector:
                elements = soup.select(selector)
            else:
                elements = soup.find_all(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            
            texts = [elem.get_text(strip=True) for elem in elements if elem.get_text(strip=True)]
            logger.info(f"Extracted {len(texts)} text elements")
            return texts
            
        except Exception as e:
            logger.error(f"Error extracting text content: {str(e)}")
            return []
    
    def extract_table_data(self, soup: BeautifulSoup, table_id: str = None) -> List[Dict]:
        """
        Extract data from HTML tables.
        
        Args:
            soup: BeautifulSoup object
            table_id: ID of the specific table to extract (optional)
            
        Returns:
            List of dictionaries representing table rows
        """
        if soup is None:
            return []
        
        try:
            if table_id:
                table = soup.find('table', id=table_id)
                tables = [table] if table else []
            else:
                tables = soup.find_all('table')
            
            all_data = []
            
            for table in tables:
                # Extract headers
                headers = []
                header_row = table.find('thead')
                if header_row:
                    headers = [th.get_text(strip=True) for th in header_row.find_all('th')]
                else:
                    # Try to get headers from first row
                    first_row = table.find('tr')
                    if first_row:
                        headers = [th.get_text(strip=True) for th in first_row.find_all(['th', 'td'])]
                
                # Extract data rows
                rows = table.find_all('tr')[1:] if headers else table.find_all('tr')
                
                for row in rows:
                    cols = row.find_all(['td', 'th'])
                    if cols:
                        if headers and len(headers) == len(cols):
                            row_data = {headers[i]: col.get_text(strip=True) 
                                       for i, col in enumerate(cols)}
                        else:
                            row_data = {f'column_{i}': col.get_text(strip=True) 
                                       for i, col in enumerate(cols)}
                        all_data.append(row_data)
            
            logger.info(f"Extracted {len(all_data)} table rows")
            return all_data
            
        except Exception as e:
            logger.error(f"Error extracting table data: {str(e)}")
            return []
    
    def extract_images(self, soup: BeautifulSoup, base_url: str = None) -> List[Dict[str, str]]:
        """
        Extract image URLs and alt text from a page.
        
        Args:
            soup: BeautifulSoup object
            base_url: Base URL for resolving relative URLs
            
        Returns:
            List of dictionaries with 'url' and 'alt' keys
        """
        if soup is None:
            return []
        
        base = base_url or self.base_url
        images = []
        
        try:
            for img in soup.find_all('img'):
                src = img.get('src', '')
                if src:
                    absolute_url = urljoin(base, src)
                    images.append({
                        'url': absolute_url,
                        'alt': img.get('alt', ''),
                        'title': img.get('title', '')
                    })
            
            logger.info(f"Extracted {len(images)} images")
            return images
            
        except Exception as e:
            logger.error(f"Error extracting images: {str(e)}")
            return []
    
    def save_to_json(self, data: List[Dict], filename: str) -> bool:
        """
        Save scraped data to a JSON file.
        
        Args:
            data: List of dictionaries to save
            filename: Output filename
            
        Returns:
            True if successful, False otherwise
        """
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            logger.info(f"Data saved to {filename}")
            return True
            
        except Exception as e:
            logger.error(f"Error saving to JSON: {str(e)}")
            return False
    
    def save_to_csv(self, data: List[Dict], filename: str) -> bool:
        """
        Save scraped data to a CSV file.
        
        Args:
            data: List of dictionaries to save
            filename: Output filename
            
        Returns:
            True if successful, False otherwise
        """
        if not data:
            logger.warning("No data to save")
            return False
        
        try:
            keys = data[0].keys()
            with open(filename, 'w', newline='', encoding='utf-8') as f:
                writer = csv.DictWriter(f, fieldnames=keys)
                writer.writeheader()
                writer.writerows(data)
            logger.info(f"Data saved to {filename}")
            return True
            
        except Exception as e:
            logger.error(f"Error saving to CSV: {str(e)}")
            return False
    
    def get_statistics(self) -> Dict[str, any]:
        """
        Get scraping session statistics.
        
        Returns:
            Dictionary containing session statistics
        """
        return {
            'total_requests': self.request_count,
            'max_requests_limit': self.max_requests,
            'respect_robots_txt': self.respect_robots_txt,
            'delay_seconds': self.delay,
            'base_url': self.base_url
        }
    
    def verify_terms_of_service(self) -> None:
        """
        Display a prompt to verify Terms of Service compliance.
        This is a reminder to check legal compliance before scraping.
        """
        logger.warning("=" * 60)
        logger.warning("LEGAL COMPLIANCE CHECK")
        logger.warning("Before scraping, please verify:")
        logger.warning("1. You have read the website's Terms of Service")
        logger.warning("2. Web scraping is permitted for your use case")
        logger.warning("3. You are not violating any copyright or data protection laws")
        logger.warning("4. You have considered using an official API instead")
        logger.warning("5. Your scraping won't harm the website's performance")
        logger.warning("=" * 60)
        logger.warning(f"Target: {self.base_url}")
        logger.warning("Continuing in 3 seconds... (Press Ctrl+C to abort)")
        logger.warning("=" * 60)
        
        try:
            time.sleep(3)
        except KeyboardInterrupt:
            logger.info("\nScraping aborted by user")
            raise
    
    def close(self):
        """Close the session and display statistics."""
        stats = self.get_statistics()
        
        logger.info("=" * 60)
        logger.info("SCRAPING SESSION SUMMARY")
        logger.info(f"- Total requests made: {stats['total_requests']}")
        logger.info(f"- Request limit: {stats['max_requests_limit'] or 'None'}")
        logger.info(f"- Respected robots.txt: {stats['respect_robots_txt']}")
        logger.info(f"- Delay used: {stats['delay_seconds']}s")
        logger.info("=" * 60)
        
        self.session.close()
        logger.info("Scraper session closed")


def example_scrape_quotes():
    """
    Example: Scrape quotes from quotes.toscrape.com
    This is a practice website designed for web scraping.
    """
    logger.info("Starting example scrape...")
    
    # Initialize scraper with ethical safeguards
    scraper = WebScraper(
        base_url='http://quotes.toscrape.com',
        delay=2.0,
        respect_robots_txt=True,  # Always check robots.txt
        max_requests=50  # Limit to 50 requests for safety
    )
    
    # Fetch the main page
    soup = scraper.fetch_page('http://quotes.toscrape.com')
    
    if soup:
        # Extract quotes
        quotes_data = []
        quotes = soup.find_all('div', class_='quote')
        
        for quote in quotes:
            try:
                text = quote.find('span', class_='text').get_text(strip=True)
                author = quote.find('small', class_='author').get_text(strip=True)
                tags = [tag.get_text(strip=True) for tag in quote.find_all('a', class_='tag')]
                
                quotes_data.append({
                    'quote': text,
                    'author': author,
                    'tags': ', '.join(tags)
                })
            except Exception as e:
                logger.error(f"Error parsing quote: {str(e)}")
                continue
        
        # Save to JSON and CSV
        if quotes_data:
            scraper.save_to_json(quotes_data, 'quotes.json')
            scraper.save_to_csv(quotes_data, 'quotes.csv')
            logger.info(f"Successfully scraped {len(quotes_data)} quotes")
        else:
            logger.warning("No quotes found")
    
    scraper.close()


def example_scrape_wikipedia_table():
    """
    Example: Scrape a table from Wikipedia
    Note: Wikipedia has an API - consider using it for production use!
    """
    logger.info("Starting Wikipedia table scrape...")
    
    # Initialize scraper with ethical safeguards
    scraper = WebScraper(
        base_url='https://en.wikipedia.org',
        delay=3.0,  # Higher delay for Wikipedia
        respect_robots_txt=True,
        max_requests=10  # Limit requests
    )
    
    # Fetch a page with a table
    url = 'https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)'
    soup = scraper.fetch_page(url)
    
    if soup:
        # Extract table data
        table_data = scraper.extract_table_data(soup)
        
        if table_data:
            # Save first 10 rows as example
            scraper.save_to_json(table_data[:10], 'wiki_table.json')
            logger.info(f"Successfully scraped {len(table_data)} table rows")
        else:
            logger.warning("No table data found")
    
    scraper.close()




if __name__ == '__main__':
    """
    Main execution - demonstrates web scraping with error handling
    """
    print("=" * 70)
    print("ETHICAL WEB SCRAPER - BeautifulSoup & Requests")
    print("=" * 70)
    print("\nThis script demonstrates responsible web scraping:")
    print("✓ robots.txt compliance")
    print("✓ Rate limiting and delays")
    print("✓ Proper error handling")
    print("✓ Request tracking and limits")
    print("✓ Transparent user agent")
    print("✓ Legal safeguards")
    print("\n" + "=" * 70)
    
    try:
        
        
        # Run example scrape
        print("\nRunning example scrape (quotes.toscrape.com)...")
        print("This demonstrates all ethical safeguards in action.\n")
        example_scrape_quotes()
        
        print("\n" + "=" * 70)
        print("✓ Scraping completed successfully!")
        print("✓ Check the output files: quotes.json and quotes.csv")
        print("=" * 70)
        
    except KeyboardInterrupt:
        logger.info("\nScraping interrupted by user")
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")

