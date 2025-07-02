from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nama = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='member')
    team_memberships = db.relationship('TeamMember', backref='user', lazy=True)
    created_teams = db.relationship('Team', backref='creator', lazy=True)
    sessions = db.relationship('Session', backref='creator', lazy=True)

class Team(db.Model):
    __tablename__ = 'teams'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(10), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    members = db.relationship('TeamMember', backref='team', lazy=True)
    sessions = db.relationship('Session', backref='team', lazy=True)

class TeamMember(db.Model):
    __tablename__ = 'team_members'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)
    is_moderator = db.Column(db.Boolean, default=False)
    joined_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(20), default='active')

class Session(db.Model):
    __tablename__ = 'sessions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    team_id = db.Column(db.Integer, db.ForeignKey('teams.id'), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(255), nullable=True)  # Sesuai dengan DB
    description = db.Column(db.Text, nullable=True)   # Sesuai dengan DB
    status = db.Column(db.String(20), default='active')  # Sesuai dengan DB
    start_time = db.Column(db.DateTime, default=db.func.current_timestamp())  # Sesuai dengan DB
    end_time = db.Column(db.DateTime, nullable=True)  # Sesuai dengan DB
    emotions = db.relationship('EmotionData', backref='session', lazy=True)

class EmotionData(db.Model):
    __tablename__ = 'emotion_data'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    emotion = db.Column(db.String(50), nullable=False)
    confidence = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Penerima notifikasi (ketua)
    type = db.Column(db.String(30), nullable=False)  # 'join' atau 'emotion'
    message = db.Column(db.String(255), nullable=False)
    data = db.Column(db.Text, nullable=True)  # Data tambahan (JSON string)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
