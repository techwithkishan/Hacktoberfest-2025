from airflow import DAG  # type: ignore
from airflow.providers.postgres.hooks.postgres import PostgresHook  # type: ignore
from airflow.decorators import task  # type: ignore
from airflow.utils.dates import days_ago  # type: ignore
import pandas as pd

# Constants
POSTGRES_CONN_ID = "postgres_default"
CSV_FILE_PATH = "youtube_trending.csv"  

# Default Arguments
default_args = {
    "owner": "airflow",
    "start_date": days_ago(1),
}

# DAG Definition
with DAG(
    dag_id="youtube_trending_etl_csv",
    default_args=default_args,
    schedule_interval="@daily",
    catchup=False,
) as dag:

    @task()
    def extract_csv_data():
        """Extract trending YouTube video data from a CSV file."""
        df = pd.read_csv(CSV_FILE_PATH)
        return df.to_dict(orient="records")

    @task()
    def transform_videos(video_data):
        """Transform the CSV data."""
        transformed = []
        for video in video_data:
            transformed.append({
                "video_id": video["video_id"],
                "title": video["title"].strip(),
                "channel": video["channel"].strip(),
                "views": int(video.get("views", 0)),
                "likes": int(video.get("likes", 0)),
                "comments": int(video.get("comments", 0)),
                "published_at": video["published_at"],
            })
        return transformed

    @task()
    def load_videos_to_postgres(transformed_data):
        """Load transformed data into PostgreSQL."""
        pg_hook = PostgresHook(postgres_conn_id=POSTGRES_CONN_ID)
        conn = pg_hook.get_conn()
        cursor = conn.cursor()

        # Create table if it doesn't exist
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS youtube_trending_csv (
            video_id VARCHAR PRIMARY KEY,
            title TEXT,
            channel TEXT,
            views BIGINT,
            likes BIGINT,
            comments BIGINT,
            published_at TIMESTAMP,
            trending_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
            last_trending_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
        );
        """)

        # Insert or update data
        insert_query = """
        INSERT INTO youtube_trending_csv 
        (video_id, title, channel, views, likes, comments, published_at, trending_start, last_trending_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT (video_id) 
        DO UPDATE 
        SET views = EXCLUDED.views, 
            likes = EXCLUDED.likes, 
            comments = EXCLUDED.comments,
            last_trending_at = CURRENT_TIMESTAMP;
        """

        records = [
            (
                video["video_id"],
                video["title"],
                video["channel"],
                video["views"],
                video["likes"],
                video["comments"],
                video["published_at"],
            )
            for video in transformed_data
        ]

        cursor.executemany(insert_query, records)
        conn.commit()
        cursor.close()
        conn.close()

    # Define ETL Workflow
    data = extract_csv_data()
    transformed = transform_videos(data)
    load_videos_to_postgres(transformed)