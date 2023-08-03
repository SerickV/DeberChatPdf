from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from langchain.llms import OpenAI
from langchain.document_loaders import PyPDFLoader
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
import os

app = Flask(__name__)
CORS(app)  # Habilitar CORS

# Establecer la ruta del directorio de carga
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.environ['OPENAI_API_KEY'] = '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'

def process_doc(path, is_local, question):
    _, loader = os.system(f'curl -o doc.pdf {path}'), PyPDFLoader(f"./doc.pdf") if not is_local else PyPDFLoader(path)

    doc = loader.load_and_split()
    db = Chroma.from_documents(doc, embedding=OpenAIEmbeddings())
    qa = RetrievalQA.from_chain_type(llm=OpenAI(), chain_type='stuff', retriever=db.as_retriever())

    return qa.run(question)

uploaded_filename = None

@app.route('/initialize', methods=['POST'])
def upload_file():
    global uploaded_filename
    if 'file' not in request.files:
        return jsonify(error='No file part in the request'), 400
    file = request.files['file']

    if file.filename == '':
        return jsonify(error='No selected file'), 400

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # Guardamos el nombre del archivo
        uploaded_filename = filename
        return jsonify(message='File uploaded successfully'), 200

@app.route('/ask', methods=['POST'])
def ask_question():
    global uploaded_filename
    data = request.json
    question = data.get('question')
    # Usamos el nombre del archivo cargado en lugar de 'your_uploaded_file.pdf'
    path_to_pdf = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_filename)

    answer = process_doc(path=path_to_pdf, is_local=True, question=question)

    return jsonify(answer=answer)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
