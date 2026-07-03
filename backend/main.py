from fastapi import FastAPI
from pydantic import BaseModel
from knowledge_agent import get_wikipedia_knowledge, get_webpage_text
from vector_store import add_knowledge
from agent import drawmate_agent
from breakdown_agent import create_drawing_breakdown
from fastapi import UploadFile, File
import shutil
from memory_agent import load_memory
from vision_agent import analyze_drawing
from roadmap_agent import generate_roadmap
from challenge_agent import generate_challenge
from master_agent import run_master_agent
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles




app = FastAPI(title="DrawMate AI Tutor")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TopicRequest(BaseModel):
    topic: str


class UrlRequest(BaseModel):
    url: str


class AskRequest(BaseModel):
    question: str

class BreakdownRequest(BaseModel):
    topic: str
class RoadmapRequest(BaseModel):
    goal: str
class ChallengeRequest(BaseModel):
    level: str
    topic: str
class ChatRequest(BaseModel):
    message: str

@app.get("/")
def home():
    return {
        "message": "DrawMate AI backend is running"
    }


@app.post("/learn/topic")
def learn_from_topic(request: TopicRequest):
    text = get_wikipedia_knowledge(request.topic)

    if not text:
        return {"error": "No knowledge found"}

    chunks_added = add_knowledge(text, source=request.topic.replace(" ", "_"))

    return {
        "message": "Knowledge added successfully",
        "topic": request.topic,
        "chunks_added": chunks_added
    }


@app.post("/learn/url")
def learn_from_url(request: UrlRequest):
    text = get_webpage_text(request.url)

    if not text:
        return {"error": "No webpage text found"}

    chunks_added = add_knowledge(text, source="webpage")

    return {
        "message": "Webpage knowledge added successfully",
        "chunks_added": chunks_added
    }


@app.post("/ask")
def ask(request: AskRequest):

    result = drawmate_agent(request.question)

    result = drawmate_agent(request.question)

    return {
        "question": request.question,
        "lesson": result["lesson"],
        "image_prompt": result["image_prompt"]
    }
@app.post("/breakdown")
def breakdown(request: BreakdownRequest):
    result = create_drawing_breakdown(request.topic)

    return {
        "topic": request.topic,
        "breakdown": result
    }
@app.post("/analyze-sketch")
async def analyze_sketch(file: UploadFile = File(...)):

    path = f"uploads/{file.filename}"

    with open(path,"wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = analyze_drawing(path)

    return {
        "analysis":result
    }
@app.get("/memory")
def memory():

    return load_memory()
@app.post("/roadmap")
def roadmap(request: RoadmapRequest):

    result = generate_roadmap(
        request.goal
    )


    return {
        "goal":request.goal,
        "roadmap":result
    }
@app.get("/challenge")
def challenge():
    result = generate_challenge()

    return {
        "challenge": result
    }
@app.post("/chat")
def chat(request: ChatRequest):
    response = run_master_agent(request.message)

    return {
        "message": request.message,
        "response": response
    }
app.mount(
    "/generated",
    StaticFiles(directory="generated"),
    name="generated"
)