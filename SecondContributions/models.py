from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class DailyMetrics(db.Model):
    """Store raw daily financial metrics from APIs"""
    __tablename__ = 'daily_metrics'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    symbol = db.Column(db.String(10), nullable=False, default='AAPL')
    
    # Composite unique constraint for date + symbol combination
    __table_args__ = (db.UniqueConstraint('date', 'symbol', name='unique_date_symbol'),)
    
    open_price = db.Column(db.Float)
    high_price = db.Column(db.Float)
    low_price = db.Column(db.Float)
    close_price = db.Column(db.Float)
    volume = db.Column(db.BigInteger)
    market_cap = db.Column(db.BigInteger)
    raw_data = db.Column(db.Text)  # JSON string of full API response
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'symbol': self.symbol,
            'open_price': self.open_price,
            'high_price': self.high_price,
            'low_price': self.low_price,
            'close_price': self.close_price,
            'volume': self.volume,
            'market_cap': self.market_cap,
            'created_at': self.created_at.isoformat()
        }

class DailyRecommendations(db.Model):
    """Store AI-generated insights and recommendations"""
    __tablename__ = 'daily_recommendations'
    
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    symbol = db.Column(db.String(10), nullable=False, default='AAPL')
    
    # Composite unique constraint for date + symbol combination
    __table_args__ = (db.UniqueConstraint('date', 'symbol', name='unique_rec_date_symbol'),)
    
    summary = db.Column(db.Text, nullable=False)
    recommendation_1 = db.Column(db.Text)
    recommendation_2 = db.Column(db.Text)
    recommendation_3 = db.Column(db.Text)
    sentiment_score = db.Column(db.Float)  # -1 to 1 scale
    confidence_level = db.Column(db.String(20))  # 'high', 'medium', 'low'
    raw_response = db.Column(db.Text)  # Full Gemini response
    created_at = db.Column(db.DateTime, default=datetime.utcnow)    
    # Foreign key to link with metrics
    metrics_id = db.Column(db.Integer, db.ForeignKey('daily_metrics.id'))
    metrics = db.relationship('DailyMetrics', backref='recommendations')
    
    def to_dict(self):
        return {
            'id': self.id,
            'date': self.date.isoformat(),
            'symbol': self.symbol,
            'summary': self.summary,
            'recommendations': [
                self.recommendation_1,
                self.recommendation_2,
                self.recommendation_3
            ],
            'sentiment_score': self.sentiment_score,
            'confidence_level': self.confidence_level,
            'created_at': self.created_at.isoformat()
        }

class ETLJobLog(db.Model):
    """Track ETL job execution history"""
    __tablename__ = 'etl_job_logs'
    
    id = db.Column(db.Integer, primary_key=True)
    job_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), nullable=False)  # 'success', 'failed', 'running'
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime)
    error_message = db.Column(db.Text)
    records_processed = db.Column(db.Integer, default=0)
    
    def to_dict(self):
        return {
            'id': self.id,
            'job_date': self.job_date.isoformat(),
            'status': self.status,
            'start_time': self.start_time.isoformat(),
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'error_message': self.error_message,
            'records_processed': self.records_processed
        }
