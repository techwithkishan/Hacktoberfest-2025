#!/usr/bin/env python3
"""
Hacktoberfest 2025 - Python Data Processing Script
A simple example for contributors to enhance and extend.
"""

import json
import requests
import csv
from datetime import datetime
from typing import List, Dict, Any


class HacktoberfestStats:
    """Class to fetch and process Hacktoberfest statistics."""
    
    def __init__(self, repo_owner: str, repo_name: str):
        self.repo_owner = repo_owner
        self.repo_name = repo_name
        self.base_url = "https://api.github.com"
        self.repo_url = f"{self.base_url}/repos/{repo_owner}/{repo_name}"
    
    def fetch_pull_requests(self) -> List[Dict[str, Any]]:
        """
        Fetch pull requests from GitHub API.
        
        Returns:
            List of pull request data
        """
        try:
            response = requests.get(f"{self.repo_url}/pulls?state=all")
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching pull requests: {e}")
            return []
    
    def fetch_contributors(self) -> List[Dict[str, Any]]:
        """
        Fetch contributors from GitHub API.
        
        Returns:
            List of contributor data
        """
        try:
            response = requests.get(f"{self.repo_url}/contributors")
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching contributors: {e}")
            return []
    
    def analyze_pr_data(self, prs: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Analyze pull request data.
        
        Args:
            prs: List of pull request data
            
        Returns:
            Analysis results
        """
        total_prs = len(prs)
        merged_prs = sum(1 for pr in prs if pr.get('merged_at'))
        open_prs = sum(1 for pr in prs if pr.get('state') == 'open')
        
        # Find PRs created in October (Hacktoberfest month)
        october_prs = []
        for pr in prs:
            created_at = pr.get('created_at', '')
            if created_at and '2025-10' in created_at:
                october_prs.append(pr)
        
        return {
            'total_prs': total_prs,
            'merged_prs': merged_prs,
            'open_prs': open_prs,
            'october_prs': len(october_prs),
            'hacktoberfest_prs': october_prs
        }
    
    def generate_report(self) -> Dict[str, Any]:
        """
        Generate comprehensive Hacktoberfest report.
        
        Returns:
            Complete report data
        """
        print("🎃 Generating Hacktoberfest 2025 Report...")
        
        prs = self.fetch_pull_requests()
        contributors = self.fetch_contributors()
        pr_analysis = self.analyze_pr_data(prs)
        
        report = {
            'repository': f"{self.repo_owner}/{self.repo_name}",
            'generated_at': datetime.now().isoformat(),
            'summary': {
                'total_contributors': len(contributors),
                **pr_analysis
            },
            'top_contributors': contributors[:10],  # Top 10 contributors
            'recent_prs': prs[:5] if prs else []  # 5 most recent PRs
        }
        
        return report
    
    def save_report(self, report: Dict[str, Any], filename: str = None):
        """
        Save report to JSON file.
        
        Args:
            report: Report data to save
            filename: Output filename (optional)
        """
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"hacktoberfest_report_{timestamp}.json"
        
        with open(filename, 'w') as f:
            json.dump(report, f, indent=2)
        
        print(f"📊 Report saved to: {filename}")
    
    def export_to_csv(self, contributors: List[Dict[str, Any]], filename: str = None):
        """
        Export contributors data to CSV.
        
        Args:
            contributors: List of contributor data
            filename: Output filename (optional)
        """
        if not filename:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"contributors_{timestamp}.csv"
        
        if not contributors:
            print("No contributors data to export")
            return
        
        with open(filename, 'w', newline='') as csvfile:
            fieldnames = ['login', 'contributions', 'html_url', 'avatar_url']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            
            writer.writeheader()
            for contributor in contributors:
                writer.writerow({
                    'login': contributor.get('login', ''),
                    'contributions': contributor.get('contributions', 0),
                    'html_url': contributor.get('html_url', ''),
                    'avatar_url': contributor.get('avatar_url', '')
                })
        
        print(f"📋 Contributors exported to: {filename}")


def main():
    """Main function to run the Hacktoberfest stats generator."""
    print("🎃 Welcome to Hacktoberfest 2025 Stats Generator!")
    print("=" * 50)
    
    # Example usage - replace with actual repo details
    repo_owner = "hari7261"
    repo_name = "Hacktoberfest-2025"
    
    stats = HacktoberfestStats(repo_owner, repo_name)
    
    # Generate and save report
    report = stats.generate_report()
    stats.save_report(report)
    
    # Export contributors to CSV
    contributors = stats.fetch_contributors()
    stats.export_to_csv(contributors)
    
    print("\n🎉 Hacktoberfest report generation complete!")
    print("Thank you for participating in Hacktoberfest 2025! 🚀")


if __name__ == "__main__":
    main()